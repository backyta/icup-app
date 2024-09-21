export interface MetricQueryParams {
  searchType: string;
  copastor? : string;
  year?:string;
  district?:string;
  limit?: string;
  offset?: string;
  order?: string;
  allZones?: boolean;

  //* Validator for get all register
  all?: boolean;
}

