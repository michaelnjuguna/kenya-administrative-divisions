import { County, Constituency } from "../models";
import { GetConstituenciesParams } from "../params";

class GetConstituencies {
  constructor(
    private countyData: County[],
    private params?: GetConstituenciesParams,
  ) {}
  call(): Constituency[] {
    try {
      if (!this.params) {
        return this.countyData.map((county) => county.constituencies).flat();
      }
      if (this.params.countyCode) {
        if (this.params.countyCode < 1 || this.params.countyCode > 47) {
          throw new Error(
            "Invalid county code. County code should be between 1 and 47",
          );
        }
        return this.countyData[this.params.countyCode - 1].constituencies;
      }
      if (this.params.constituencyName) {
        const match = this.countyData
          .flatMap((county) => county.constituencies)
          .find(
            (c) =>
              c.constituency_name.toLowerCase() ===
              this.params!.constituencyName!.toLowerCase(),
          );
        return match ? [match] : [];
      }
      if (this.params.countyName) {
        return (
          this.countyData.find(
            (c) =>
              c.county_name.toLowerCase() ===
              this.params!.countyName!.toLowerCase(),
          )?.constituencies || []
        );
      }
      return [];
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    }
  }
}

export default GetConstituencies;
