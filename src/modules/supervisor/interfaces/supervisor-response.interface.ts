import { 
  type Preacher, 
  type Disciple, 
  type CreatedBy,
  type UpdatedBy,
  type TheirZone,
  type TheirChurch,
  type TheirPastor,
  type FamilyGroup, 
  type TheirCopastor,
} from '@/shared/interfaces';

export interface SupervisorResponse {
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
  isDirectRelationToPastor:  boolean;
  createdAt?:       Date;
  createdBy?:       CreatedBy;
  updatedAt?:       Date;
  updatedBy?:       UpdatedBy;
  preachers?:       Preacher[];
  familyGroups?:    FamilyGroup[];
  disciples?:       Disciple[];
  recordStatus?:    string;
  theirCopastor?:   TheirCopastor | null;
  theirPastor?:     TheirPastor | null;
  theirChurch?:     TheirChurch | null;
  theirZone?:       TheirZone | null;
}

