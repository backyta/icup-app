
import { type SearchSubTypeSupervisor, type SearchTypeSupervisor } from '@/app/supervisor/enums';

export interface SupervisorFormSearchByTerm {
  searchType?: SearchTypeSupervisor;
  searchSubType?: SearchSubTypeSupervisor | undefined;
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