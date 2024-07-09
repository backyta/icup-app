import { type WorshipTimes } from '@/app/church/enums';
export interface ChurchFormData {
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

export type ChurchFormDataKeys =
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
  |'status'
  |'theirMainChurch';