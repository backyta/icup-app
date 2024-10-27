export interface OfferingIncomeByFamilyGroupResponse {
  date: Date;
  category: string;
  accumulatedOfferingPEN: number;
  accumulatedOfferingUSD: number;
  accumulatedOfferingEUR: number;
  familyGroup: {
    id: string;
    familyGroupName: string;
    familyGroupCode: string;
  };
  preacher: {
    id: string;
    firstName: string;
    lastName: string;
  };
  church: {
    isAnexe: boolean;
    abbreviatedChurchName: string;
  };
  disciples: number;
  allOfferings: Array<{ offering: number; currency: string; date: string | Date }>;
}

