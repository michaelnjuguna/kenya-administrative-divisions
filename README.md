# kenya-administrative-divisions
** Effortlessly retrieve the names of Kenya's counties, constituencies, and wards **
## Table of Contents 
+ [Get all](#get-all)
+ [Get counties](#get-counties)
+ [Get constituencies](#get-constituencies)
+ [Get wards](#get-wards) 

## Features
+ Get names,codes and constituencies of all counties in kenya
+ Get names and wards of all constituences in kenya
+ Get names of all wards in kenya

## Installing

```
npm install kenya-administrative-divisions

OR

yarn add kenya-administrative-divisions

```
Once the package is installed you use the require approach

```javascript
const kenyaAdministrativeDivisions = require('kenya-administrative-divisions');

OR

import kenyaAdministrativeDivisions from 'kenya-administrative-divisions'

```

Or with TypeScript
```typescript
import * as kenyaAdministrativeDivisions from 'kenya-administrative-divisions'
```
create a `.d.ts` file and add
```ts
declare module 'kenya-administrative-divisions'
```

## #Get all 

This will retrieve all counties,their names,their code and their constituences. The constituences will also include the ward names. Do not pass parameters to this function.

```javascript
const kenyaAdministrativeDivisions = require('kenya-administrative-divisions');

kenyaAdministrativeDivisions.getAll();

```

## #Get counties
This will retrieve information about counties.
```javascript

const kenyaAdministrativeDivisions = require('kenya-administrative-divisions');
// To get all counties and their county code
kenyaAdministrativeDivisions.getCounties();

// To get the county the constituencies of a particular county pass the county name
kenyaAdministrativeDivisions.getCounties("nairobi");
kenyaAdministrativeDivisions.getCounties("kis");

// To get the county the constituencies of a particular county pass the county code

kenyaAdministrativeDivisions.getCounties(47);

```

## #Get county
This will retrieve information about a particular county.
```javascript

const kenyaAdministrativeDivisions = require('kenya-administrative-divisions');

// To get the county the constituencies of a particular county pass the county name
kenyaAdministrativeDivisions.getCounties("nairobi");
kenyaAdministrativeDivisions.getCounties("momb");

// To get the county the constituencies of a particular county pass the county code

kenyaAdministrativeDivisions.getCounties(47);

```

## #Get constituencies
This will retrieve information about constituencies

```javascript
const kenyaAdministrativeDivisions = require('kenya-administrative-divisions');

// To get all constituencies and their wards
kenyaAdministrativeDivisions.getConstituencies(); 

// To get information about a particular constituency pass a string to the function
kenyaAdministrativeDivisions.getConstituencies("mwea");  

// To get all constituencies of a particular county pass the county code as a parameter
kenyaAdministrativeDivisions.getConstituencies(1); 

```

## #Get wards
This will retrieve all information about wards

```javascript
const kenyaAdministrativeDivisions = require('kenya-administrative-divisions');
// To get all the wards
kenyaAdministrativeDivisions.getWards();

// To get a particular ward pass the name of the wards as a parameter
kenyaAdministrativeDivisions.getWards("bangale");

// To get wards in a county, by code
kenyaAdministrativeDivisions.getWards(43);

```