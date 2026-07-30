import {
  kenyaAdministrativeDivisions as kad,
  Ward,
} from "../lib/kenya_administrative_divisions";
import { describe, test, expect } from "@jest/globals";

describe("KenyaAdministrativeDivisions - getWards", () => {
  test("No parameters passed", () => {
    const result: Ward[] = kad.getWards();
    expect(result.length).toBeGreaterThan(0);
  });
  test("Valid county code passed", () => {
    const result: Ward[] = kad.getWards({ countyCode: 1 });
    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain("Shika adabu");
  });
  test("Invalid county code passed", () => {
    expect(() => {
      kad.getWards({ countyCode: 48 });
    }).toThrow("Invalid county code. County code should be between 1 and 47");
    expect(() => {
      kad.getWards({ countyCode: 0 });
    }).toThrow("Invalid county code. County code should be between 1 and 47");
  });
  test("Valid county name passed", () => {
    const result: Ward[] = kad.getWards({
      countyName: "Mombasa",
    });
    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain("Shika adabu");
  });
  test("Invalid county name passed", () => {
    expect(() => {
      kad.getWards({
        countyName: "Invalid County Name",
      });
    }).toThrow("County not found with the provided name");
  });
  test("Valid constituency name passed", () => {
    const result: Ward[] = kad.getWards({
      constituencyName: "Likoni",
    });
    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain("Shika adabu");
  });
  test("Invalid constituency name passed", () => {
    expect(() => {
      kad.getWards({
        constituencyName: "Invalid Constituency Name",
      });
    }).toThrow("Constituency not found with the provided name");
  });
});
