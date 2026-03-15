import { Ward } from "../models.js";
import { GetWardsParams } from "../params.js";

class GetWards {
  constructor(
    private countyData: any,
    private params?: GetWardsParams,
  ) {}
  call(): Ward[] {
    try {
      if (!this.countyData) {
        throw new Error("Unable to read county data");
      }
      if (!this.params) {
        return this.countyData
          .map((county: any) =>
            county.constituencies.map((constituency: any) =>
              constituency.wards.map((ward: any) => ward),
            ),
          )
          .flat(2);
      }
      if (this.params.countyCode !== undefined) {
        if (this.params.countyCode < 1 || this.params.countyCode > 47) {
          throw new Error(
            "Invalid county code. County code should be between 1 and 47",
          );
        }
        return this.countyData[this.params.countyCode - 1].constituencies
          .map((constituency: any) => constituency.wards)
          .flat();
      }
      if (this.params.countyName) {
        const county = this.countyData.find(
          (c: any) =>
            c.county_name.toLowerCase() ===
            this.params!.countyName!.toLowerCase(),
        );
        if (!county) {
          throw new Error("County not found with the provided name");
        }
        return county.constituencies
          .map((constituency: any) => constituency.wards)
          .flat();
      }
      if (this.params.constituencyName) {
        const match = this.countyData
          .flatMap((county: any) => county.constituencies)
          .find(
            (c: any) =>
              c.constituency_name.toLowerCase() ===
              this.params!.constituencyName!.toLowerCase(),
          );
        if (!match) {
          throw new Error("Constituency not found with the provided name");
        }
        return match.wards;
      }
      return [];
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    }
  }
}

export default GetWards;
