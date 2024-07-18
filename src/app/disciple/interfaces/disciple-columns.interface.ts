import { 
  type CreatedBy, 
  type UpdatedBy, 
  type TheirSupervisor,
  type TheirFamilyGroup,
  type TheirChurch,
  type TheirPastor,
  type TheirCopastor,
  type TheirZone,
  type TheirPreacher
} from '@/shared/interfaces';

export interface DiscipleColumns {
  id:               string;
  firstName?:        string;
  lastName?:         string;
  gender?:           string;
  originCountry?:    string;
  birthDate?:        Date;
  maritalStatus?:    string;
  numberChildren?:   number;
  conversionDate?:   Date;
  email?:            string;
  phoneNumber?:      string;
  country?:          string;
  department?:       string;
  province?:         string;
  district?:         string;
  urbanSector?:      string;
  address?:          string;
  referenceAddress?: string;
  roles?:            string[];
  createdAt?:       Date;
  createdBy?:       CreatedBy;
  updatedAt?:       Date;
  updatedBy?:       UpdatedBy;
  recordStatus?:    string;
  theirChurch?:     TheirChurch | null;
  theirPastor?:     TheirPastor | null;
  theirCopastor?:   TheirCopastor | null;
  theirSupervisor?: TheirSupervisor | null; 
  theirPreacher?:   TheirPreacher | null; 
  theirZone?:       TheirZone | null;
  theirFamilyGroup?:TheirFamilyGroup | null; 
}

