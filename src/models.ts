export interface County {
  county_code: number;
  county_name: string;
  constituencies: Constituency[];
}

export interface Constituency {
  constituency_name: string;
  wards: Ward[];
}

export interface Ward {
  name: string;
}
