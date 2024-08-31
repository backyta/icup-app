export interface OfferingIncomeFormData {
  type: string,
  subType?: string | undefined,
  shift?: string | undefined,
  amount: string,
  date: Date;
  currency: string,
  comments?: string | undefined,
  fileNames?: string[] | undefined,
  imageUrls?: string[] | undefined,
  memberType?: string | undefined,
  churchId?: string | undefined,
  familyGroupId?: string | undefined,
  memberId?: string | undefined,
  zoneId?: string | undefined,
  recordStatus?: string | undefined,
}

export type OfferingIncomeFormDataKeys =
  | 'type'
  | 'subType'
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

