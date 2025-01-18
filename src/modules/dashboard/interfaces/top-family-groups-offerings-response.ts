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
    firstNames: string;
    lastNames: string;
  };
  church: {
    isAnexe: boolean;
    abbreviatedChurchName: string;
  };
  allOfferings: Array<{
    offering: number;
    currency: string;
    date: Date;
  }>;
}
