import { type ZoneSearchType } from '@/app/zone/enums';

export interface ChurchSearchFormByTerm {
  searchType: ZoneSearchType;
  order: string;
  inputTerm?: string | undefined;
  selectTerm?: string | undefined;
  limit?: string | undefined;
  all?: boolean | undefined;
}