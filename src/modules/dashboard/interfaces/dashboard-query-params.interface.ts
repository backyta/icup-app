export interface DashboardQueryParams {
  searchType: string;
  selectTerm?:string;
  dateTerm?: string;
  limit?: string;
  offset?: string;
  order: string;

  //* Validator for get all register
  all?: boolean;
}

