export interface GeneralComparativeOfferingIncomeResponse {
  type: string;
  subType: string | null;
  accumulatedOfferingPEN: number;
  accumulatedOfferingUSD: number;
  accumulatedOfferingEUR: number;
  church: {
    isAnexe: boolean;
    abbreviatedChurchName: string;
  };
  totalAmount: number;
}
