export interface OfferingIncomeByUnitedServiceResponse {
  date: Date;
  accumulatedOfferingPEN: number;
  accumulatedOfferingUSD: number;
  accumulatedOfferingEUR: number;
  church:{
    id: string;
    churchName: string;
  }
  allOfferings: Array<{
    offering: number;
    currency: string;
    date: Date;
  }>;
}

