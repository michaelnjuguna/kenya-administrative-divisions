"use strict";
import GetAll from "./actions/getAll";
import { County, Constituency, Ward } from "./interfaces";
class KenyaAdministrativeDivisions {
  // TODO: Break all forEach loops
  // TODO: Use map,filter,reduce
  // TODO: Add tests
  // TODO: Move to actions pattern
  // TODO: Add changelogs
  // TODO: Add github actions
  // TODO: Update documentation
  private countyData: any;
  constructor() {
    // Read the county data
    this.countyData = require("../county.json");
  }
  // Get all the information
  public getAll(): County[] | string {
    return new GetAll(this.countyData).execute();
  }
  public getCounties(input?: number | string) {
    let counties;
    if (!!input === false) {
      counties = [];
      for (let i = 0; i < this.countyData.length; i++) {
        counties.push(this.countyData[i].county_name);
      }
    } else if (typeof input === "number" && input > 0 && input < 48) {
      counties = this.countyData[input - 1];
    } else if (typeof input === "string") {
      for (let i = 0; i < this.countyData.length; i++) {
        if (
          this.countyData[i].county_name.toLowerCase() === input.toLowerCase()
        ) {
          counties = this.countyData[i];
          break;
        }
      }
    }

    return !!counties
      ? counties
      : "Error: Invalid parameter provided. Please check your input and try again.";
  }
  public getConstituencies(input?: number | string) {
    let constituencies: any;
    if (!!input === false) {
      constituencies = [];
      this.countyData.forEach((county: County) => {
        county.constituencies.forEach((constituency) => {
          constituencies.push(constituency.constituency_name);
        });
      });
    } else if (typeof input === "number" && input > 0 && input < 48) {
      constituencies = [];
      this.countyData[input - 1].constituencies.forEach(
        (constituency: Constituency) => {
          constituencies.push(constituency.constituency_name);
        },
      );
    } else if (typeof input === "string") {
      for (let i = 0; i < this.countyData.length; i++) {
        for (let j = 0; j < this.countyData[i].constituencies.length; j++) {
          if (
            this.countyData[i].constituencies[
              j
            ].constituency_name.toLowerCase() === input.toLowerCase()
          ) {
            constituencies = this.countyData[i].constituencies[j];
            break;
          }
        }
      }
    }

    return !!constituencies
      ? constituencies
      : "Error: Invalid parameter provided. Please check your input and try again.";
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

export default new KenyaAdministrativeDivisions();
