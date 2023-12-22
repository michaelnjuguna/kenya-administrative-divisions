interface WardInfo{
    county_name: string;
    county_code: number;
    constituency_name: string;
    ward_name: string;
}
interface ConstituencyInfo{
    county_name: string;
    county_code: number;
    constituency_name: string;
    wards?: string[];
}
interface CountyInfo{
    county_name: string;
    county_code: number;
    constituencies?: ConstituencyInfo[];
}

export declare function getAll(): Promise<CountyInfo[]>;
export declare function getCounties(input?: number | string): Promise<CountyInfo[]>;
export declare function getConstituencies(input?: number | string): Promise<ConstituencyInfo[]>;
export declare function getWards(input?: number | string): Promise<WardInfo[] | string>;

