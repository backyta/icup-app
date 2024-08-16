import { type UserSearchType } from '@/modules/user/enums';
export interface UserSearchFormByTerm {
  searchType: UserSearchType;
  order: string;
  multiSelectTerm?: string | undefined;
  selectTerm?: string | undefined;
  namesTerm?: string | undefined;
  lastNamesTerm?: string | undefined;
  limit?: string | undefined;
  all?: boolean | undefined;
}