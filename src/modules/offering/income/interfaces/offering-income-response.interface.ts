import { 
  type CreatedBy,
  type UpdatedBy,
  type Zone,
  type Disciple,
  type Preacher,
  type Supervisor,
  type Copastor,
  type Pastor,
  type FamilyGroup,
  type Anexe
} from '@/shared/interfaces';

export interface OfferingIncomeResponse {
  id:                 string;
  type:               string;
  subType:            string;
  amount:             string;
  currency:           string;
  comments:           string;
  shift:              string;
  date:               Date;
  imageUrls:          string[];
  createdAt?:         Date;
  createdBy?:         CreatedBy;
  updatedAt?:         Date;
  updatedBy?:         UpdatedBy;
  recordStatus:       string;
  memberType?:        string;
  familyGroup?:       FamilyGroup | null; 
  church?:            Anexe | null; 
  zone?:              Zone | null; 
  disciple?:          Disciple | null; 
  preacher?:          Preacher | null; 
  supervisor?:        Supervisor | null; 
  copastor?:          Copastor | null; 
  pastor?:            Pastor | null; 
}
