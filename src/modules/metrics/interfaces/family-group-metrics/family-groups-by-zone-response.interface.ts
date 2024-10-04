interface FamilyGroupStats  {
  supervisor: string;
  familyGroupsCount: number;
}

export type FamilyGroupsByZoneResponse = Record<string, FamilyGroupStats>;

