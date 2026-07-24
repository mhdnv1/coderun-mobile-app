import { describe, expect, it } from "vitest";

import { truncateText } from "./text";

describe("truncateText", () => {
  it("returns short text unchanged", () => {
    expect(truncateText("Emily Carter", 24)).toBe("Emily Carter");
  });

  it("truncates long text with ellipsis", () => {
    expect(truncateText("Product Designer at CodeRun Studio", 16)).toBe(
      "Product Designer...",
    );
  });
});
