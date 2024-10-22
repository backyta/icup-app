interface FamilyGroupStats  {
  supervisor: string;
  serviceTimesCount: number;
}

export type FamilyGroupsByServiceTimeResponse = Record<string, FamilyGroupStats>;

