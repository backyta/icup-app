
import { 
  type CreatedBy,
  type UpdatedBy,
  type TheirChurch,
  type TheirPastor,
  type TheirCopastor,
  type TheirSupervisor,
  type TheirPreacher,
  type TheirZone,
  type TheirFamilyGroup,
} from '@/shared/interfaces';

export interface DiscipleResponse {
  id:                 string;
  firstName:          string;
  lastName:           string;
  gender:             string;
  originCountry:      string;
  age:                number;
  birthDate:          Date;
  maritalStatus:      string;
  numberChildren:     number;
  conversionDate:     Date;
  email:              string;
  phoneNumber:        string;
  country:            string;
  department:         string;
  province:           string;
  district:           string;
  urbanSector:        string;
  address:            string;
  referenceAddress:   string;
  roles:              string[];
  createdAt?:         Date;
  createdBy?:         CreatedBy;
  updatedAt?:         Date;
  updatedBy?:         UpdatedBy;
  recordStatus:       string;
  theirChurch?:       TheirChurch | null;
  theirPastor?:       TheirPastor | null;
  theirCopastor?:     TheirCopastor | null;
  theirSupervisor?:   TheirSupervisor | null; 
  TheirPreacher?:     TheirPreacher | null; 
  theirZone?:         TheirZone | null;
  theirFamilyGroup?:  TheirFamilyGroup | null; 
}


