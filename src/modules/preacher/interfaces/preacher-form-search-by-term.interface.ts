import { type PreacherSearchSubType, type PreacherSearchType } from '@/modules/preacher/enums';

export interface PreacherSearchFormByTerm {
  searchType: PreacherSearchType;
  searchSubType?: PreacherSearchSubType;
  inputTerm?: string | undefined;
  selectTerm?: string | undefined;
  dateTerm?: {
    from: Date;
    to?: Date | undefined;
  } | undefined;
  namesTerm?: string | undefined;
  lastNamesTerm?: string | undefined;
  order: string;
  limit?: string | undefined;
  all?: boolean | undefined;
}