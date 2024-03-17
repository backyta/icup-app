

export interface ZoneData {
  zoneName: string;
  country: string;
  department: string;
  province: string;
  district: string;
  theirSupervisor: string;
}

export type DataZoneKeys =
  |'zoneName' 
  |'country' 
  |'department' 
  |'province' 
  |'district' 
  |'theirSupervisor';