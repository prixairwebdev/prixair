"use server";

import nodemailer from "nodemailer";

export async function sendContactEmail(formData: any) {
  const { name, firstName, fullName, email, businessUnit, message, phone, address, additionalDetails } = formData;

  const to = "Contact@prixair.net";
  const userEmail = email || "No email provided";
  const userName = fullName || name || firstName || "Anonymous User";

  // Create transporter
  // Note: These should be configured in your .env file
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM || `"Prixair Contact Form" <${process.env.EMAIL_USER}>`,
    to,
    subject: `New Contact Form Submission from ${userName}`,
    text: `
      Naw Contact Form Submission:
      
      Name: ${userName}
      Email: ${userEmail}
      Phone: ${phone || "N/A"}
      Address: ${address || "N/A"}
      Business Unit: ${businessUnit || "N/A"}
      
      Message:
      ${message || additionalDetails || "No message provided."}
    `,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #FB6404;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${userName}</p>
        <p><strong>Email:</strong> ${userEmail}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        ${address ? `<p><strong>Address:</strong> ${address}</p>` : ""}
        ${businessUnit ? `<p><strong>Business Unit:</strong> ${businessUnit}</p>` : ""}
        <br/>
        <p><strong>Message:</strong></p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #FB6404;">
          ${(message || additionalDetails || "No message provided.").replace(/\n/g, "<br/>")}
        </div>
      </div>
    `,
  };

  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn("Email credentials not found in environment variables. Email will not be sent.");
      console.log("Form Data would have been sent to:", to);
      console.log("Email Content:", mailOptions.text);
      return { success: true, message: "Email logged to console (credentials missing)." };
    }

    await transporter.sendMail(mailOptions);
    console.log(`Email successfully sent to ${to}`);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email." };
  }
}
