export interface MembersFluctuationResponse {
  month: string;
  newMembers: number;
  inactiveMembers: number;
  church:{
    isAnexe: boolean;
    abbreviatedChurchName: string;
  }
}
