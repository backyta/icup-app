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
    date: string;
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
      firstName: string;
      lastName: string;
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

