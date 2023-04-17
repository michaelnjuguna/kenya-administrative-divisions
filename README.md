# kenya-administrative-divisions
** Effortlessly retrieve the names of Kenya's counties, constituencies, and wards **
## Table of Contents 
+ [Get all](#getall)
+ [Get counties](#getcounties)
+ [Get constituencies](#getconstituencies)
+ [Get wards](#getwards) 

## Features
+ Get names,codes and constituencies of all counties in kenya
+ Get names and wards of all constituences in kenya
+ Get names of all wards in kenya

## Installing

```
npm install kenya-administrative-divisions

```
Once the package is installed you use the require approach

```javascript
const kenyaAdministrativeDivisions = require('kenya-administrative-divisions');

```
** _EVERY FUNCTION RETURNS A PROMISE _ **

## Get all {#getall}

This will retrieve all counties,their names,their code and their constituences. The constituences will also include the ward names. Do not pass parameters to this function.

```javascript
const kenyaAdministrativeDivisions = require('kenya-administrative-divisions');

kenyaAdministrativeDivisions.getAll().then((data) => {
    console.log(data);
    }).catch((error) => {
    console.log(error);
});  

```

## Get counties {#get counties}
This will retrieve information about counties.
```javascript

const kenyaAdministrativeDivisions = require('kenya-administrative-divisions');
// To get all counties and their county code
kenyaAdministrativeDivisions.getCounties().then((data) => {
    console.log(data);
    }).catch((error) => {
    console.log(error);
});

// To get the county the constituencies of a particular county pass the county name
kenyaAdministrativeDivisions.getCounties("nairobi").then((data) => {
    console.log(data);
    }).catch((error) => {
    console.log(error);
});

// To get the county the constituencies of a particular county pass the county code

kenyaAdministrativeDivisions.getCounties(47).then((data) => {
    console.log(data);
    }).catch((error) => {
    console.log(error);
});

```


## Get constituencies {#getconstituences}
This will retrieve information about constituencies

```javascript
const kenyaAdministrativeDivisions = require('kenya-administrative-divisions');

// To get all constituencies and their wards
kenyaAdministrativeDivisions.getConstituencies().then((data) => {
    console.log(data);
    }).catch((error) => {
    console.log(error);
});  

// To get information about a particular constituency pass a string to the function
kenyaAdministrativeDivisions.getConstituencies("mwea").then((data) => {
    console.log(data);
    }).catch((error) => {
    console.log(error);
});  

// To get all constituencies of a particular county pass the county code as a parameter
kenyaAdministrativeDivisions.getConstituencies(1).then((data) => {
    console.log(data);
    }).catch((error) => {
    console.log(error);
}); 

```

## Get wards {#getwards} 
This will retrieve all information about wards

```javascript
const kenyaAdministrativeDivisions = require('kenya-administrative-divisions');
// To get all the wards
kenyaAdministrativeDivisions.getWards().then((data) => {
    console.log(data);
    }).catch((error) => {
    console.log(error);
});
// To get a particular ward pass the name of the wards as a parameter

kenyaAdministrativeDivisions.getWards("bangale").then((data) => {
    console.log(data);
    }).catch((error) => {
    console.log(error);
});

```