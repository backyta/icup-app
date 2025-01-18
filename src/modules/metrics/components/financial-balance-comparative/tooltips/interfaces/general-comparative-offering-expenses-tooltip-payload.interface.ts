export interface GeneralComparativeOfferingExpensesPayload {
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
    type: string;
    accumulatedOfferingPEN: number;
    accumulatedOfferingUSD: number;
    accumulatedOfferingEUR: number;
    church: {
      isAnexe: boolean;
      abbreviatedChurchName: string;
    };
    totalAmount: number;
    totalPercentage: string;
  };
  chartType?: string | undefined;
  hide: boolean;
}
