export interface ComparativeOfferingExpensesPayloadBySubType {
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
    subType: string;
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
