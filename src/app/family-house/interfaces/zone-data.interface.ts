
export interface ZoneData {
  zoneName: string;
  country: string;
  department: string;
  province: string;
  district: string;
  theirSupervisor: string;
}

export type ZoneDataKeys =
  |'zoneName' 
  |'country' 
  |'department' 
  |'province' 
  |'district' 
  |'theirSupervisor';

  
export interface ZoneDataSearch {
  zoneName: string;
}

export type ZoneDataSearchKeys =
  |'zoneName';

