export interface OfferingExpenseFormData {
  type: string,
  subType?: string | undefined,
  amount: string,
  date: Date;
  currency: string,
  comments?: string | undefined,
  fileNames?: string[] | undefined,
  imageUrls?: string[] | undefined,
  churchId?: string | undefined,
  recordStatus?: string | undefined,
}

export type OfferingIncomeFormDataKeys =
  | 'type'
  | 'subType'
  | 'amount'
  | 'currency'
  | 'comments'
  | 'fileNames'
  | 'imageUrls'
  | 'churchId'
  | 'recordStatus'