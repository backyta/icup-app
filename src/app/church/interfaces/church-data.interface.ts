import { type WorshipTimes } from "../enums/worship-times.enum";

export interface ChurchData {
  nameChurch: string;
  isAnexe?: boolean | undefined;
  worshipTimes: WorshipTimes[];
  foundingDate: Date;
  emailAddress: string,
  phoneNumber: string,
  country: string;
  department: string;
  province: string;
  district: string;
  urbanSector: string;
  address: string;
  addressReference: string;
  status?: string | undefined;
  theirMainChurch?: string | undefined;
}

export type ChurchDataKeys =
  |'nameChurch' 
  |'isAnexe' 
  |'worshipTimes'
  |'foundingDate' 
  |'country' 
  |'department' 
  |'province' 
  |'district' 
  |'urbanSector'
  |'address' 
  |'addressReference'
  |'theirMainChurch'
  |'status';