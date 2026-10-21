import { escapeHtml } from "../src/utils/escapeHtml.js";

describe("escapeHtml", () => {
  test("escapes HTML special characters", () => {
    expect(escapeHtml(`<script>alert("x") & 'y'</script>`)).toBe(
      "&lt;script&gt;alert(&quot;x&quot;) &amp; &#39;y&#39;&lt;/script&gt;",
    );
  });

  test("handles null and undefined", () => {
    expect(escapeHtml(null)).toBe("");
    expect(escapeHtml(undefined)).toBe("");
  });

  test("converts numbers to strings", () => {
    expect(escapeHtml(42)).toBe("42");
  });
});
