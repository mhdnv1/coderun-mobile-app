import { describe, expect, it } from "vitest";

import type { Contact } from "../types/contact";
import { filterContacts } from "./search";

const contacts: Contact[] = [
  {
    id: "1",
    name: "Emily Carter",
    role: "Product Designer",
    company: "CodeRun Studio",
    email: "emily@coderun.dev",
    phone: "+1 415 555 0184",
    city: "San Francisco",
    bio: "Designs product flows.",
  },
  {
    id: "2",
    name: "Noah Anderson",
    role: "Backend Engineer",
    company: "Atlas Cloud",
    email: "noah@atlascloud.dev",
    phone: "+1 512 555 0168",
    city: "Austin",
    bio: "Creates reliable APIs.",
  },
];

describe("filterContacts", () => {
  it("returns all contacts for an empty search query", () => {
    expect(filterContacts(contacts, "")).toHaveLength(2);
  });

  it("filters contacts by role, company or city", () => {
    expect(filterContacts(contacts, "backend")).toEqual([contacts[1]]);
    expect(filterContacts(contacts, "coderun")).toEqual([contacts[0]]);
    expect(filterContacts(contacts, "austin")).toEqual([contacts[1]]);
  });
});
