interface ZoneAndGenderStats  {
  supervisor: string;
  men: number;
  women: number;
}

export type MembersByZoneAndGenderResponse = Record<string, ZoneAndGenderStats>;

