import { 
  type CreatedBy,
  type UpdatedBy,
  type TheirFamilyGroup,
  type TheirZone,
  type TheirDisciple
} from '@/shared/interfaces';

export interface OfferingIncomeResponse {
  id:                 string;
  type:               string;
  subType:            boolean;
  amount:             string[];
  currency:           Date;
  date:               string;
  comments:           string;
  urlFiles:           string[];
  createdAt?:         Date;
  createdBy?:         CreatedBy;
  updatedAt?:         Date;
  updatedBy?:         UpdatedBy;
  recordStatus:       string;
  theirFamilyGroup?:  TheirFamilyGroup | null; 
  theirZone?:         TheirZone | null; 
  theirDisciple?:     TheirDisciple | null; 
}
