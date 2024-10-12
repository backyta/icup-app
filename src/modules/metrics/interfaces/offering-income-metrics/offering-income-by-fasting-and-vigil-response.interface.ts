import { type CurrencyType } from "@/modules/offering/shared/enums";
import { type OfferingIncomeCreationSubType } from "@/modules/offering/income/enums";

export interface OfferingIncomeByFastingAndVigilResponse {
  type: OfferingIncomeCreationSubType,
  accumulatedOfferingPEN: number;
  accumulatedOfferingUSD: number;
  accumulatedOfferingEUR: number;
  amount: number;
  currency: CurrencyType;
  date: string | Date;
  supervisor: {
    id: string,
    firstName: string,
    lastName: string,
  } | null ;
  zone: {
    id: string,
      zoneName: string,
      district: string,
      disciples: number,
  } | null ;
  church: {
    id: string;
    churchName: string;
  } | null;
  allOfferings: Array<{
    offering: number;
    currency: string;
    date: Date;
  }>;
}

