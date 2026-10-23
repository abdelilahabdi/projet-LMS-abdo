import { welcomeEmail , trainerWelcomeEmail } from "../src/services/emailTemplates";

describe("welcomeEmail" , () => {
    test("shows the learner name" , () => {
        const email = welcomeEmail ("ahmed") ;

        expect(email).toContain("hello ahmed");
        expect(email).toContain("Welcome to LMS");

    });

    test("escapes HTML in the learner name" , () => {
        const email = welcomeEmail("<script>");
        
        expect(email).toContain("&lt;script&gt;");
        expect(email).not.toContain("<script>");
    });
});



describe("trainerWelcomeEmail", () => {
  test("shows the trainer name", () => {
    const email = trainerWelcomeEmail("Ahmed");

    expect(email).toContain("Hello Ahmed");
    expect(email).toContain("your trainer account is ready");
  });

  test("escapes HTML in the trainer name", () => {
    const email = trainerWelcomeEmail("<script>");

    expect(email).toContain("&lt;script&gt;");
    expect(email).not.toContain("<script>");
  });
});
