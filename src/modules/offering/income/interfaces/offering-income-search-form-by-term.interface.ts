import { type OfferingIncomeSearchSubType, type OfferingIncomeSearchType } from '@/modules/offering/income/enums';

export interface OfferingIncomeSearchFormByTerm {
  searchType: OfferingIncomeSearchType;
  searchSubType?: OfferingIncomeSearchSubType;
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