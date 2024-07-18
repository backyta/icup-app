
import { 
  type CreatedBy,
  type UpdatedBy,
  type TheirChurch,
  type TheirPastor,
  type TheirCopastor,
  type TheirSupervisor,
  type TheirPreacher,
  type TheirZone,
  type Disciple,
} from '@/shared/interfaces';

export interface FamilyGroupResponse {
  id:                string;
  familyGroupName:   string;
  zoneName:          string;
  familyGroupNumber: number;
  familyGroupCode:   string;
  worshipTime:       string;
  country:           string;
  department:        string;
  province:          string;
  district:          string;
  urbanSector:       string;
  address:           string;
  referenceAddress:  string;
  status:            string;
  disciples:         Disciple[];
  createdAt?:       Date;
  createdBy?:       CreatedBy;
  updatedAt?:       Date;
  updatedBy?:       UpdatedBy;
  theirChurch?:     TheirChurch | null;
  theirPastor?:     TheirPastor | null;
  theirCopastor?:   TheirCopastor | null;
  theirSupervisor?: TheirSupervisor | null; 
  TheirPreacher?:   TheirPreacher | null; 
  theirZone?:       TheirZone | null;
}


