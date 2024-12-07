import { type PastorSearchType } from '@/modules/pastor/enums';

export interface PastorSearchFormByTerm {
  searchType: PastorSearchType;
  order: string;
  inputTerm?: string | undefined;
  selectTerm?: string | undefined;
  churchId?: string | undefined;
  dateTerm?: {
        from: Date;
        to?: Date | undefined;
    } | undefined;
  namesTerm?: string | undefined;
  lastNamesTerm?: string | undefined;
  limit?: string | undefined;
  all?: boolean | undefined;
}