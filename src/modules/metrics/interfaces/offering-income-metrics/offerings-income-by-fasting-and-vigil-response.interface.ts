import { type CurrencyType } from "@/modules/offering/shared/enums";
import { type OfferingIncomeCreationSubType } from "@/modules/offering/income/enums";

export interface OfferingsIncomeByFastingAndVigilResponse {
  id: string;
  type: OfferingIncomeCreationSubType,
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
}

