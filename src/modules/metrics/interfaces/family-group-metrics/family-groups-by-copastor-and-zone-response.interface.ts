interface FamilyGroupStats  {
  copastor: string;
  supervisor: string;
  familyGroupsCount: number;
  church:{
    isAnexe: boolean;
    abbreviatedChurchName: string;
  }
}

export type FamilyGroupsByCopastorAndZoneResponse = Record<string, FamilyGroupStats>;
