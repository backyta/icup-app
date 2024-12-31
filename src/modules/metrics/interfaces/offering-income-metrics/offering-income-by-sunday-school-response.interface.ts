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
    memberType: string;
    memberId: string;
    memberFullName: string;
  };
  externalDonor: {
    donorId: string;
    donorFullName: string;
    sendingCountry: string;
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


