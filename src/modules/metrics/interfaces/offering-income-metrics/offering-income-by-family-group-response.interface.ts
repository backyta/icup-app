export interface OfferingIncomeByFamilyGroupResponse {
  date: Date;
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
  disciples: number;
  allOfferings: Array<{ offering: number; currency: string; date: string | Date }>;
}

