export interface WardInfo {
	county_name: string;
	county_code: number;
	constituency_name: string;
	ward_name: string;
}

export interface ConstituencyInfo {
	county_name: string;
	county_code: number;
	constituency_name: string;
	wards?: string[];
}

export interface CountyInfo {
	county_name: string;
	county_code: number;
	constituencies?: ConstituencyInfo[];
}
