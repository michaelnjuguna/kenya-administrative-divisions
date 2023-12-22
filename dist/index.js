"use strict";
var countyData = require("../county.json");
// read county.json file
function readCountyData() {
    return new Promise(function (resolve, reject) {
        if (countyData) {
            resolve(countyData);
        }
        else {
            reject(new Error("Error: Unable to read county data."));
        }
    });
}
// get all information(counties, constituencies, wards)
function getAll() {
    return readCountyData();
}
// get Counties
function getCounties(input) {
    return new Promise(function (resolve, reject) {
        readCountyData()
            .then(function (data) {
            // county code or name
            var result = [];
            // when input is empty
            if (!input) {
                result = data.map(function (_a) {
                    var county_code = _a.county_code, county_name = _a.county_name;
                    return ({
                        county_code: county_code,
                        county_name: county_name,
                    });
                });
                // when input is a number
            }
            else if (typeof input === "number" && input > 0 && input < 48) {
                var countyIndex = input - 1;
                result.push({
                    county_code: data[countyIndex].county_code,
                    county_name: data[countyIndex].county_name,
                    constituencies: data[countyIndex].constituencies,
                });
                // when result is a string
            }
            else if (typeof input === "string") {
                result = data.filter(function (county) { return county.county_name.toLowerCase() === input.toLowerCase(); });
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
            .catch(function (error) {
            reject(error.message);
        });
    });
}
// get Constituencies
function getConstituencies(input) {
    return new Promise(function (resolve, reject) {
        readCountyData()
            .then(function (data) {
            var result = [];
            // when input is empty
            if (!input) {
                data.forEach(function (_a) {
                    var county_name = _a.county_name, county_code = _a.county_code, constituencies = _a.constituencies;
                    constituencies.forEach(function (_a) {
                        var constituency_name = _a.constituency_name;
                        result.push({
                            county_code: county_code,
                            county_name: county_name,
                            constituency_name: constituency_name,
                        });
                    });
                });
                // when input is a string
            }
            else if (typeof input === "string") {
                data.forEach(function (_a) {
                    var constituencies = _a.constituencies, county_name = _a.county_name, county_code = _a.county_code;
                    constituencies.forEach(function (_a) {
                        var constituency_name = _a.constituency_name, wards = _a.wards;
                        if (constituency_name.toLowerCase() === input.toLowerCase()) {
                            result.push({
                                county_code: county_code,
                                county_name: county_name,
                                constituency_name: constituency_name,
                                wards: wards,
                            });
                        }
                    });
                });
            }
            // get constituencies by county code
            else if (typeof input === "number" && input > 0 && input < 48) {
                var countyIndex = input - 1;
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
            .catch(function (error) {
            reject(error.message);
        });
    });
}
// get Wards
function getWards(input) {
    return new Promise(function (resolve, reject) {
        readCountyData()
            .then(function (data) {
            var result = [];
            // when input is empty
            if (!input) {
                data.forEach(function (_a) {
                    var constituencies = _a.constituencies, county_name = _a.county_name, county_code = _a.county_code;
                    constituencies.forEach(function (_a) {
                        var constituency_name = _a.constituency_name, wards = _a.wards;
                        wards.forEach(function (ward_name) {
                            result.push({
                                county_code: county_code,
                                county_name: county_name,
                                constituency_name: constituency_name,
                                ward_name: ward_name,
                            });
                        });
                    });
                });
                // when input is a string
            }
            else if (typeof input === "string") {
                data.forEach(function (_a) {
                    var constituencies = _a.constituencies, county_name = _a.county_name, county_code = _a.county_code;
                    constituencies.forEach(function (_a) {
                        var constituency_name = _a.constituency_name, wards = _a.wards;
                        wards.forEach(function (ward_name) {
                            if (ward_name.toLowerCase() === input.toLowerCase()) {
                                result.push({
                                    county_code: county_code,
                                    county_name: county_name,
                                    constituency_name: constituency_name,
                                    ward_name: ward_name,
                                });
                            }
                        });
                    });
                });
            }
            // get wards by county code
            else if (typeof input === "number" && input > 0 && input < 48) {
                var countyIndex_1 = input - 1;
                data[countyIndex_1].constituencies.forEach(function (_a) {
                    var constituency_name = _a.constituency_name, wards = _a.wards;
                    wards.forEach(function (ward_name) {
                        result.push({
                            county_code: data[countyIndex_1].county_code,
                            county_name: data[countyIndex_1].county_name,
                            constituency_name: constituency_name,
                            ward_name: ward_name,
                        });
                    });
                });
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
            .catch(function (error) {
            // console.log(error);
            reject(error.message);
        });
    });
}
module.exports = {
    getAll: getAll,
    getCounties: getCounties,
    getConstituencies: getConstituencies,
    getWards: getWards,
};
//# sourceMappingURL=index.js.map