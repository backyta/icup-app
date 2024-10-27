export interface OfferingIncomeByYouthServiceResponse {
  date: Date;
  category: string;
  accumulatedOfferingPEN: number;
  accumulatedOfferingUSD: number;
  accumulatedOfferingEUR: number;
  memberType: string;
  memberId: string;
  memberFullName: string;
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

