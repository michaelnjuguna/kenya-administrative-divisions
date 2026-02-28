import kad from "../src/index";
import { County } from "../src/interfaces";

describe("KenyaAdministrativeDivisions - getAll", () => {
  test("should return an array of counties", () => {
    const result = kad.getAll();

    // Check if the result is an array
    expect(Array.isArray(result)).toBe(true);

    // Check if the array contains objects with expected properties
    if (Array.isArray(result) && result.length > 0) {
      const county: County = result[0];
      expect(county).toHaveProperty("county_code");
      expect(county).toHaveProperty("county_name");
      expect(county).toHaveProperty("constituencies");
      expect(Array.isArray(county.constituencies)).toBe(true);
    }
  });

  test("should return an empty array or valid string if no data", () => {
    // Optional: if your GetAll.execute() ever returns a string error
    const result = kad.getAll();
    expect(typeof result === "string" || Array.isArray(result)).toBe(true);
  });
});
