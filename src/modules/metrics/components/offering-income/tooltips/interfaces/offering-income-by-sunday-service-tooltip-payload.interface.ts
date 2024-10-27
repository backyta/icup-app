export interface OfferingIncomePayloadBySundayService {
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
    date: string,
    category: string,
    dayPEN: number,
    afternoonPEN: number,
    dayUSD: number,
    afternoonUSD: number,
    dayEUR: number,
    afternoonEUR: number,
    church: {
      isAnexe: boolean;
      abbreviatedChurchName: string;
    };
  };
  chartType?: string | undefined;
  hide: boolean;
}