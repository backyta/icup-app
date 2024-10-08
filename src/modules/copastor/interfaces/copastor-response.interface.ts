import { 
  type Zone, 
  type Disciple, 
  type Preacher, 
  type CreatedBy,
  type UpdatedBy,
  type Supervisor, 
  type FamilyGroup, 
  type TheirChurch,
  type TheirPastor,
} from '@/shared/interfaces';

export interface CopastorResponse {
  id:               string;
  firstName:        string;
  lastName:         string;
  gender:           string;
  originCountry:    string;
  age:              number;
  birthDate:        Date;
  maritalStatus:    string;
  numberChildren:   number;
  conversionDate:   Date;
  email:            string;
  phoneNumber:      string;
  country:          string;
  department:       string;
  province:         string;
  district:         string;
  urbanSector:      string;
  address:          string;
  referenceAddress: string;
  roles:            string[];
  createdAt?:       Date;
  createdBy?:       CreatedBy;
  updatedAt?:       Date;
  updatedBy?:       UpdatedBy;
  supervisors?:     Supervisor[];
  zones?:           Zone[];
  preachers?:       Preacher[];
  familyGroups?:    FamilyGroup[];
  disciples?:       Disciple[];
  recordStatus:     string;
  theirPastor?:     TheirPastor | null;
  theirChurch?:     TheirChurch | null;
}


