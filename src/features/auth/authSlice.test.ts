import { describe, expect, it } from "vitest";

import { authReducer, login, logout } from "./authSlice";

describe("authSlice", () => {
  it("stores user and token on login", () => {
    const state = authReducer(
      undefined,
      login({
        token: "fake-token-1",
        user: {
          email: "demo@coderun.dev",
          name: "Demo User",
        },
      }),
    );

    expect(state.isAuthenticated).toBe(true);
    expect(state.token).toBe("fake-token-1");
    expect(state.user?.email).toBe("demo@coderun.dev");
  });

  it("clears auth state on logout", () => {
    const loggedInState = authReducer(
      undefined,
      login({
        token: "fake-token-1",
        user: {
          email: "demo@coderun.dev",
          name: "Demo User",
        },
      }),
    );

    const state = authReducer(loggedInState, logout());

    expect(state.isAuthenticated).toBe(false);
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
  });
});
