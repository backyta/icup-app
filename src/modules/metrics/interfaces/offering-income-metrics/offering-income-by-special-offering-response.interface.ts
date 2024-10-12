export interface OfferingIncomeBySpecialOfferingResponse {
  date: Date;
  accumulatedOfferingPEN: number;
  accumulatedOfferingUSD: number;
  accumulatedOfferingEUR: number;
  memberType: string;
  pastor: {
    id: string;
    firstName: string;
    lastName: string;
  } | null;
  copastor: {
    id: string;
    firstName: string;
    lastName: string;
  } | null;
  supervisor: {
    id: string;
    firstName: string;
    lastName: string;
  } | null;
  preacher: {
    id: string;
    firstName: string;
    lastName: string;
  } | null;
  disciple: {
    id: string;
    firstName: string;
    lastName: string;
  } | null;
  allOfferings: Array<{
    offering: number;
    currency: string;
    date: Date;
  }>;
}

