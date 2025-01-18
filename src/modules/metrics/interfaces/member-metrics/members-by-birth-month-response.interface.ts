export interface MembersByBirthMonthResponse {
  month: string;
  membersCount: number;
  averageAge: string | number;
  church: {
    isAnexe: boolean;
    abbreviatedChurchName: string;
  };
}
