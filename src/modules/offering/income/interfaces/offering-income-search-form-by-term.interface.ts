import { type OfferingIncomeSearchType } from '@/modules/offering/income/enums/offering-income-search-type.enum';
import { type OfferingIncomeSearchSubType } from '@/modules/offering/income/enums/offering-income-search-sub-type.enum';

export interface OfferingIncomeSearchFormByTerm {
  searchType: OfferingIncomeSearchType;
  searchSubType?: OfferingIncomeSearchSubType;
  order: string;
  inputTerm?: string | undefined;
  selectTerm?: string | undefined;
  churchId?: string | undefined;
  dateTerm?:
    | {
        from: Date;
        to?: Date | undefined;
      }
    | undefined;
  firstNamesTerm?: string | undefined;
  lastNamesTerm?: string | undefined;
  limit?: string | undefined;
  all?: boolean | undefined;
}
