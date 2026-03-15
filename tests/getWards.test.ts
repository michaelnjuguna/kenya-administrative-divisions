import { KenyaAdministrativeDivisions } from "../src/main";

describe("KenyaAdministrativeDivisions - getWards", () => {
  test("No parameters passed", () => {
    const result = KenyaAdministrativeDivisions.getWards();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
  test("Valid county code passed", () => {
    const result = KenyaAdministrativeDivisions.getWards({ countyCode: 1 });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain("Shika adabu");
  });
  test("Invalid county code passed", () => {
    expect(() => {
      KenyaAdministrativeDivisions.getWards({ countyCode: 48 });
    }).toThrow("Invalid county code. County code should be between 1 and 47");
    expect(() => {
      KenyaAdministrativeDivisions.getWards({ countyCode: 0 });
    }).toThrow("Invalid county code. County code should be between 1 and 47");
  });
  test("Valid county name passed", () => {
    const result = KenyaAdministrativeDivisions.getWards({
      countyName: "Mombasa",
    });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain("Shika adabu");
  });
  test("Invalid county name passed", () => {
    expect(() => {
      KenyaAdministrativeDivisions.getWards({
        countyName: "Invalid County Name",
      });
    }).toThrow("County not found with the provided name");
  });
  test("Valid constituency name passed", () => {
    const result = KenyaAdministrativeDivisions.getWards({
      constituencyName: "Likoni",
    });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain("Shika adabu");
  });
  test("Invalid constituency name passed", () => {
    expect(() => {
      KenyaAdministrativeDivisions.getWards({
        constituencyName: "Invalid Constituency Name",
      });
    }).toThrow("Constituency not found with the provided name");
  });
});
