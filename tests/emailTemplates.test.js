import { welcomeEmail } from "../src/services/emailTemplates";

describe("welcomeEmail" , () => {
    test("shows the learner name" , () => {
        const email = welcomeEmail ("ahmed") ;

        expect(email).toContain("hello ahmed");
        expect(email).toContain("Welcome to LMS");

    });

    test("escapes HTML in the learner name" , () => {
        const email = welcomeEmail("<script>");
        
        expect(email).toContain("&lt;script&gt");
        expect(email).not.toContain("<script>");
    });
});