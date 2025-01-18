interface ZoneAndGenderStats {
  supervisor: string;
  copastor: string;
  men: number;
  women: number;
  church: {
    isAnexe: boolean;
    abbreviatedChurchName: string;
  };
}

export type MembersByZoneAndGenderResponse = Record<string, ZoneAndGenderStats>;
