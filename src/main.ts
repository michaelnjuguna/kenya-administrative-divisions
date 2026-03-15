"use strict";
import GetAll from "./actions/getAll";
import GetCounties from "./actions/getCounties";
import GetConstituencies from "./actions/getConstituencies";
import { County, Constituency, Ward } from "./models";
import { GetCountiesParams, GetConstituenciesParams } from "./params";

class Main {
  // TODO: Break all forEach loops
  // TODO: Use map,filter,reduce
  // TODO: Add tests
  // TODO: Move to actions pattern
  // TODO: Add changelogs
  // TODO: Add github actions
  // TODO: Update documentation
  // TODO: Use ESM

  private countyData: any;
  constructor() {
    // Read the county data
    this.countyData = require("../county.json");
  }
  // Get all the information
  public getAll(): County[] | string {
    return new GetAll(this.countyData).call();
  }

  public getCounties(params?: GetCountiesParams): County[] {
    return new GetCounties(this.countyData, params).call();
  }
  public getCountyNames(): String[] {
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
  public getConstituencyNames(): String[] {
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

  public getWardNames(): String[] {
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
  public getWards(county?: string | number, constituency?: string) {
    let wards: any;

    // When no input is provided
    if (!!county === false && !!constituency === false) {
      wards = [];
      this.countyData.forEach((county: County) => {
        county.constituencies.forEach((constituency: Constituency) => {
          constituency.wards.forEach((ward) => {
            wards.push(ward);
          });
        });
      });
      // When only county code or name is provided
    } else if (!!county && !!constituency === false) {
      wards = [];
      if (typeof county === "number" && county > 0 && county < 48) {
        this.countyData[county - 1].constituencies.forEach(
          (constituency: Constituency) => {
            constituency.wards.forEach((ward: Ward) => {
              wards.push(ward);
            });
          },
        );
      } else if (typeof county === "string") {
        for (let i = 0; i < this.countyData.length; i++) {
          if (
            this.countyData[i].county_name.toLowerCase() ===
            county.toLowerCase()
          ) {
            this.countyData[i].constituencies.forEach(
              (constituency: Constituency) => {
                constituency.wards.forEach((ward: Ward) => {
                  wards.push(ward);
                });
              },
            );
            break;
          }
        }
      }
      // When only the constituency name is provided
    } else if (!!county === false && !!constituency) {
      for (let i = 0; i < this.countyData.length; i++) {
        for (let j = 0; j < this.countyData[i].constituencies.length; j++) {
          if (
            this.countyData[i].constituencies[
              j
            ].constituency_name.toLowerCase() === constituency.toLowerCase()
          ) {
            wards = this.countyData[i].constituencies[j].wards;
            break;
          }
        }
      }
      // When both the county name/code and the constituency names are provided
    } else if (!!county && !!constituency) {
      if (typeof county === "number" && county > 0 && county < 48) {
        for (
          let i = 0;
          i < this.countyData[county - 1].constituencies.length;
          i++
        ) {
          if (
            this.countyData[county - 1].constituencies[
              i
            ].constituency_name.toLowerCase() === constituency.toLowerCase()
          ) {
            wards = this.countyData[county - 1].constituencies[i].wards;
            break;
          }
        }
      } else if (typeof county === "string") {
        const targetCounty: string = county;
        for (let i = 0; i < this.countyData.length; i++) {
          if (
            targetCounty.toLowerCase() ===
            this.countyData[i].county_name.toLowerCase()
          ) {
            for (let j = 0; j < this.countyData[i].constituencies.length; j++) {
              if (
                this.countyData[i].constituencies[
                  j
                ].constituency_name.toLowerCase() === constituency.toLowerCase()
              ) {
                wards = this.countyData[i].constituencies[j].wards;
                break;
              }
            }
            break;
          }
        }
      }
    }

    return !!wards
      ? wards
      : "Error: Invalid parameter provided. Please check your input and try again.";
  }
}

export const KenyaAdministrativeDivisions = new Main();
