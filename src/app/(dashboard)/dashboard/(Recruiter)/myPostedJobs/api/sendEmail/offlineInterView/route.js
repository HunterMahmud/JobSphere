import nodemailer from 'nodemailer';

const EMAIL_USER = process.env.NEXT_PUBLIC_EMAIL_USER;
const EMAIL_PASS = process.env.NEXT_PUBLIC_EMAIL_PASS;

export const POST = async (request) => {
    const { offlineInterView, from, to } = await request.json();
    console.log(from, to)
    // Create the transporter for sending emails
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_USER, // Gmail address
            pass: EMAIL_PASS, // Gmail App Password (not your regular Gmail password)
        },
    });

    // Prepare the mail options
    const mailOptions = {
        from: from, // Sender's email address
        to: to, // Recipient's email
        subject: 'Your Offline Interview Details',
        text: `
            Dear Candidate,

            You have an upcoming offline interview scheduled:

            Date: ${offlineInterView?.interviewDate}
            Time: ${offlineInterView?.interviewTime}
            Location: ${offlineInterView?.interviewlocation}
            Format: ${offlineInterView?.interviewFormat}
            Documents Required: ${offlineInterView?.documents}

            If you have any questions, feel free to contact us at ${offlineInterView?.contact?.contactPhone} or ${offlineInterView?.contact?.contactEmail}.

            Best regards,
            The Recruitment Team
        `,
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ message: 'Failed to send email', error: error.message }), { status: 500 });
    }
};
