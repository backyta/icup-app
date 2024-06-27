export interface QueryParams {
  inputTerm?:string;
  dateTerm?: string;
  selectTerm?:string;
  searchType?: string;
  limit?: string;
  offset?: string;
  all?: boolean;
  order: string;
}