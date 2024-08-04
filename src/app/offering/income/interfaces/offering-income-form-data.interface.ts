import { type CurrencyType } from '@/app/offering/shared/enums';

export interface OfferingIncomeFormData {
  searchType: string,
  searchSubType?: string | undefined,
  amount: string,
  date: Date;
  currency: string | CurrencyType,
  comments?: string | undefined,
  urlFile?: string[] | undefined,
  familyHouseID?: string | undefined,
  memberID?: string | undefined,
  zoneID?: string | undefined,
  status?: string | undefined,
}

export type OfferingIncomeFormDataKeys =
  | 'searchType'
  | 'searchSubType'
  | 'amount'
  | 'currency'
  | 'comments'
  | 'urlFile'
  | 'familyHouseID'
  | 'memberID'
  | 'zoneID'
  | 'status'

