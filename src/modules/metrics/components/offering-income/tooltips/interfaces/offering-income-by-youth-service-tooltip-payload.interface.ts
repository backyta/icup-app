interface Offering {
  offering: number;
  currency: string;
  date: string | Date;
}

// ? Payload
export interface OfferingIncomePayloadByYouthService {
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
    date: string;
    category: string;
    memberType: string;
    memberId: string;
    memberFullName: string;
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

