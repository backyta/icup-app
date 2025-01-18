export interface OfferingIncomeBySundaySchoolResponse {
  date: Date;
  category: string;
  dayPEN: number;
  afternoonPEN: number;
  dayUSD: number;
  afternoonUSD: number;
  dayEUR: number;
  afternoonEUR: number;
  internalDonor: {
    memberType: string | null;
    memberId: string | null;
    memberFullName: string | null;
  };
  externalDonor: {
    donorId: string | null;
    donorFullName: string | null;
    sendingCountry: string | null;
  };
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
}
