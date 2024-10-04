interface FamilyGroupStats  {
  supervisor: string;
  active: number;
  inactive: number;
}

export type FamilyGroupsByRecordStatusResponse = Record<string, FamilyGroupStats>;

