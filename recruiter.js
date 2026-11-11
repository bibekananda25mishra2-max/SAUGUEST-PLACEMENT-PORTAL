const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Allows frontend to talk to backend

// Configure your SMTP transporter (e.g., Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-verified-email@gmail.com',       // Your authenticated server email
        pass: 'your-email-app-password'             // Your secure App Password
    }
});

app.post('/send-email', async (req, res) => {
    const { senderEmail, receiverEmail, subject, message } = req.body;

    try {
        const mailOptions = {
            from: `"Website Notification" <your-verified-email@gmail.com>`, // Mail server authenticates sender
            to: receiverEmail,
            replyTo: senderEmail, // Allows replying directly to the user's input email
            subject: subject,
            text: `Message from: ${senderEmail}\n\n${message}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Mail send error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});