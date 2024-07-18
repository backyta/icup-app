import { 
  type CreatedBy, 
  type UpdatedBy, 
  type Copastor,
  type Supervisor,
  type Zone,
  type Preacher,
  type FamilyGroup,
  type Disciple, 
  type TheirPastor,
  type TheirChurch,
  type TheirZone
} from '@/shared/interfaces';

export interface SupervisorColumns {
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
  isDirectRelationToPastor:  boolean;
  createdAt?:       Date;
  createdBy?:       CreatedBy;
  updatedAt?:       Date;
  updatedBy?:       UpdatedBy;
  copastors?:       Copastor[];
  supervisors?:     Supervisor[];
  zones?:           Zone[];
  preachers?:       Preacher[];
  familyHouses?:    FamilyGroup[];
  disciples?:       Disciple[];
  recordStatus?:          string;
  theirChurch?:     TheirChurch | null;
  theirPastor?:     TheirPastor | null;
  theirCopastor?:   TheirPastor | null;
  theirZone?:       TheirZone | null;
}






