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
  type Member,
} from '@/shared/interfaces';

export interface CopastorResponse {
  id:               string;
  member:           Member;
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


