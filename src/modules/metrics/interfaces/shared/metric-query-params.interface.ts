export interface MetricQueryParams {
  searchType: string;
  church: string;
  copastor? : string;
  zone?: string;
  year?:string;
  month?:string;
  district?:string;
  limit?: string;
  offset?: string;
  order?: string;
  allZones?: boolean;
  allFamilyGroups?: boolean;

  //* Validator for get all register
  all?: boolean;
}

