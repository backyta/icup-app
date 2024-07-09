
export interface FamilyGroupData {
  zoneName: string;
  houseName: string;
  worshipTime: string;
  country: string;
  department: string;
  province: string;
  district: string;
  urbanSector: string;
  address: string;
  referenceAddress?: string | undefined;
  theirPreacher: string;
  status?: string | undefined;
}

export type FamilyGroupDataKeys =
  |'zoneName' 
  |'houseName' 
  |'worshipTime'
  |'country' 
  |'department' 
  |'province' 
  |'district' 
  |'urbanSector'
  |'address' 
  |'referenceAddress'
  |'theirPreacher'
  |'status';