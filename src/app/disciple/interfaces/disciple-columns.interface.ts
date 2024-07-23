import { 
  type UpdatedBy, 
} from '@/shared/interfaces';

export interface DiscipleColumns {
  id:             string;
  firstName?:     string;
  lastName?:      string;
  gender?:        string;
  originCountry?: string;
  birthDate?:     Date;
  email?:         string;
  phoneNumber?:   string;
  district?:      string;
  urbanSector?:   string;
  updatedAt?:     Date;
  updatedBy?:     UpdatedBy;
  recordStatus?:  string;
}

