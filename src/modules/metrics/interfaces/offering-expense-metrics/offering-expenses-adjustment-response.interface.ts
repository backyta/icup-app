export interface OfferingExpensesAdjustmentResponse {
  date: Date;
  accumulatedOfferingPEN: number;
  accumulatedOfferingUSD: number;
  accumulatedOfferingEUR: number;
  church:{
    isAnexe: boolean;
    abbreviatedChurchName: string;
  }
  allOfferings: Array<{
    offering: number;
    currency: string;
    date: Date;
  }>;
}

