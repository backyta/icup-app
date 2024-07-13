export interface PreacherQueryParams {
  searchType?: string;
  searchSubType?: string;
  namesTerm?: string;
  lastNamesTerm?: string; 
  inputTerm?:string;
  dateTerm?: string;
  selectTerm?:string;
  limit?: string;
  offset?: string;
  order: string;

  //* Validator for get all register
  all?: boolean;
}

