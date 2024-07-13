
import { type SearchSubTypePreacher, type SearchTypePreacher } from '@/app/preacher/enums';

export interface PreacherFormSearchByTerm {
  searchType: SearchTypePreacher;
  searchSubType?: SearchSubTypePreacher;
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
  limitAll?: boolean | undefined;
}