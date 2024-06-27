import { type UserRoles } from '@/app/user/enums';
import { type SearchType } from '@/shared/enums';

export interface FormSearchByTerm {
  searchType: SearchType;
  order: string;
  subType?: string | undefined;
  inputTerm?: string | undefined;
  selectTerm?: string | undefined;
  multiSelectTerm?: UserRoles[] | undefined;
  dateTerm?: {
        from: Date;
        to?: Date | undefined;
    } | undefined;
  namesTerm?: string | undefined;
  lastNamesTerm?: string | undefined;
  limit?: string | undefined;
  limitAll?: boolean | undefined;
}