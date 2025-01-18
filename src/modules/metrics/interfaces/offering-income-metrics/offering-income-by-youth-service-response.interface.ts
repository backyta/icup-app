export interface OfferingIncomeByYouthServiceResponse {
  date: Date;
  category: string;
  accumulatedOfferingPEN: number;
  accumulatedOfferingUSD: number;
  accumulatedOfferingEUR: number;
  internalDonor: {
    memberType: string;
    memberId: string;
    memberFullName: string;
  };
  externalDonor: {
    donorId: string;
    donorFullName: string;
    sendingCountry: string;
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
