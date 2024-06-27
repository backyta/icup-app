import { type MainChurch, type CreatedBy, type UpdatedBy } from "@/shared/interfaces";

export interface ChurchColumns {
  id:               string;
  churchName:       string;
  isAnexe:          boolean;
  worshipTimes:     string[];
  foundingDate:     string;
  email:            string;
  phoneNumber:      string;
  country:          string;
  department:       string;
  province:         string;
  district:         string;
  urbanSector:      string;
  address:          string;
  referenceAddress: string;
  createdAt?:       Date;
  createdBy?:       CreatedBy;
  updatedAt?:       Date;
  updatedBy?:       UpdatedBy;
  anexes?:          any[]; 
  pastors?:         any[];
  copastors?:       any[];
  supervisors?:     any[];
  zones?:           any[];
  preachers?:       any[];
  familyHouses?:    any[];
  disciples?:       any[];
  status:           string;
  theirMainChurch?: MainChurch | null;
}

