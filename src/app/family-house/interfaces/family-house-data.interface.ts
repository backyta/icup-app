
export interface FamilyHouseData {
  zoneName: string;
  houseName: string;
  country: string;
  department: string;
  province: string;
  district: string;
  address: string;
  theirPreacher: string;
  status?: string | undefined;
}

export type FamilyHouseDataKeys =
  |'zoneName' 
  |'houseName' 
  |'country' 
  |'department' 
  |'province' 
  |'district' 
  |'address' 
  |'theirPreacher'
  |'status';