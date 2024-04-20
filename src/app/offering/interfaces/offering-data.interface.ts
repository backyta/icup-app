import { type CurrencyType } from "@/app/offering/enums";

export interface OfferingData {
  type: string,
  subType?: string | undefined,
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

export type OfferingDataKeys =
  | 'type'
  | 'subType'
  | 'amount'
  | 'currency'
  | 'comments'
  | 'urlFile'
  | 'familyHouseID'
  | 'memberID'
  | 'zoneID'
  | 'status'

