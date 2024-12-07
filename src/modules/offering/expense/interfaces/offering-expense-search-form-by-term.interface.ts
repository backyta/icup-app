import { type OfferingExpenseSearchSubType, type OfferingExpenseSearchType } from '@/modules/offering/expense/enums';

export interface OfferingExpenseSearchFormByTerm {
  searchType: OfferingExpenseSearchType;
  searchSubType?: "" | OfferingExpenseSearchSubType;
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