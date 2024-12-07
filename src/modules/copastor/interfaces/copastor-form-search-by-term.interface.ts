import { type CopastorSearchSubType, type CopastorSearchType } from '@/modules/copastor/enums';

export interface CopastorSearchFormByTerm {
  searchType: CopastorSearchType;
  searchSubType?: CopastorSearchSubType | undefined;
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