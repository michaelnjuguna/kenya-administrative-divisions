import { KenyaAdministrativeDivisions as kad } from "../src/main";
import { County } from "../src/models";

describe("KenyaAdministrativeDivisions - getConstituencies", () => {
  test("No parameter passed", () => {
    const result = kad.getConstituencies();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("constituency_name");
    expect(result[0]).toHaveProperty("wards");
    expect(result[0].constituency_name).toBe("Changamwe");
    expect(Array.isArray(result[0].wards)).toBe(true);
  });
  test("Invalid number is passed as param", () => {
    expect(() => {
      kad.getConstituencies({ countyCode: 48 });
    }).toThrow("Invalid county code. County code should be between 1 and 47");
    expect(() => {
      kad.getConstituencies({ countyCode: 0 });
    }).toThrow("Invalid county code. County code should be between 1 and 47");
  });
  test("Valid number passed as parameter", () => {
    const result = kad.getConstituencies({ countyCode: 1 });

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(6);
    expect(result[0]).toHaveProperty("constituency_name", "Changamwe");
    expect(result[0]).toHaveProperty("wards");
    expect(Array.isArray(result[0].wards)).toBe(true);
  });
  test("Valid string passed as param", () => {
    const result = kad.getConstituencies({ countyName: "Mombasa" });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(6);
    expect(result[0]).toHaveProperty("constituency_name", "Changamwe");
    expect(result[0]).toHaveProperty("wards");
    expect(Array.isArray(result[0].wards)).toBe(true);
  });
  test("Invalid string is passed as param", () => {
    expect(() => {
      const result = kad.getConstituencies({
        countyName: "Invalid County Name",
      });
    }).toThrow("County not found with the provided name");
  });
});
