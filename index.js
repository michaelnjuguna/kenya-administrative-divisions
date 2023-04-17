const fs = require("fs");
const path = require('path');
// read county.json file
const countyDataFilePath = path.join(__dirname, 'county.json');
function readCountyData() {
  return new Promise((resolve, reject) => {
    fs.readFile(countyDataFilePath, "utf-8", (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}
// get all information(counties, constituencies, wards)
function getAll(){
  return new Promise((resolve, reject) => {
  readCountyData()
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      console.log(error);
      reject(error);
    });
  });
};

// get Counties 
function getCounties(input){
  return new Promise((resolve, reject) => {
  readCountyData()
    .then((data) => {
      // county code or name
      let result = [];
      // when input is empty
      if (
        input === "" || 
        input === null ||
        input === undefined ||
        input === 0 ||
        input.length === 0
      ) {
        for (let i = 0; i < 47; i++) {
          result.push({
            county_code: data[i].county_code,
            county_name: data[i].county_name,
          });
        }
        // when result is a number
      } else if (
        (input > 0 && input < 48 && typeof input === "number") ||
        (typeof +input === "number" &&
          !isNaN(+input) &&
          +input > 0 &&
          +input < 48)
      ) {
        input = input - 1;
        result.push({
          county_code: data[input].county_code,
          county_name: data[input].county_name,
          constituencies: data[input].constituencies,
        });
        // when result is a string
      } else if (typeof input === "string") {
        for (let i = 0; i < 47; i++) {
          if (data[i].county_name.toLowerCase() === input.toLowerCase()) {
            result.push({
              county_code: data[i].county_code,
              county_name: data[i].county_name,
              constituencies: data[i].constituencies,
            });
          }
        }
      }
      if (result.length === 0) {
        result = "Invalid county name or code";
        console.log(result);
      }
      // console.log(result);
      resolve(result);
    })
    .catch((error) => {
      console.log(error);
      reject(error);
    });
  });
  };

// get Constituencies
function getConstituencies(input){
  return new Promise((resolve, reject) => {
  readCountyData()
    .then((data) => {
      let result = [];
      // when input is empty
      if (
        input === "" ||
        input === null ||
        input === undefined ||
        input === 0 ||
        input.length === 0
      ) {
        for (let i = 0; i < 47; i++) {
          for (let j = 0; j < data[i].constituencies.length; j++) {
            result.push({
              county_name: data[i].county_name,
              county_code: data[i].county_code,
              constituency_name: data[i].constituencies[j].constituency_name,
              wards: data[i].constituencies[j].wards
            });
          }
        }
        // when input is a string
      } else if (typeof input === "string" && typeof +input !== "number") {
        for (let i = 0; i < 47; i++) {
          for (let j = 0; j < data[i].constituencies.length; j++) {
            if (
              data[i].constituencies[j].constituency_name.toLowerCase() ===
              input.toLowerCase()
            ) {
              result.push({
                county_name: data[i].county_name,
                county_code: data[i].county_code,
                constituency_name: data[i].constituencies[j].constituency_name,
                wards: data[i].constituencies[j].wards,
              });
              break;
            }
          }
        }
      } 
      // get constituencies by county code
      else if (typeof input === "number" && input > 0 && input < 48 || (typeof +input === "number" && !isNaN(+input) && +input > 0 && +input < 48)) {
        result = data[input - 1].constituencies
    
      }
      // when input is invalid
      if (result.length === 0) {
        result = "Invalid constituency name";
      }
      resolve(result);
    })
    .catch((error) => {
      console.log(error);
      reject(error);
    
    });
  });
};
// get Wards
function getWards(input){
  return new Promise((resolve, reject) => {
  readCountyData()
    .then((data) => {
      let result = [];
      // when input is empty
      if (
        input === "" ||
        input === null ||
        input === undefined ||
        input === 0 ||
        input.length === 0
      ) {
        for (let i = 0; i < 47; i++) {
          for (let j = 0; j < data[i].constituencies.length; j++) {
            for (let k = 0; k < data[i].constituencies[j].wards.length; k++) {
              result.push({
                county_name: data[i].county_name,
                county_code: data[i].county_code,
                constituency_name: data[i].constituencies[j].constituency_name,
                ward_name: data[i].constituencies[j].wards[k],
              });
            }
          }
        }
      } else if (typeof input === "string") {
        for (let i = 0; i < 47; i++) {
          for (let j = 0; j < data[i].constituencies.length; j++) {
            for (let k = 0; k < data[i].constituencies[j].wards.length; k++) {
              if (
                data[i].constituencies[j].wards[k].toLowerCase() ===
                input.toLowerCase()
              ) {
                result.push({
                  county_name: data[i].county_name,
                  county_code: data[i].county_code,
                  constituency_name:
                    data[i].constituencies[j].constituency_name,
                  ward_name: data[i].constituencies[j].wards[k],
                });
              }
            }
          }
        }
      }
      if (result.length === 0) {
        result = "invalid ward name";
      }
    resolve(result);
    })
    .catch((error) => {
      console.log(error);
      reject(error);
    });
  });
};

module.exports = {getAll, getCounties, getConstituencies, getWards}