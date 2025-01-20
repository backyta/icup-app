interface Offering {
  offering: number;
  currency: string;
  date: string | Date;
}

//? Payload
export interface OfferingIncomePayloadByUnitedService {
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
    date: Date;
    category: string;
    accumulatedOfferingPEN: number;
    accumulatedOfferingUSD: number;
    accumulatedOfferingEUR: number;
    church: {
      isAnexe: boolean;
      abbreviatedChurchName: string;
    };
    allOfferings: Offering[];
  };
  chartType?: string | undefined;
  hide: boolean;
}
