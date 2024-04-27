import { type CurrencyType } from "@/app/offering/shared/enums";

export interface OfferingExpensesData {
  type: string,
  subType?: string | undefined,
  amount: string,
  date: Date;
  currency: string | CurrencyType,
  comments?: string | undefined,
  urlFile?: string[] | undefined,
  status?: string | undefined,
}

export type OfferingExpensesDataKeys =
  | 'type'
  | 'subType'
  | 'amount'
  | 'currency'
  | 'comments'
  | 'urlFile'
  | 'status'

