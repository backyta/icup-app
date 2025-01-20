interface Offering {
  offering: number;
  currency: string;
  date: Date;
}

//? Payload
export interface OfferingExpenseChartPayload {
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
    date: Date;
    comments: string;
    accumulatedOfferingPEN: number;
    accumulatedOfferingUSD: number;
    accumulatedOfferingEUR: number;
    church: {
      isAnexe: boolean;
      abbreviatedChurchName: string;
    };
    allOfferings: Offering[];
    totalPercentage: string;
  };
  chartType?: string | undefined;
  hide: boolean;
}
