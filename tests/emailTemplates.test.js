import { welcomeEmail , trainerWelcomeEmail , courseEnrollmentEmail, } from "../src/services/emailTemplates";

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


describe("courseEnrollmentEmail", () => {
  test("shows learner name and course title", () => {
    const email = courseEnrollmentEmail("Ahmed", "JavaScript");

    expect(email).toContain("Ahmed");
    expect(email).toContain("JavaScript");
    expect(email).toContain("Course Enrollment Confirmed");
  });

  test("escapes HTML in dynamic content", () => {
    const email = courseEnrollmentEmail("<script>", "<img>");

    expect(email).toContain("&lt;script&gt;");
    expect(email).toContain("&lt;img&gt;");
    expect(email).not.toContain("<script>");
  });
});
