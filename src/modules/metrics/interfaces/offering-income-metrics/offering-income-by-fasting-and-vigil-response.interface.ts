export interface OfferingIncomeByFastingAndVigilResponse {
  type: string;
  category: string;
  accumulatedOfferingPEN: number;
  accumulatedOfferingUSD: number;
  accumulatedOfferingEUR: number;
  date: string | Date;
  copastor: {
    id: string,
    firstNames: string,
    lastNames: string,
  } | null ;
  supervisor: {
    id: string,
    firstNames: string,
    lastNames: string,
  } | null ;
  zone: {
    id: string,
      zoneName: string,
      district: string,
      disciples: number,
  } | null ;
  church: {
    id: string;
    abbreviatedChurchName: string;
  } | null;
  allOfferings: Array<{
    offering: number;
    currency: string;
    date: Date;
  }>;
}

