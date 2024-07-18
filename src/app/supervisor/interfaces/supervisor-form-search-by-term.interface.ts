
import { type SupervisorSearchSubType, type SupervisorSearchType } from '@/app/supervisor/enums';

export interface SupervisorFormSearchByTerm {
  searchType?: SupervisorSearchType;
  searchSubType?: SupervisorSearchSubType | undefined;
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