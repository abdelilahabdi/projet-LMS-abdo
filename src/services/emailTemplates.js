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