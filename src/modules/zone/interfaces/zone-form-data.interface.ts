export interface ZoneFormData {
  zoneName: string;
  country: string;
  department: string;
  province: string;
  district: string;
  recordStatus?: string | undefined;
  theirSupervisor?: string | undefined;
}

export type ZoneFormDataKeys =
  |'zoneName'  
  |'country' 
  |'department' 
  |'province' 
  |'district' 
  |'recordStatus'
  |'theirSupervisor';