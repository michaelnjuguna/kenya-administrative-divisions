import { kenyaAdministrativeDivisions as kad } from "../lib/kenya_administrative_divisions";
import { describe, test, expect } from "@jest/globals";
describe("Helper methods - MainController", () => {
  test("getCountyNames method returns an array of county names", () => {
    const result = kad.getCountyNames();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(47);
    expect(result[0]).toBe("Mombasa");
  });

  test("getWardNames method returns an array of ward names", () => {
    const result = kad.getWardNames();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain("Shika adabu");
  });
});

describe("getConstituencyNames", () => {
  test("passing invalid countyCode getConstituencyNames ", () => {
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
    const result = kad.getConstituencyNames({ countyCode: 1 });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain("Mvita");
  });
});
