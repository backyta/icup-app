export interface OfferingIncomePayloadBySundaySchool {
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
    dayPEN: number;
    afternoonPEN: number;
    dayUSD: number;
    afternoonUSD: number;
    dayEUR: number;
    afternoonEUR: number;
    memberType: string;
    memberId: string;
    memberFullName: string;
    accumulatedOfferingPEN: number;
    accumulatedOfferingUSD: number;
    accumulatedOfferingEUR: number;
    allOfferings: Array<{
      offering: number;
      currency: string;
      date: Date;
    }>;
    church: {
      isAnexe: boolean;
      abbreviatedChurchName: string;
    };
  };
  chartType?: string | undefined;
  hide: boolean;
}