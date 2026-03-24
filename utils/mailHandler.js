const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 25,
    secure: false, // Use true for port 465, false for port 587
    auth: {
        user: "",
        pass: "",
    },
});

module.exports = {
    sendMail: async ({ to, subject, text, html }) => {
        const info = await transporter.sendMail({
            from: 'Admin@hahah.com',
            to: to,
            subject: subject,
            text: text,
            html: html,
        });

        console.log("Message sent:", info.messageId);
        return info;
    }
}