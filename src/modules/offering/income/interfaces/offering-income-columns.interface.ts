import { 
  type UpdatedBy, 
} from '@/shared/interfaces';

export interface OfferingIncomeColumns {
  id:            string;
  type?:         string;
  subType?:      string;
  amount?:       string;
  currency?:     string;
  date?:         Date;
  updatedAt?:    Date;
  updatedBy?:    UpdatedBy;
  recordStatus?: string;
}

