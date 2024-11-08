import { 
  type Zone,
  type Member,
  type Copastor, 
  type Preacher, 
  type Disciple, 
  type CreatedBy,
  type UpdatedBy,
  type Supervisor, 
  type FamilyGroup, 
  type TheirChurch,
} from '@/shared/interfaces';

export interface PastorResponse {
  id:               string;
  member:           Member,
  createdAt?:       Date;
  createdBy?:       CreatedBy;
  updatedAt?:       Date;
  updatedBy?:       UpdatedBy;
  copastors?:       Copastor[];
  supervisors?:     Supervisor[];
  zones?:           Zone[];
  preachers?:       Preacher[];
  familyGroups?:    FamilyGroup[];
  disciples?:       Disciple[];
  recordStatus:     string;
  theirChurch?:     TheirChurch | null; 
}

