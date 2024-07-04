import { 
  type MainChurch, 
  type CreatedBy, 
  type UpdatedBy, 
  type Anexe, 
  type Pastor, type Copastor,
  type Supervisor,
  type Zone,
  type Preacher,
  type FamilyHouse,
  type Disciple 
} from '@/shared/interfaces';

export interface ChurchColumns {
  id:               string;
  churchName:       string;
  isAnexe:          boolean;
  worshipTimes:     string[];
  foundingDate:     Date;
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
  anexes?:          Anexe[]; 
  pastors?:         Pastor[];
  copastors?:       Copastor[];
  supervisors?:     Supervisor[];
  zones?:           Zone[];
  preachers?:       Preacher[];
  familyHouses?:    FamilyHouse[];
  disciples?:       Disciple[];
  status:           string;
  theirMainChurch?: MainChurch | null;
}

