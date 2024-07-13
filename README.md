# Kenya Administrative Divisions

The **Kenya Administrative Divisions** is a package that provides functionality to retrieve administrative divisions data about Kenya. It includes information about counties, constituencies, and wards.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Getting started](#getting-started)
  - [Methods available](#methods-available)
    - [Get all](#get-all)
    - [Get counties](#get-counties)
    - [Get constituencies](#get-constituencies)
    - [Get wards](#get-wards)
- [Contributing](#contributing)
- [Support](#support)

## Installation

```bash
# npm
npm install kenya-administrative-divisions

# pnpm
pnpm install kenya-administrative-divisions

# yarn
yarn add kenya-administrative-divisions
```

## Usage

### Getting started

To use the library, instantiate the `KenyaAdministrativeDivisions` class:

```javascript
const {
  kenyaAdministrativeDivisions,
} = require("kenya-administrative-divisions");

// Instantiate the class
const kenyaAdmin = new KenyaAdministrativeDivisions();
```

## Methods available

### Get All

```javascript
// Get All the data
const data = kenyaAdmin.getAll();
```

### Get Counties

```javascript
// Get all the counties names
const counties = kenyaAdmin.getCounties();

// Get the details of the county whose county code is passed as shown
const county = kenyaAdmin.getCounties(1);

// Get the details of a particular county by passing its name
const county = kenyaAdmin.getCounties("Nairobi");
```

### Get Constituencies

```javascript
// Returns a list of all constituency names
const constituencies = kenyaAdmin.getConstituencies();

// Returns the constituencies of the county whose county code has been passed
const constituency = kenyaAdmin.getConstituencies(1);

// Returns details of the constituency whose name has been passed
const data = kenyaAdmin.getConstituencies("Westlands");
```

### Get wards

```javascript
// Returns all ward names
const wards = kenyaAdmin.getWards();

// Returns wards names of a particular county by passing its county code
const wards = kenyaAdmin.getWards(1);

// Return wards names of a particular county by passing its name
const wards = kenyaAdmin.getWards("Nairobi");

// Return ward names of a particular county and constituency by passing the respective county code/name(optional) and constituency name(optional)
const wards = kenyaAdmin.getWards(1, "Mvita");
const wards = kenyaAdmin.getWards("Mombasa", "Mvita");

// Get the wards of a particular constituency by passing its name as shown
const wards = kenyaAdmin.getWards(null, "Mvita");
```

## Contributing

1. Fork this repository.
2. Create new branch with feature name.
3. Create your feature.
4. Commit and set commit message with feature name.
5. Push your code to your fork repository.
6. Create pull request.

## Support

If you like this project, you can support me with starring ⭐ this repository.

## License

[MIT](LICENSE.txt)

Made with 💜
