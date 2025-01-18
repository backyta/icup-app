interface DistrictAndGenderStats {
  men: number;
  women: number;
  district: string;
  church: {
    isAnexe: boolean;
    abbreviatedChurchName: string;
  };
}

export type MembersByDistrictAndGenderResponse = Record<string, DistrictAndGenderStats>;
