import nodemailer from 'nodemailer';

const EMAIL_USER = process.env.NEXT_PUBLIC_EMAIL_USER;
const EMAIL_PASS = process.env.NEXT_PUBLIC_EMAIL_PASS;

export const POST = async (request) => {
    const { onlineInterView, from, to } = await request.json();

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_USER, // Gmail address
            pass: EMAIL_PASS, // Gmail App Password (not regular Gmail password)
        },
    });

    const mailOptions = {
        from: from, // Sender's email address
        to: to, // Recipient's email
        subject: 'Your Online Interview Details',
        text: `
            Dear Candidate,

            You have an upcoming online interview scheduled:

            Date: ${onlineInterView?.interviewDate}
            Time: ${onlineInterView?.interviewTime}
            Format: ${onlineInterView?.interviewFormat}

            Please join the meeting using the following link:
            ${onlineInterView?.meetingLink}

            If you have any questions, feel free to contact us at ${onlineInterView?.contact?.contactPhone} or ${onlineInterView?.contact?.contactEmail}.

            Best regards,
            The Recruitment Team
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ message: 'Failed to send email', error: error.message }), { status: 500 });
    };
}
