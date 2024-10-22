import nodemailer from 'nodemailer';

const EMAIL_USER = process.env.NEXT_PUBLIC_EMAIL_USER;
const EMAIL_PASS = process.env.NEXT_PUBLIC_EMAIL_PASS;

export const POST = async (request) => {
    const { jobTitle, responseDate, offerLetterLink, from, to } = await request.json();
    console.log(jobTitle, responseDate, from, to)

    // Create the transporter for sending emails
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_USER, // Gmail address
            pass: EMAIL_PASS, // Gmail App Password (not your regular Gmail password)
        },
    });
    const mailOptions = {
        from: from, // Sender's email address
        to: to, // Candidate's email
        subject: 'Your Job Offer',
        text: `
            Dear Candidate,

            Congratulations! You have been selected for the position ${jobTitle}.Kindly confirm your acceptance by ${responseDate}.
            Please review the offer letter and other details using the link below:

            Offer Letter: ${offerLetterLink}

            We are excited to have you on board!

            Best regards,
            The Recruitment Team
        `,
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error?.message);
        return new Response(JSON.stringify({ message: 'Failed to send email', error: error.message }), { status: 500 });
    }
};
