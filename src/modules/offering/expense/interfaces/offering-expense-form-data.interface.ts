export interface OfferingExpenseFormData {
  churchId    : string,
  type         : string,
  subType     ?: string | undefined,
  amount       : string,
  date         : Date;
  currency     : string,
  comments     : string,
  fileNames   ?: string[] | undefined,
  imageUrls   ?: string[] | undefined,
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