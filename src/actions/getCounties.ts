import { County } from "../models";
import { GetCountiesParams } from "../params";
class GetCounties {
  constructor(
    private countyData: County[],
    private params?: GetCountiesParams,
  ) {}
  call(): County[] {
    try {
      if (!this.countyData) {
        throw new Error("Unable to read county data");
      }
      if (!this.params) {
        return this.countyData;
      }

      if (this.params.countyCode !== undefined) {
        if (this.params.countyCode < 1 || this.params.countyCode > 47) {
          throw new Error(
            "Invalid county code. County code should be between 1 and 47",
          );
        }

        return [this.countyData[this.params.countyCode - 1]];
      }
      if (this.params.countyName) {
        const county = this.countyData.find(
          (c) =>
            c.county_name.toLowerCase() ===
            this.params!.countyName!.toLowerCase(),
        );
        return county ? [county] : [];
      }
      return [];
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    }
  }
}

export default GetCounties;
