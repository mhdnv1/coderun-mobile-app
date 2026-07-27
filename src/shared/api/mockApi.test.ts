import { describe, expect, it } from "vitest";

import { getContactById, getContacts, signIn } from "./mockApi";

describe("mockApi", () => {
  it("signs in a demo user without exposing credentials in a query string", async () => {
    await expect(
      signIn({
        email: "demo@coderun.dev",
        password: "password123",
      }),
    ).resolves.toMatchObject({
      token: "fake-token-1",
      user: {
        email: "demo@coderun.dev",
      },
    });
  });

  it("rejects invalid credentials", async () => {
    await expect(
      signIn({
        email: "demo@coderun.dev",
        password: "wrong-password",
      }),
    ).rejects.toThrow("Invalid email or password");
  });

  it("returns contacts and details from the in-app mock data layer", async () => {
    const contacts = await getContacts();
    const contact = await getContactById(contacts[0].id);

    expect(contacts).toHaveLength(8);
    expect(contact).toEqual(contacts[0]);
  });
});
