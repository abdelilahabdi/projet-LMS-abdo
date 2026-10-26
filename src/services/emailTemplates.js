import {escapeHtml } from "../utils/escapeHtml.js" ;

export function welcomeEmail (name) {
    const safeName = escapeHtml(name) ;

    return `
    <h1>Welcome to LMS</h1>
    <p> hello ${safeName} , </p>
    <p> your account has been created successfully </p>
    <p>we are happy to have you with us </p>
    `;
}

export function trainerWelcomeEmail(name) {
    const safeName = escapeHtml(name);

    return `
    <h1>Welcome to LMS</h1>
    <p>Hello ${safeName}</p>
    <p>your trainer account is ready</p>
    <p>thank you for joining our LMS</p>
    ` ;
}

export function courseEnrollmentEmail(name, courseTitle) {
  const safeName = escapeHtml(name);
  const safeCourseTitle = escapeHtml(courseTitle);

  return `
    <h1>Course Enrollment Confirmed</h1>
    <p>Hello ${safeName},</p>
    <p>You have successfully enrolled in ${safeCourseTitle}.</p>
    <p>Enjoy your learning journey!</p>
  `;
}



export function passwordResetEmail(name, resetUrl) {
  const safeName = escapeHtml(name);
  const safeResetUrl = escapeHtml(resetUrl);

  return `
    <h1>Reset your LMS password</h1>
    <p>Hello ${safeName},</p>
    <p>We received a request to reset your password.</p>
    <p>
      <a href="${safeResetUrl}">Reset your password</a>
    </p>
    <p>This link expires in 15 minutes.</p>
    <p>If you did not request this, you can ignore this email.</p>
  `;
}