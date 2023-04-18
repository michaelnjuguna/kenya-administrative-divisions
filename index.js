// read county.json file
const countyData = require("./county.json");

// get all information(counties, constituencies, wards)
function getAll() {
  return countyData;
}

// get Counties, filter by name, code
function getCounties(input) {
  const data = countyData;

  // when input is empty
  if (!input) {
    return data.map((c) => ({
      county_code: c.county_code,
      county_name: c.county_name,
    }));
  }
  if (typeof input === "number") {
    return data.filter((c) => c.county_code === parseInt(input, 10));
  }
  if (typeof input === "string") {
    return data.filter((c) =>
      c.county_name.toLowerCase().includes(input.toLowerCase())
    );
  }

  return [];
}

// find county by code or name
function getCounty(input) {
  const data = countyData;
  if (typeof input === "number") {
    return data.find((c) => c.county_code === parseInt(input, 10));
  }
  if (typeof input === "string") {
    return data.find((c) =>
      c.county_name.toLowerCase().includes(input.toLowerCase())
    );
  }
  return null;
}

// get all Constituencies or by name, or county code
function getConstituencies(input) {
  const data = countyData;

  let result = [];
  // when input is empty
  if (!input) {
    // NOITE: we could still use map
    for (let i = 0; i < 47; i++) {
      for (let j = 0; j < data[i].constituencies.length; j++) {
        result.push({
          county_name: data[i].county_name,
          county_code: data[i].county_code,
          constituency_name: data[i].constituencies[j].constituency_name,
          wards: data[i].constituencies[j].wards,
        });
      }
    }
    return result;
    // when input is a string
  }
  if (typeof input === "string") {
    for (let i = 0; i < 47; i++) {
      for (let j = 0; j < data[i].constituencies.length; j++) {
        if (
          // eg for constituencies like Kabodo Kasipul and Kasipul, no harm to return both
          data[i].constituencies[j].constituency_name
            .toLowerCase()
            .includes(input.toLowerCase())
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
    return result;
  }
  // get constituencies by county code
  if (
    (typeof input === "number" && input > 0 && input < 48) ||
    (typeof +input === "number" && !isNaN(+input) && +input > 0 && +input < 48)
  ) {
    result = data[input - 1].constituencies;
    return result;
  }

  // return empty array if none
  return result;
}

// get Wards, filter by ward name or county code
function getWards(input) {
  const data = countyData;

  let result = [];
  // when input is empty
  if (!input) {
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

    return result;
  }

  if (typeof input === "string") {
    for (let i = 0; i < 47; i++) {
      for (let j = 0; j < data[i].constituencies.length; j++) {
        for (let k = 0; k < data[i].constituencies[j].wards.length; k++) {
          if (
            data[i].constituencies[j].wards[k]
              .toLowerCase()
              .includes(input.toLowerCase())
          ) {
            result.push({
              county_name: data[i].county_name,
              county_code: data[i].county_code,
              constituency_name: data[i].constituencies[j].constituency_name,
              ward_name: data[i].constituencies[j].wards[k],
            });
          }
        }
      }
    }

    return result;
  }

  // get wards by county code
  if (
    (typeof input === "number" && input > 0 && input < 48) ||
    (typeof +input === "number" && !isNaN(+input) && +input > 0 && +input < 48)
  ) {
    const countyConstituencies = data[input - 1].constituencies;
    for (let j = 0; j < countyConstituencies.length; j++) {
      for (let k = 0; k < countyConstituencies[j].wards.length; k++) {
        result.push({
          county_name: data[input - 1].county_name,
          county_code: data[input - 1].county_code,
          constituency_name: countyConstituencies[j].constituency_name,
          ward_name: countyConstituencies[j].wards[k],
        });
      }
    }

    return result;
  }

  // return empty array
  return result;
}

module.exports = {
  getAll,
  getCounties,
  getCounty,
  getConstituencies,
  getWards,
};
