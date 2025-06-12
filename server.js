const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/api/submit-code", async (req, res) => {
  const { code } = req.body;

  const mailOptions = {
    from: `"SportPesa Tips" <${process.env.EMAIL_USER}>`,
    to: "support@sportpesatips.co.ke",
    subject: "New VIP Access Request",
    text: `New M-Pesa Code Received: ${code}\nReply with YES or NO to approve access.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Code submitted successfully" });
  } catch (err) {
    console.error("Email send error:", err);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
