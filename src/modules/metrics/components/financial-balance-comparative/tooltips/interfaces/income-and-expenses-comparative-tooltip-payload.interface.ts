export interface IncomeAndExpensesComparativePayload {
  fill: string;
  radius: number;
  dataKey: string;
  unit?: string | undefined;
  formatter?: ((value: number) => string) | undefined;
  name: string;
  color: string;
  value: number;
  type?: string | undefined;
  payload: {
    month: string,
    netResultPrevious: number | null;
    totalIncome: number;
    totalExpenses: number;
    currency: string;
    netResult: number;
  };
  chartType?: string | undefined;
  hide: boolean;
}



