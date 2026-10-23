import nodemailer from "nodemailer";

let smtpTransporter;

function getSmtpTransporter() {
  if (smtpTransporter) {
    return smtpTransporter;
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error("SMTP configuration is missing");
  }

  smtpTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user,
      pass,
    },
  });

  return smtpTransporter;
}

export function sendEmail(to, subject, html) {
  const driver = process.env.EMAIL_DRIVER || "log";

  if (!to || !subject || !html) {
    throw new Error("Email information is missing");
  }

  if (driver === "log") {
    console.log("Email to:", to);
    console.log("Email subject:", subject);
    console.log("Email message:", html);
    return;
  }

  if (driver === "smtp") {
    return getSmtpTransporter().sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html,
    });
  }

  throw new Error("Email driver is not supported yet");
}