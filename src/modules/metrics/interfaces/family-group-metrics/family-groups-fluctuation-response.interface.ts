export interface FamilyGroupsFluctuationResponse {
  month: string;
  newFamilyGroups: number;
  inactiveFamilyGroups: number;
  church:{
    isAnexe: boolean;
    abbreviatedChurchName: string;
  }
}