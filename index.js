const fs = require("fs");
// read county.json file
function readCountyData() {
  return new Promise((resolve, reject) => {
    fs.readFile("county.json", "utf-8", (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

// readCountyData()
//   .then((data) => {
//     countyData = data;
//     // console.log(countyData);
//   })
//   .catch((error) => {
//     console.log(error);
//     return;
//   });

// getAll
exports.getAll = () => {
  readCountyData()
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
      return;
    });
};

// getCounty
exports.getCounty = (input) => {
  readCountyData()
    .then((data) => {
      // county code or name
      let result = [];
      // when input is empty
      if (
        typeof input === "undefined" ||
        input === null ||
        input === "" ||
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
      return result;
    })
    .catch((error) => {
      console.log(error);
      return;
    });
};
// getConstituencies
exports.getConstituencies = (input) => {
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
            });
          }
        }
        // when input is a string
      } else if (typeof input === "string") {
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
          // when result is not empty
          if (result.length > 0) {
            break;
          }
        }
      }
      if (result.length === 0) {
        result = "Invalid constituency name";
      }
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.log(error);
      return;
    });
};
// getWards
exports.getWards = (input) => {
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
            // console.log(data[i].constituencies[j].wards,data[i].county_name);
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
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
      return;
    });
};