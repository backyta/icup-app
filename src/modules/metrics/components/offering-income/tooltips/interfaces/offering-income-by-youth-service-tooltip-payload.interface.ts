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
    internalDonor: {
      memberType: string | null;
      memberId: string | null;
      memberFullName: string | null;
    };
    externalDonor: {
      donorId: string | null;
      donorFullName: string | null;
      sendingCountry: string | null;
    };
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

