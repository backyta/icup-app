import { 
  type UpdatedBy, 
} from '@/shared/interfaces';

export interface ZoneColumns {
  id:                string;
  zoneName?:         string;
  department?:       string;
  province?:         string;
  district?:         string;
  updatedAt?:        Date;
  updatedBy?:        UpdatedBy;
  recordStatus?:     string;
}

