import { 
  type Copastor, 
  type Disciple, 
  type FamilyGroup, 
  type Pastor, 
  type Preacher, 
  type Supervisor, 
  type Zone, 
  type Anexe, 
  type CreatedBy,
  type UpdatedBy,
  type MainChurch
} from '@/shared/interfaces';

export interface ChurchResponse {
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
  familyGroups?:    FamilyGroup[];
  disciples?:       Disciple[];
  status:           string;
  theirMainChurch?: MainChurch | null; 
}







