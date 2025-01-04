export interface OfferingIncomeBySpecialOfferingResponse {
  date: Date;
  category: string;
  memberType: string;
  memberFullName: string;
  memberId: string | undefined;
  externalDonor: {
    donorId: string | null;
    donorFullName: string | null;
    sendingCountry: string | null;
  };
  allOfferings: Array<{
    donorId: string | null;
    lastDonor: string | null;
    sendingCountry: string | null;
    offering: number;
    currency: string;
    date: string;
  }>;
  church: {
    isAnexe: boolean;
    abbreviatedChurchName: string;
  };
  accumulatedOfferingPEN: number;
  accumulatedOfferingUSD: number;
  accumulatedOfferingEUR: number;
}

