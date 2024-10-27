interface DistrictAndGenderStats  {
  men: number;
  women: number;
  church:{
    isAnexe: boolean;
    abbreviatedChurchName: string;
  }
}

export type MembersByDistrictAndGenderResponse = Record<string, DistrictAndGenderStats>;