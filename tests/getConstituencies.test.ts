import { KenyaAdministrativeDivisions as kad } from "../src/main";
import { Constituency } from "../src/models";
function expectValidConstituency(constituency: Constituency, name: string) {
  expect(constituency).toHaveProperty("constituency_name");
  expect(constituency).toHaveProperty("wards");
  expect(Array.isArray(constituency.wards)).toBe(true);
  expect(constituency.constituency_name).toBe(name);
}
describe("KenyaAdministrativeDivisions - getConstituencies", () => {
  test("No parameter passed", () => {
    const result = kad.getConstituencies();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("wards");
    expectValidConstituency(result[0], "Changamwe");
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
    expectValidConstituency(result[0], "Changamwe");
  });
  test("Valid string passed as param", () => {
    const result = kad.getConstituencies({ countyName: "Mombasa" });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(6);
    expectValidConstituency(result[0], "Changamwe");
  });
  test("Invalid string is passed as param", () => {
    expect(() => {
      const result = kad.getConstituencies({
        countyName: "Invalid County Name",
      });
    }).toThrow("County not found with the provided name");
  });
  test("Valid constituency name passed as parameter", () => {
    const result = kad.getConstituencies({ constituencyName: "Changamwe" });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
    expectValidConstituency(result[0], "Changamwe");
  });
  test("Invalid constituency name passed as parameter", () => {
    expect(() => {
      kad.getConstituencies({
        constituencyName: "Invalid Constituency Name",
      });
    }).toThrow("Constituency not found with the provided name");
  });
});
