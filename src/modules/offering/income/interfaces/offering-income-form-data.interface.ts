export interface OfferingIncomeFormData {
  churchId: string,
  type: string,
  subType?: string | undefined,
  category?: string | undefined,
  shift?: string | undefined,
  amount: string,
  date: Date;
  currency: string,
  comments?: string | undefined,
  fileNames?: string[] | undefined,
  imageUrls?: string[] | undefined,
  memberType?: string | undefined,
  familyGroupId?: string | undefined,
  memberId?: string | undefined,
  zoneId?: string | undefined,
  recordStatus?: string | undefined,
}

export type OfferingIncomeFormDataKeys =
  | 'type'
  | 'subType'
  | 'category'
  | 'memberType'
  | 'amount'
  | 'shift'
  | 'currency'
  | 'comments'
  | 'fileNames'
  | 'imageUrls'
  | 'familyGroupId'
  | 'memberId'
  | 'zoneId'
  | 'churchId'
  | 'recordStatus'

