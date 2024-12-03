import { 
  type Member,
  type Preacher, 
  type Disciple, 
  type CreatedBy,
  type UpdatedBy,
  type TheirZone,
  type TheirChurch,
  type TheirPastor,
  type FamilyGroup, 
  type TheirCopastor,
} from '@/shared/interfaces';

export interface SupervisorResponse {
  id:               string;
  member:           Member;
  isDirectRelationToPastor:  boolean;
  createdAt?:       Date;
  createdBy?:       CreatedBy;
  updatedAt?:       Date;
  updatedBy?:       UpdatedBy;
  inactivationCategory?: string;
  inactivationReason  ?: string;
  preachers?:       Preacher[];
  familyGroups?:    FamilyGroup[];
  disciples?:       Disciple[];
  recordStatus?:    string;
  theirCopastor?:   TheirCopastor | null;
  theirPastor?:     TheirPastor | null;
  theirChurch?:     TheirChurch | null;
  theirZone?:       TheirZone | null;
}

