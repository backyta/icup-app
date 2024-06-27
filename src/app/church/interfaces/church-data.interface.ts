import { type WorshipTimes } from "../enums/worship-times.enum";

export interface ChurchData {
  churchName: string;
  isAnexe?: boolean | undefined;
  worshipTimes: WorshipTimes[];
  foundingDate: Date;
  email: string,
  phoneNumber: string,
  country: string;
  department: string;
  province: string;
  district: string;
  urbanSector: string;
  address: string;
  referenceAddress: string;
  status?: string | undefined;
  theirMainChurch?: string | undefined;
}

export type ChurchDataKeys =
  |'churchName' 
  |'isAnexe' 
  |'worshipTimes'
  |'foundingDate' 
  |'email' 
  |'country' 
  |'department' 
  |'province' 
  |'district' 
  |'urbanSector'
  |'address' 
  |'referenceAddress'
  |'theirMainChurch'
  |'status';