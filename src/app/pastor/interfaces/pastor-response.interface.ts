import { 
  type Copastor, 
  type Disciple, 
  type FamilyHouse, 
  type Preacher, 
  type Supervisor, 
  type Zone, 
  type CreatedBy,
  type UpdatedBy,
  type TheirChurch,
} from "@/shared/interfaces";

export interface PastorResponse {
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
  copastors?:       Copastor[];
  supervisors?:     Supervisor[];
  zones?:           Zone[];
  preachers?:       Preacher[];
  familyHouses?:    FamilyHouse[];
  disciples?:       Disciple[];
  status:           string;
  theirChurch?:     TheirChurch | null; 
}

