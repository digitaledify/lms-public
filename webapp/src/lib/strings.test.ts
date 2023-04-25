import { expect, describe, it } from "vitest";
import { isUrlValid } from "./strings";

// Write a test for isUrlValid that checks that it returns true for valid URLs and false for invalid URLs.
describe("isUrlValid", () => {
  it("returns true for valid URLs", () => {
    expect(isUrlValid("https://www.google.com")).toBe(true);
    expect(isUrlValid("https://www.google.com/")).toBe(true);
    expect(isUrlValid("https://www.google.com/search?q=hello")).toBe(true);
    expect(isUrlValid("https://www.google.com/search?q=hello#test")).toBe(true);
    expect(isUrlValid("https://www.google.com/search?q=hello#test?test")).toBe(
      true
    );
    expect(
      isUrlValid("https://www.google.com/search?q=hello#test?test=test")
    ).toBe(true);
    expect(
      isUrlValid(
        "https://www.google.com/search?q=hello#test?test=test&test2=test2"
      )
    ).toBe(true);
  });

  it("returns false for invalid URLs", () => {
    expect(isUrlValid("")).toBe(false);
    expect(isUrlValid("google.com")).toBe(false);
    expect(isUrlValid("www.google.com")).toBe(false);
    expect(isUrlValid("www.google.com/")).toBe(false);
    expect(isUrlValid("www.google.com/search?q=hello")).toBe(false);
    expect(isUrlValid("www.google.com/search?q=hello#test")).toBe(false);
    expect(isUrlValid("www.google.com/search?q=hello#test?test")).toBe(false);
    expect(isUrlValid("www.google.com/search?q=hello#test?test=test")).toBe(
      false
    );
    expect(
      isUrlValid("www.google.com/search?q=hello#test?test=test&test2=test2")
    ).toBe(false);
  });
});
