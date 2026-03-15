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
});
