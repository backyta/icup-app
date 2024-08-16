export interface OfferingColumns {
  id: string;
  type: string;
  subType?: string;
  amount: string;
  currency: string;
  date: Date;
  updated_by?: string;
}
