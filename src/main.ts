import GetAll from "./actions/getAll.js";
import GetCounties from "./actions/getCounties.js";
import GetConstituencies from "./actions/getConstituencies.js";
import GetWards from "./actions/getWards.js";
import { County, Constituency, Ward } from "./models.js";
import countyData from "../county.json" with { type: "json" };
import {
  GetCountiesParams,
  GetConstituenciesParams,
  GetWardsParams,
} from "./params.js";

class Main {
  // TODO: Add changelogs
  // TODO: Add github actions
  // TODO: Update documentation
  // TODO: Use ESM

  private countyData: any;
  constructor() {
    // Read the county data
    this.countyData = countyData;
  }
  // Get all the information
  public getAll(): County[] {
    return new GetAll(this.countyData).call();
  }

  public getCounties(params?: GetCountiesParams): County[] {
    return new GetCounties(this.countyData, params).call();
  }
  public getCountyNames(): string[] {
    try {
      if (!this.countyData) {
        throw new Error("Unable to read county data");
      }
      return this.countyData.map((county: County) => county.county_name);
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    }
  }

  public getConstituencies(input?: GetConstituenciesParams): Constituency[] {
    return new GetConstituencies(this.countyData, input).call();
  }
  public getConstituencyNames(): string[] {
    try {
      if (!this.countyData) {
        throw new Error("Unable to read county data");
      }
      return this.countyData
        .map((county: County) =>
          county.constituencies.map(
            (constituency: Constituency) => constituency.constituency_name,
          ),
        )
        .flat();
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    }
  }

  public getWardNames(): string[] {
    try {
      if (!this.countyData) {
        throw new Error("Unable to read county data");
      }
      return this.countyData
        .map((county: County) =>
          county.constituencies.map((constituency: Constituency) =>
            constituency.wards.map((ward: Ward) => ward),
          ),
        )
        .flat(2);
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    }
  }
  public getWards(params?: GetWardsParams): Ward[] {
    return new GetWards(this.countyData, params).call();
  }
}

export const KenyaAdministrativeDivisions = new Main();
