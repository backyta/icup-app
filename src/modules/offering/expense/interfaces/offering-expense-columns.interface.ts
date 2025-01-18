import { type UpdatedBy } from '@/shared/interfaces/relations-response.interface';

export interface OfferingExpenseColumns {
  id: string;
  type?: string;
  subType?: string;
  amount?: string;
  currency?: string;
  date?: Date;
  updatedAt?: Date;
  updatedBy?: UpdatedBy;
  recordStatus?: string;
}
