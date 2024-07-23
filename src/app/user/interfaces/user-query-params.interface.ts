export interface UserQueryParams {
  searchType?: string;
  multiSelectTerm?: string;
  selectTerm?:string;
  namesTerm?: string;
  lastNamesTerm?: string; 
  limit?: string;
  offset?: string;
  order: string;
  
  //* Validator for get all register
  all?: boolean;
}
