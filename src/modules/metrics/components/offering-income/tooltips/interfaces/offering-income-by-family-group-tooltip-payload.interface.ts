interface Offering {
  offering: number;
  currency: string;
  date: string | Date;
}

// ? Payload
export interface OfferingIncomePayloadByFamilyGroup {
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
    accumulatedOfferingPEN: number;
    accumulatedOfferingUSD: number;
    accumulatedOfferingEUR: number;
    familyGroup: {
      id: string;
      familyGroupName: string;
      familyGroupCode: string;
    };
    preacher: {
      id: string;
      firstName: string;
      lastName: string;
    };
    church: {
      isAnexe: boolean;
      churchName: string;
    };
    disciples: number;
    allOfferings: Offering[];
  };
  chartType?: string | undefined;
  hide: boolean;
}

