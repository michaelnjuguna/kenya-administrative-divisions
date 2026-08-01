import { kenyaAdministrativeDivisions as kad } from "../lib/kenya_administrative_divisions";
import { describe, test, expect } from "@jest/globals";
describe("Helper methods - MainController", () => {
  test("getCountyNames method returns an array of county names", () => {
    const result: string[] = kad.getCountyNames();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(47);
    expect(result[0]).toBe("Mombasa");
  });

  test("getWardNames method returns an array of ward names", () => {
    const result: string[] = kad.getWardNames();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain("Shika adabu");
  });
});

describe("getConstituencyNames", () => {
  test("passing invalid countyCode to getConstituencyNames ", () => {
    expect(() => {
      kad.getConstituencyNames({ countyCode: 0 });
    }).toThrow("Invalid county code");
  });
  test("getConstituencyNames method returns an array of constituency names", () => {
    const result = kad.getConstituencyNames();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain("Mvita");
  });
  test("passing valid countycode to getConstituencyNames", () => {
    const result: string[] = kad.getConstituencyNames({ countyCode: 1 });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain("Mvita");
  });
  test("Passing invalid countyName to getConstituencyNames", () => {
    expect(() => {
      kad.getConstituencyNames({ countyName: "Invalid name" });
    }).toThrow("Invalid county name");
  });
  test("Passing valid countyName to getConstituencyNames", () => {
    const result: string[] = kad.getConstituencyNames({
      countyName: "Mombasa",
    });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain("Mvita");
  });
});
