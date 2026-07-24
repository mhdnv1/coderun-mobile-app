import { describe, expect, it } from "vitest";

import { validateLoginForm } from "./validation";

describe("validateLoginForm", () => {
  it("requires email and password", () => {
    expect(validateLoginForm("", "")).toEqual({
      email: "Email is required",
      password: "Password is required",
    });
  });

  it("validates email format and password length", () => {
    expect(validateLoginForm("wrong-email", "123")).toEqual({
      email: "Enter a valid email",
      password: "Password must be at least 6 characters",
    });
  });

  it("returns no errors for valid input", () => {
    expect(validateLoginForm("demo@coderun.dev", "password123")).toEqual({});
  });
});
