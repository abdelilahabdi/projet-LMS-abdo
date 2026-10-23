import { jest } from "@jest/globals";
import { sendEmail } from "../src/services/emailService.js";

describe("sendEmail", () => {
  beforeEach(() => {
    process.env.EMAIL_DRIVER = "log";
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("prints the email in log mode", () => {
    const log = jest.spyOn(console, "log").mockImplementation(() => {});

    sendEmail("ahmed@example.com", "Welcome", "Hello Ahmed");

    expect(log).toHaveBeenCalledWith("Email to:", "ahmed@example.com");
    expect(log).toHaveBeenCalledWith("Email subject:", "Welcome");
    expect(log).toHaveBeenCalledWith("Email message:", "Hello Ahmed");
  });

  test("shows an error when information is missing", () => {
    expect(() => {
      sendEmail("", "Welcome", "Hello Ahmed");
    }).toThrow("Email information is missing");
  });
});