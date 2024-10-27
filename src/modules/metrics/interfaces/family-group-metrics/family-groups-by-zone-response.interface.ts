interface FamilyGroupStats  {
  supervisor: string;
  familyGroupsCount: number;
  church:{
    isAnexe: boolean;
    abbreviatedChurchName: string;
  }
}

export type FamilyGroupsByZoneResponse = Record<string, FamilyGroupStats>;
