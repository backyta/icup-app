import { type CreatedBy, type UpdatedBy } from '@/shared/interfaces';

export interface UserResponse {
  id:           string;
  firstName:    string;
  lastName:     string;
  gender:       string;
  email:        string;
  roles:        string[];
  createdAt?:   Date;
  createdBy?:   CreatedBy;
  updatedAt?:   Date;
  updatedBy?:   UpdatedBy;
  recordStatus: string;
}


