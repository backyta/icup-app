import { type DiscipleSearchSubType, type DiscipleSearchType } from '@/modules/disciple/enums';

export interface DiscipleSearchFormByTerm {
  searchType: DiscipleSearchType;
  searchSubType?: DiscipleSearchSubType | undefined;
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
  all?: boolean | undefined;
}