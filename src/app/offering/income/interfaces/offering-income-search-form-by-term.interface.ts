import { type OfferingIncomeCreateType } from '@/app/offering/income/enums';

export interface OfferingIncomeSearchFormByTerm {
  searchType: OfferingIncomeCreateType;
  order: string;
  inputTerm?: string | undefined;
  selectTerm?: string | undefined;
  dateTerm?: {
        from: Date;
        to?: Date | undefined;
    } | undefined;
  limit?: string | undefined;
 all?: boolean | undefined;
}