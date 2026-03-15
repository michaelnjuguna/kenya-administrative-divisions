import { KenyaAdministrativeDivisions as kad } from "../src/main";

describe("KenyaAdministrativeDivisions - Main ", () => {
  test("getCountyNames method returns an array of county names", () => {
    const result = kad.getCountyNames();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(47);
    expect(result[0]).toBe("Mombasa");
  });

  test("getConstituencyNames method returns an array of constituency names", () => {
    const result = kad.getConstituencyNames();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain("Mvita");
  });
});
