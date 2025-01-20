interface Offering {
  offering: number;
  currency: string;
  date: string | Date;
}

export interface TopFamilyGroupOfferingsPayload {
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
    familyGroup: {
      id: string;
      familyGroupName: string;
      familyGroupCode: string;
      disciples: number;
    };
    preacher: {
      id: string;
      firstNames: string;
      lastNames: string;
    };
    church: {
      isAnexe: boolean;
      abbreviatedChurchName: string;
    };
    familyGroupCode: string;
    lastOfferingPEN: number;
    lastOfferingUSD: number;
    lastOfferingEUR: number;
    allOfferings: Offering[];
  };
  chartType?: string | undefined;
  hide: boolean;
}
