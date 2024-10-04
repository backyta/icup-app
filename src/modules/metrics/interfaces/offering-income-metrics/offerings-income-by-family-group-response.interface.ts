import { type CurrencyType } from "@/modules/offering/shared/enums";
import { type FamilyGroup } from "@/shared/interfaces";

export interface OfferingsIncomeByFamilyGroupResponse {
  id: string;
  amount: number;
  currency: CurrencyType;
  date: string | Date;
  familyGroup: FamilyGroup;
  familyGroupCode: string;
}

