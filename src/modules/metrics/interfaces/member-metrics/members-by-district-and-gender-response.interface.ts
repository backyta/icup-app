interface DistrictAndGenderStats  {
  men: number;
  women: number;
}

export type MembersByDistrictAndGenderResponse = Record<string, DistrictAndGenderStats>;