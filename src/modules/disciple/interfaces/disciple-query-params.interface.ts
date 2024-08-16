export interface DiscipleQueryParams {
  namesTerm?: string;
  lastNamesTerm?: string; 
  inputTerm?:string;
  dateTerm?: string;
  selectTerm?:string;
  searchType?: string;
  searchSubType?: string;
  limit?: string;
  offset?: string;
  order: string;
  
  //* Validator for get all register
  all?: boolean;
}
