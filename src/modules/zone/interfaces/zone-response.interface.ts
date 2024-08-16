
import { 
  type CreatedBy,
  type UpdatedBy,
  type TheirChurch,
  type TheirPastor,
  type TheirCopastor,
  type TheirSupervisor,
  type Disciple,
  type Preacher,
  type FamilyGroup,
} from '@/shared/interfaces';

export interface ZoneResponse {
  id:               string;
  zoneName:         string;
  country:          string;
  department:       string;
  province:         string;
  district:         string;
  recordStatus:     string;
  disciples?:        Disciple[];
  preachers?:        Preacher[];
  familyGroups?:     FamilyGroup[];
  createdAt?:       Date;
  createdBy?:       CreatedBy;
  updatedAt?:       Date;
  updatedBy?:       UpdatedBy;
  theirChurch?:     TheirChurch | null;
  theirPastor?:     TheirPastor | null;
  theirCopastor?:   TheirCopastor | null;
  theirSupervisor?: TheirSupervisor | null; 
}


