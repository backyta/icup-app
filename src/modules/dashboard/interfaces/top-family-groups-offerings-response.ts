export interface TopFamilyGroupsOfferingsResponse {
  date: string | Date;
  accumulatedOfferingPEN: number;
  accumulatedOfferingUSD: number;
  accumulatedOfferingEUR: number;
  familyGroup: {
    id: string;
    familyGroupName: string;
    familyGroupCode: string;
    disciples: number;
  };
  preacher: {
    id: string;
    firstName: string;
    lastName: string;
  };
  allOfferings: Array<{
    offering: number;
    currency: string;
    date: Date;
  }>;
}