"use strict";

interface WardInfo {
  county_name: string;
  county_code: number;
  constituency_name: string;
  ward_name: string;
}

interface ConstituencyInfo {
  county_name: string;
  county_code: number;
  constituency_name?: string;
  wards?: string[];
}

interface CountyInfo {
  county_code: number;
  county_name: string;
  constituencies?: ConstituencyInfo[];
}

const countyData: CountyInfo[] = require("../county.json");
// read county.json file
function readCountyData(): Promise<CountyInfo[]> {
  return new Promise((resolve, reject) => {
    if (countyData) {
      resolve(countyData);
    } else {
      reject(new Error("Error: Unable to read county data."));
    }
  });
}
// get all information(counties, constituencies, wards)
function getAll(): Promise<CountyInfo[]> {
  return readCountyData();
}
// get Counties
function getCounties(input?: number | string): Promise<CountyInfo[]> {
  return new Promise((resolve, reject) => {
    readCountyData()
      .then((data) => {
        // county code or name
        let result:CountyInfo[] = [];
        // when input is empty
        if (!input) {
          result = data.map(({ county_code, county_name }) => ({
            county_code,
            county_name,
          }));
          
          // when input is a number
        } else if (typeof input === "number" && input > 0 && input < 48) {
          const countyIndex = input - 1;
          result.push({
            county_code: data[countyIndex].county_code,
            county_name: data[countyIndex].county_name,
            constituencies: data[countyIndex].constituencies,
          });
          // when result is a string
        } else if (typeof input === "string") {
          result = data.filter(
            (county) => county.county_name.toLowerCase() === input.toLowerCase()
          );
        }
        if (result.length === 0) {
          result.push({
            county_code: -1,
            county_name: "Invalid county name or code",
            constituencies: [],
          });
        }
        resolve(result);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
}
// get Constituencies
function getConstituencies(
  input?: number | string
): Promise<ConstituencyInfo[] | string> {
  return new Promise((resolve, reject) => {
    readCountyData()
      .then((data) => {
        let result: ConstituencyInfo[] = [];
        // when input is empty
        if (!input) {
          data.forEach(({ county_name, county_code, constituencies }) => {
            constituencies.forEach(({ constituency_name }) => {
              result.push({
                county_code,
                county_name,
                constituency_name,
              });
            });
          });
          // when input is a string
        } else if (typeof input === "string") {
          data.forEach(({ constituencies, county_name, county_code }) => {
            constituencies.forEach(({ constituency_name, wards }) => {
              if (constituency_name.toLowerCase() === input.toLowerCase()) {
                result.push({
                  county_code,
                  county_name,
                  constituency_name,
                  wards,
                });
              }
            });
          });
        }
        // get constituencies by county code
        else if (typeof input === "number" && input > 0 && input < 48) {
          const countyIndex = input - 1;
          result = data[countyIndex].constituencies;
        }
        // when input is invalid
        if (result.length === 0) {
          result.push({
            county_name: "Invalid constituency name",
            county_code: -1,
            constituency_name: "",
            wards: [],
          });
        }
        resolve(result);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
}
// get Wards
function getWards(input?: number | string): Promise<WardInfo[] | string> {
  return new Promise((resolve, reject) => {
    readCountyData()
      .then((data) => {
        let result = [];
        // when input is empty
        if (!input) {
          data.forEach(({ constituencies, county_name, county_code }) => {
            constituencies.forEach(({ constituency_name, wards }) => {
              wards.forEach((ward_name) => {
                result.push({
                  county_code,
                  county_name,
                  constituency_name,
                  ward_name,
                });
              });
            });
          });
          // when input is a string
        } else if (typeof input === "string") {
          data.forEach(({ constituencies, county_name, county_code }) => {
            constituencies.forEach(({ constituency_name, wards }) => {
              wards.forEach((ward_name) => {
                if (ward_name.toLowerCase() === input.toLowerCase()) {
                  result.push({
                    county_code,
                    county_name,
                    constituency_name,
                    ward_name,
                  });
                }
              });
            });
          });
        }
        // get wards by county code
        else if (typeof input === "number" && input > 0 && input < 48) {
          const countyIndex = input - 1;
          data[countyIndex].constituencies.forEach(
            ({ constituency_name, wards }) => {
              wards.forEach((ward_name) => {
                result.push({
                  county_code: data[countyIndex].county_code,
                  county_name: data[countyIndex].county_name,
                  constituency_name,
                  ward_name,
                });
              });
            }
          );
        }
        if (result.length === 0) {
          result.push({
            county_name: "Invalid ward name",
            county_code: -1,
            constituency_name: "",
            ward_name: "",
          });
        }
        resolve(result);
      })
      .catch((error) => {
        // console.log(error);
        reject(error.message);
      });
  });
}
module.exports = {
  getAll,
  getCounties,
  getConstituencies,
  getWards,
};
