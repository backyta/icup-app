export interface SupervisorQueryParams {
  namesTerm?: string;
  lastNamesTerm?: string; 
  inputTerm?:string;
  dateTerm?: string;
  selectTerm?:string;
  searchType?: string;
  searchSubType?: string;
  limit?: string;
  offset?: string;
  all?: boolean;
  order: string;
}
