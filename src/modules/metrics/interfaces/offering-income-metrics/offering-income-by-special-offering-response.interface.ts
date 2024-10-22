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
    churchName: string;
  };
  accumulatedOfferingPEN: number;
  accumulatedOfferingUSD: number;
  accumulatedOfferingEUR: number;
}

