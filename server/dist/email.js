// /server/src/email.ts
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST,
    port: parseInt(process.env.EMAIL_SMTP_PORT || '587', 10),
    secure: process.env.EMAIL_SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_SMTP_USER,
        pass: process.env.EMAIL_SMTP_PASS,
    },
});
export async function sendContactEmail(name, fromEmail, message) {
    const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_FROM_ADDRESS}>`,
        to: process.env.EMAIL_TO_ADDRESS,
        replyTo: fromEmail,
        subject: `New Portfolio Contact from ${name}`,
        text: message,
        html: `<p>You have a new contact form submission from your portfolio:</p>
           <ul>
             <li><strong>Name:</strong> ${name}</li>
             <li><strong>Email:</strong> ${fromEmail}</li>
           </ul>
           <p><strong>Message:</strong></p>
           <p>${message.replace(/\n/g, '<br>')}</p>`,
    };
    await transporter.sendMail(mailOptions);
}
