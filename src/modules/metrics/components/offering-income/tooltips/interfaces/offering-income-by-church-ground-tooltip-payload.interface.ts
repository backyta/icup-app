interface Offering {
  lastDonor: string | null;
  sendingCountry: string | null;
  donorId: string | null;
  offering: number;
  currency: string;
  date: string | Date;
}

//? Payload
export interface OfferingsIncomePayloadByChurchGround {
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
    memberFullName: string;
    memberId: string | undefined;
    externalDonor: {
      donorId: string | null;
      donorFullName: string | null;
      sendingCountry: string | null;
    };
    allOfferings: Offering[];
    church: {
      isAnexe: boolean;
      abbreviatedChurchName: string;
    };
    accumulatedOfferingPEN: number;
    accumulatedOfferingUSD: number;
    accumulatedOfferingEUR: number;
  };
  chartType?: string | undefined;
  hide: boolean;
}
