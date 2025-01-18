export interface ComparativeOfferingExpensesBySubTypeResponse {
  subType: string;
  accumulatedOfferingPEN: number;
  accumulatedOfferingUSD: number;
  accumulatedOfferingEUR: number;
  church: {
    isAnexe: boolean;
    abbreviatedChurchName: string;
  };
  totalAmount: number;
}
