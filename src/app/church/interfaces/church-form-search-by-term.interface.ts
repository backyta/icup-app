import { type ChurchSearchType } from '@/app/church/enums';

export interface ChurchFormSearchByTerm {
  searchType: ChurchSearchType;
  order: string;
  inputTerm?: string | undefined;
  selectTerm?: string | undefined;
  dateTerm?: {
        from: Date;
        to?: Date | undefined;
    } | undefined;
  limit?: string | undefined;
  limitAll?: boolean | undefined;
}