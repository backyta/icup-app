import { type CopastorSearchSubType, type CopastorSearchType } from '@/app/copastor/enums';

export interface CopastorSearchFormByTerm {
  searchType: CopastorSearchType;
  searchSubType?: CopastorSearchSubType | undefined;
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