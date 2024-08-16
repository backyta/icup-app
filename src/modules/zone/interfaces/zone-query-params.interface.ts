export interface ZoneQueryParams {
  searchType: string;
  inputTerm?:string;
  selectTerm?:string;
  limit?: string;
  offset?: string;
  order: string;

  //* Validator for get all register
  all?: boolean;
}

