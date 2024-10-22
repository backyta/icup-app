export interface GeneralComparativeOfferingExpensesResponse {
  type: string;
  accumulatedOfferingPEN: number;
  accumulatedOfferingUSD: number;
  accumulatedOfferingEUR: number;
  church: {
    id: string;
    churchName: string;
  };
  totalAmount: number;
}

