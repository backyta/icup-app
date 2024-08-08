export interface OfferingIncomeFormData {
  type: string,
  subType?: string | undefined,
  shift?: string | undefined,
  amount: string,
  date: Date;
  currency: string,
  comments?: string | undefined,
  urlFiles?: string[] | undefined,
  imageUrls?: string[] | undefined,
  memberType?: string | undefined,
  familyGroupId?: string | undefined,
  memberId?: string | undefined,
  zoneId?: string | undefined,
  recordStatus?: string | undefined,
}

export type OfferingIncomeFormDataKeys =
  | 'searchType'
  | 'searchSubType'
  | 'memberType'
  | 'amount'
  | 'shift'
  | 'currency'
  | 'comments'
  | 'urlFiles'
  | 'imageUrls'
  | 'familyGroupId'
  | 'memberId'
  | 'zoneId'
  | 'recordStatus'

