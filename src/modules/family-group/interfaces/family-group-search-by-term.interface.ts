import { type FamilyGroupSearchType, type FamilyGroupSearchSubType } from '@/modules/family-group/enums';

export interface FamilyGroupSearchFormByTerm {
  searchType: FamilyGroupSearchType;
  searchSubType?: FamilyGroupSearchSubType | undefined;
  order: string;
  inputTerm?: string | undefined;
  selectTerm?: string | undefined;
  churchId?: string | undefined;
  namesTerm?: string | undefined;
  lastNamesTerm?: string | undefined;
  limit?: string | undefined;
  all?: boolean | undefined;
}