import { describe, expect, it } from "vitest";
import { parseImportedItems } from "./import";

describe("parseImportedItems", () => {
  it("splits pasted names, trims spaces, and ignores empty lines", () => {
    const result = parseImportedItems(" item 1 \n\titem 2 \n ");

    expect(result).toEqual(["item 1", "item 2"]);
  });
});
