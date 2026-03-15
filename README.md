# Kenya Administrative Divisions

The **Kenya Administrative Divisions** is a package that provides functionality to retrieve administrative divisions data about Kenya. It includes information about counties, constituencies, and wards.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for all changes.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Basic initialization](#basic-initialization)
  - [Methods available](#methods-available)
    - [Retrieving names](#retrieving-names)
    - [Get all](#get-all)
    - [Get counties](#get-counties)
    - [Get constituencies](#get-constituencies)
    - [Get wards](#get-wards)
    - [API reference](#api-reference)
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

### Basic initialization

```javascript
import { KenyaAdministrativeDivisions as kad } from "kenya-administrative-divisions";
```

## Methods available

### Retrieving names

```javascript
// Get all 47 County names
const counties = kad.getCountyNames();

// Get all Constituency names
const constituencies = kad.getConstituencyNames();

// Get all Ward names
const wards = kad.getWardNames();
```

### Get all

```javascript
// Get all the data
const data = kad.getAll();
```

### Get Counties

```javascript
// Get all the counties names
const counties = kad.getCounties();

// Get a specific county by code (1-47)
const mombasa = kad.getCounties({ countyCode: 1 });

// Get a specific county by name
const nairobi = kad.getCounties({ countyName: "Nairobi" });
```

### Get Constituencies

```javascript
// Get all constituencies
const allConstituencies = kad.getConstituencies();

// Get a specific constituency information
const changamwe = kad.getConstituencies({ constituencyName: "Changamwe" });

// Get constituencies belonging to a specific county
const msaConstituencies = kad.getConstituencies({ countyCode: 1 });
const nbiConstituencies = kad.getConstituencies({ countyName: "Nairobi" });
```

### Get wards

```javascript
// Returns all ward names
const wards = kad.getWards();

// Returns wards names of a particular county by passing its county code
const wardsInMombasa = kad.getWards({ countyCode: 1 });
const wardsInMombasa = kad.getWards({ countyName: "Mombasa" });

// Get wards by Constituency
const wardsInLikoni = kad.getWards({ constituencyName: "Likoni" });
```

## API reference

### `.getAll()`

Returns the complete hierarchical data structure of Kenya's administrative divisions.

- **Returns**: `Array<County>`

---

### `.getCounties(options?: { countyCode?: number, countyName?: string })`

Retrieves a list of counties. If no options are provided, it returns all 47 counties.

- **Parameters**:
  - `countyCode`: (1-47) Returns the specific county matching the code.
  - `countyName`: Returns the specific county matching the name.

- **Throws**: `Error` if an invalid `countyCode` is provided (outside 1-47).

---

### `.getConstituencies(options?: { countyCode?: number, countyName?: string })`

Retrieves constituencies, optionally filtered by their parent county.

- **Parameters**:
  - `countyCode`: Returns all constituencies within that county code.
  - `countyName`: Returns all constituencies within that county name.
  - `constituencyName`: Returns all the information about the constituency

- **Throws**: `Error` if the county name or code is not found.

---

### `.getWards(options?: { countyCode?: number, countyName?: string, constituencyName?: string })`

Retrieves wards based on the provided filter depth.

- **Parameters**:
  - `countyCode`: Returns all wards within that county.
  - `countyName`: Returns all wards within that county.
  - `constituencyName`: Returns all wards within that specific constituency.
- **Throws**: `Error` if the provided names or codes do not exist in the database.

---

### Name Helpers

Methods for retrieving flat arrays of strings, ideal for search suggestions or select inputs.

- **`.getCountyNames()`**: Returns `string[]`
- **`.getConstituencyNames()`**: Returns `string[]`
- **`.getWardNames()`**: Returns `string[]`

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
