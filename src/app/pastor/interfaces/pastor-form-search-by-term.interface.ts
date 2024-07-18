import { type PastorSearchType } from '@/app/pastor/enums';

export interface PastorFormSearchByTerm {
  searchType: PastorSearchType;
  order: string;
  inputTerm?: string | undefined;
  selectTerm?: string | undefined;
  dateTerm?: {
        from: Date;
        to?: Date | undefined;
    } | undefined;
  namesTerm?: string | undefined;
  lastNamesTerm?: string | undefined;
  limit?: string | undefined;
  limitAll?: boolean | undefined;
}