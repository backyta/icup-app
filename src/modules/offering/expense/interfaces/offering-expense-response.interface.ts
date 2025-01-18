import {
  type Anexe,
  type CreatedBy,
  type UpdatedBy,
} from '@/shared/interfaces/relations-response.interface';

export interface OfferingExpenseResponse {
  id: string;
  type: string;
  subType: string;
  amount: string;
  currency: string;
  comments: string;
  date: Date;
  imageUrls: string[];
  createdAt?: Date;
  createdBy?: CreatedBy;
  updatedAt?: Date;
  updatedBy?: UpdatedBy;
  recordStatus: string;
  church?: Anexe | null;
}
