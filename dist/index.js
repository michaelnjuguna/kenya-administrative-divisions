"use strict";
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
exports.__esModule = true;
exports.KenyaAdministrativeDivisions = void 0;
var KenyaAdministrativeDivisions = /** @class */ (function () {
  function KenyaAdministrativeDivisions() {
    // Read the county data
    this.countyData = require("../county.json");
  }
  KenyaAdministrativeDivisions.prototype.getAll = function () {
    return this.countyData ? this.countyData : "Unable to read county data";
  };
  KenyaAdministrativeDivisions.prototype.getCounties = function (input) {
    var counties;
    if (!!input === false) {
      counties = [];
      for (var i = 0; i < this.countyData.length; i++) {
        counties.push(this.countyData[i].county_name);
      }
    } else if (typeof input === "number" && input > 0 && input < 48) {
      counties = this.countyData[input - 1];
    } else if (typeof input === "string") {
      for (var i = 0; i < this.countyData.length; i++) {
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
  };
  KenyaAdministrativeDivisions.prototype.getConstituencies = function (input) {
    var constituencies;
    if (!!input === false) {
      constituencies = [];
      this.countyData.forEach(function (county) {
        county.constituencies.forEach(function (constituency) {
          constituencies.push(constituency.constituency_name);
        });
      });
    } else if (typeof input === "number" && input > 0 && input < 48) {
      constituencies = [];
      this.countyData[input - 1].constituencies.forEach(function (
        constituency
      ) {
        constituencies.push(constituency.constituency_name);
      });
    } else if (typeof input === "string") {
      for (var i = 0; i < this.countyData.length; i++) {
        for (var j = 0; j < this.countyData[i].constituencies.length; j++) {
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
  };
  KenyaAdministrativeDivisions.prototype.getWards = function (
    county,
    constituency
  ) {
    var wards;
    // When no input is provided
    if (!!county === false && !!constituency === false) {
      this.countyData.forEach(function (county) {
        county.constituencies.forEach(function (ward) {
          wards = __spreadArray([], ward.wards, true);
        });
      });
      // When only county code or name is provided
    } else if (!!county && !!constituency === false) {
      if (typeof county === "number" && county > 0 && county < 48) {
        this.countyData[county - 1].constituencies.forEach(function (
          constituency
        ) {
          constituency.forEach(function (ward) {
            wards = __spreadArray([], ward.wards, true);
          });
        });
      } else if (typeof county === "string") {
        for (var i = 0; i < this.countyData.length; i++) {
          if (
            this.countyData[i].county_name.toLowerCase() ===
            county.toLowerCase()
          ) {
            this.countyData[i].constituencies.forEach(function (constituency) {
              constituency.forEach(function (ward) {
                wards = __spreadArray([], ward.wards, true);
              });
            });
            break;
          }
        }
      }
      // When only the constituency name is provided
    } else if (!!county === false && !!constituency) {
      for (var i = 0; i < this.countyData.length; i++) {
        for (var j = 0; j < this.countyData[i].constituencies; j++) {
          if (
            this.countyData[i].constituencies[j].constituency_name
              .toLowerCase === constituency.toLowerCase()
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
          var i = 0;
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
          } else if (typeof county === "string") {
            var targetCounty = county;
            for (var i_1 = 0; i_1 < this.countyData.length; i_1++) {
              if (
                targetCounty.toLowerCase() ===
                this.countyData[i_1].county_name.toLowerCase()
              ) {
                for (
                  var j = 0;
                  j < this.countyData[i_1].constituencies.length;
                  j++
                ) {
                  if (
                    this.countyData[i_1].constituencies[j].constituency_name ===
                    constituency.toLowerCase()
                  ) {
                    wards = this.countyData[i_1].constituencies[j].wards;
                    break;
                  }
                }
                break;
              }
            }
          }
        }
      }
    }
    return !!wards
      ? wards
      : "Error: Invalid parameter provided. Please check your input and try again.";
  };
  return KenyaAdministrativeDivisions;
})();
exports.KenyaAdministrativeDivisions = KenyaAdministrativeDivisions;
//# sourceMappingURL=index.js.map
let test = new KenyaAdministrativeDivisions();
console.log(test.getConstituencies("mvita"));
