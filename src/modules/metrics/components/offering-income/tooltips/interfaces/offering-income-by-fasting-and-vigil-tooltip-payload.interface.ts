import { type OfferingIncomeCreationSubType } from "@/modules/offering/income/enums";

interface Offering {
  offering: number;
  currency: string;
  date: string | Date;
}

// ? Payload
export interface OfferingIncomePayloadByFastingAndVigil {
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
    type: OfferingIncomeCreationSubType;
    accumulatedOfferingPEN: number;
    accumulatedOfferingUSD: number;
    accumulatedOfferingEUR: number;
    supervisor: {
      id: string;
      firstName: string;
      lastName: string;
    }
    zone: {
      id: string;
      zoneName: string;
      district: string;
      disciples: number;
    } | null;
    church: {
      id: string;
      churchName: string;
    } | null;
    allOfferings: Offering[];
  };
  chartType?: string | undefined;
  hide: boolean;
}

