import { KenyaAdministrativeDivisions as kad } from "../src/main";
import { County } from "../src/models";

describe("KenyaAdministrativeDivisions - getAll", () => {
  test("should return an array of counties", () => {
    const result = kad.getAll();

    expect(Array.isArray(result)).toBe(true);

    expect(result.length).toBe(47);

    if (Array.isArray(result) && result.length > 0) {
      const county: County = result[0];
      expect(county).toHaveProperty("county_code");
      expect(county).toHaveProperty("county_name");
      expect(county).toHaveProperty("constituencies");
      expect(Array.isArray(county.constituencies)).toBe(true);
    }
  });
});
