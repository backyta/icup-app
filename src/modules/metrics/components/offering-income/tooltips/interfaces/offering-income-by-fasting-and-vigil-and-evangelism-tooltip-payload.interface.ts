import { type OfferingIncomeCreationSubType } from '@/modules/offering/income/enums/offering-income-creation-sub-type.enum';

interface Offering {
  offering: number;
  currency: string;
  date: Date;
}

//? Payload
export interface OfferingIncomePayloadByFastingAndVigilAndEvangelism {
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
    type: OfferingIncomeCreationSubType;
    accumulatedOfferingPEN: number;
    accumulatedOfferingUSD: number;
    accumulatedOfferingEUR: number;
    copastor: {
      id: string;
      firstNames: string;
      lastNames: string;
    };
    supervisor: {
      id: string;
      firstNames: string;
      lastNames: string;
    };
    zone: {
      id: string;
      zoneName: string;
      district: string;
      disciples: number;
    } | null;
    church: {
      isAnexe: string;
      abbreviatedChurchName: string;
    } | null;
    allOfferings: Offering[];
  };
  chartType?: string | undefined;
  hide: boolean;
}
