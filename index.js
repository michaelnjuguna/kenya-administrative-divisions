const fs = require("fs");
let countyData = [];
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

readCountyData()
  .then((data) => {
    countyData = data;
    // console.log(countyData);
  })
  .catch((error) => {
    console.log(error);
    return;
  });

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
exports.getCounty = (input)=>{
readCountyData().then((data) => {
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
    (typeof +input === "number" && !isNaN(+input) && +input > 0 && +input < 48)
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
  } else if (result.length === 0) {
    result = "Invalid input";
  } else {
    result = "Invalid input";
  }
  console.log(result);
  return result;
})};
// getConstituencies


// getWards
