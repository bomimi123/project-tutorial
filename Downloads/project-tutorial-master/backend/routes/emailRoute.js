import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const emailRouter = express.Router();

const transporter = nodemailer.createTransport({
     service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

emailRouter.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    const mailOptionsToReceiver = {
        from: `"${name}" <${email}>`,
        to: process.env.RECEIVER_EMAIL,
        subject: `Tin nhắn mới từ trang web của bạn`,
        html: `
            <h3>Tin nhắn mới từ trang web của bạn</h3>
            <p><strong>Họ và Tên:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Nội dung:</strong> ${message}</p>
        `
    };

    const mailOptionsToSender = {
        from: `"${process.env.RECEIVER_EMAIL}" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Xác nhận đã nhận tin nhắn của bạn`,
        html: `
            <h3>Cảm ơn bạn đã liên hệ!</h3>
            <p>Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi sớm nhất có thể.</p>
            <hr>
            <h4>Nội dung tin nhắn của bạn:</h4>
            <p><strong>Họ và Tên:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Nội dung:</strong> ${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptionsToReceiver);
        await transporter.sendMail(mailOptionsToSender);
        res.json({ success: true, message: 'Emails sent successfully!' });
    } catch (error) {
        console.error('Lỗi khi gửi email:', error);
        res.json({ success: false, message: 'Failed to send emails.' });
    }
});

export default emailRouter;