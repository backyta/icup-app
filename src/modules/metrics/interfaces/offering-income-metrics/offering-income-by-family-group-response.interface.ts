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
  supervisor: {
    id: string;
    firstNames: string;
    lastNames: string;
  };
  preacher: {
    id: string;
    firstNames: string;
    lastNames: string;
  };
  church: {
    isAnexe: boolean;
    abbreviatedChurchName: string;
  };
  disciples: number;
  allOfferings: Array<{ offering: number; currency: string; date: string | Date }>;
}

