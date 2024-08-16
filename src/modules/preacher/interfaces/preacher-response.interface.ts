import { 
  type TheirSupervisor, 
  type Disciple, 
  type CreatedBy,
  type UpdatedBy,
  type TheirChurch,
  type TheirPastor,
  type TheirCopastor,
  type TheirFamilyGroup,
  type TheirZone,
} from '@/shared/interfaces';

export interface PreacherResponse {
  id:                string;
  firstName:         string;
  lastName:          string;
  gender:            string;
  originCountry:     string;
  age:               number;
  birthDate:         Date;
  maritalStatus:     string;
  numberChildren:    number;
  conversionDate:    Date;
  email:             string;
  phoneNumber:       string;
  country:           string;
  department:        string;
  province:          string;
  district:          string;
  urbanSector:       string;
  address:           string;
  referenceAddress:  string;
  roles:             string[];
  createdAt?:        Date;
  createdBy?:        CreatedBy;
  updatedAt?:        Date;
  updatedBy?:        UpdatedBy;
  disciples?:        Disciple[];
  recordStatus?:     string;
  theirChurch?:      TheirChurch | null;
  theirPastor?:      TheirPastor | null;
  theirCopastor?:    TheirCopastor | null;
  theirSupervisor?:  TheirSupervisor | null;
  theirFamilyGroup?: TheirFamilyGroup | null;
  theirZone?:        TheirZone | null;
}

