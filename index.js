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
exports.getAll = ()=>{
    readCountyData().then((data)=>{
        console.log(data)
        return data;
    })
    .catch((error) => {
        console.log(error);
        return;
      })
};


// getCounty
readCountyData().then((data)=>{
    let input = 1;
    if(!input || input === "" || !input.length){
        for(let i = 0;i<47;i++){
            console.log(data[i].county_name)
        }
    }else if(input.typ){
        
    }
})
// getConstituencies
// getWards
