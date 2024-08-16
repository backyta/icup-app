import { type ZoneSearchType } from '@/modules/zone/enums';

export interface ZoneSearchFormByTerm {
  searchType: ZoneSearchType;
  order: string;
  inputTerm?: string | undefined;
  selectTerm?: string | undefined;
  limit?: string | undefined;
  all?: boolean | undefined;
}