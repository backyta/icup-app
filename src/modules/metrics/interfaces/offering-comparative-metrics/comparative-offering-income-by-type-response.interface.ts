export interface ComparativeOfferingIncomeByTypeResponse {
  month: string;
  type: string;
  subType: string | null;
  accumulatedOfferingPEN: number;
  accumulatedOfferingUSD: number;
  accumulatedOfferingEUR: number;
  church: {
    id: string;
    churchName: string;
  };
  totalAmount: number;
}

