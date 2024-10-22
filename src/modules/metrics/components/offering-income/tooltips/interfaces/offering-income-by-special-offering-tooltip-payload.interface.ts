interface Offering {
  offering: number;
  currency: string;
  date: string | Date;
}

// ? Payload
export interface OfferingIncomePayloadBySpecialOffering {
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
    memberType: string;
    memberId: string;
    memberFullName: string;
    allOfferings: Offering[];
    church: {
      isAnexe: boolean;
      churchName: string;
    };
    accumulatedOfferingPEN: number;
    accumulatedOfferingUSD: number;
    accumulatedOfferingEUR: number;
  };
  chartType?: string | undefined;
  hide: boolean;
}

