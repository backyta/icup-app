export interface ChurchQueryParams {
  searchType: string;
  inputTerm?:string;
  dateTerm?: string;
  selectTerm?:string;
  limit?: string;
  offset?: string;
  all?: boolean;
  order: string;
}

