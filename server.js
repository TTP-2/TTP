const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Nodemailer Transporter Setup (use your email service here)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or any other email provider
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

// POST route to send email
app.post('/send-email', (req, res) => {
  const { toEmail, subject, message } = req.body;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: toEmail,
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: 'Error sending email' });
    }
    res.status(200).json({ message: 'Email sent successfully' });
  });
});

// Serve static files (e.g., index.html)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
