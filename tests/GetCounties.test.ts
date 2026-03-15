import { KenyaAdministrativeDivisions as kad } from "../src/main";
import { County } from "../src/models";
function expectValidCounty(county: County, code: number, name: string) {
  expect(county).toHaveProperty("county_code", code);
  expect(county).toHaveProperty("county_name", name);
  expect(county).toHaveProperty("constituencies");
  expect(Array.isArray(county.constituencies)).toBe(true);
}
describe("KenyaAdministrativeDivisions - getCounties", () => {
  test("No parameter passed", () => {
    const result = kad.getCounties();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(47);
  });
  test("Valid number passed as parameter", () => {
    const result = kad.getCounties({ countyCode: 1 });
    const countyResult = result[0] as County;
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
    expect(countyResult.county_code).toBe(1);
    if (!!result) {
      expectValidCounty(countyResult, 1, "Mombasa");
    }
  });
  test("Invalid number is passed as param", () => {
    expect(() => {
      kad.getCounties({ countyCode: 48 });
    }).toThrow("Invalid county code. County code should be between 1 and 47");
    expect(() => {
      kad.getCounties({ countyCode: 0 });
    }).toThrow("Invalid county code. County code should be between 1 and 47");
  });
  test("Valid string passed as param", () => {
    const result = kad.getCounties({ countyName: "Mombasa" });
    const countyResult = result[0] as County;
    expect(Array.isArray(result)).toBe(true);
    expect(countyResult.county_code).toBe(1);
    expect(result.length).toBe(1);
    if (!!result) {
      expectValidCounty(countyResult, 1, "Mombasa");
    }
  });
  test("Invalid string is passed as param", () => {
    const result = kad.getCounties({ countyName: "Invalid County Name" });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });
});
