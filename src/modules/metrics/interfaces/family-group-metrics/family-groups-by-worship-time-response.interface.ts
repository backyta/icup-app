interface FamilyGroupStats  {
  supervisor: string;
  worshipTimesCount: number;
}

export type FamilyGroupsByWorshipTimeResponse = Record<string, FamilyGroupStats>;

