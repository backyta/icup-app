import { type ChurchWorshipTime } from '@/modules/church/enums';

export interface ChurchFormData {
  churchName: string;
  isAnexe?: boolean | undefined;
  worshipTimes: ChurchWorshipTime[];
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
  recordStatus?: string | undefined;
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
  |'recordStatus'
  |'theirMainChurch';