import nodemailer from "nodemailer";
import { env } from "../../../../config/index.js";

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  host: "gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: env.appGmail,
    pass: env.appPassword,
  },
});

// Send an email using async/await
export let sendEmail = async ({ to, subject, html }) => {
  const info = await transporter.sendMail({
    from: `"Sohaib Tarek" <${env.appGmail}>`, // Sender address
    to: to,
    subject: subject,
    html: html, // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
};
