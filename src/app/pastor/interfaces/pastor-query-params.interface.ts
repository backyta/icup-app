export interface PastorQueryParams {
  namesTerm?: string;
  lastNamesTerm?: string; 
  inputTerm?:string;
  dateTerm?: string;
  selectTerm?:string;
  searchType?: string;
  limit?: string;
  offset?: string;
  order: string;

  //* Validator for get all register (replicar)
  all?: boolean;
}