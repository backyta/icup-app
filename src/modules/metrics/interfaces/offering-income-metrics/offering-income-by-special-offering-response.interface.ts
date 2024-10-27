export interface OfferingIncomeBySpecialOfferingResponse {
  date: Date;
  category: string;
  memberType: string;
  memberId: string;
  memberFullName: string;
  allOfferings: Array<{
    offering: number;
    currency: string;
    date: Date;
  }>;
  church: {
    isAnexe: boolean;
    abbreviatedChurchName: string;
  };
  accumulatedOfferingPEN: number;
  accumulatedOfferingUSD: number;
  accumulatedOfferingEUR: number;
}

