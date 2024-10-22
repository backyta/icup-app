export interface ComparativeOfferingIncomePayloadByType {
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
    totalPercentage: string;
  };
  chartType?: string | undefined;
  hide: boolean;
}

