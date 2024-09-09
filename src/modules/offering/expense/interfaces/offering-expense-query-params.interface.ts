export interface OfferingExpenseQueryParams {
  searchType: string;
  searchSubType?: string;
  dateTerm?: string;
  selectTerm?:string;
  limit?: string;
  offset?: string;
  order: string;

  //* Validator for get all register
  all?: boolean;
}

