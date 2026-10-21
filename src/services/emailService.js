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

  throw new Error("Email driver is not supported yet");
}