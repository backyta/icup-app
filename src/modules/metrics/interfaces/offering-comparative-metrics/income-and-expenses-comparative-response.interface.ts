export interface IncomeAndExpensesComparativeResponse {
  month: string;
  currency: string;
  netResultPrevious: number | null;
  totalIncome: number;
  totalExpenses: number;
  netResult: number;
  church: {
    isAnexe: boolean;
    abbreviatedChurchName: string;
  };
}

