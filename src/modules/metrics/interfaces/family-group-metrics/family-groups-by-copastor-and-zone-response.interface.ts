interface FamilyGroupStats  {
  copastor: string;
  supervisor: string;
  district: string;
  familyGroupsCount: number;
  church:{
    isAnexe: boolean;
    abbreviatedChurchName: string;
  }
}

export type FamilyGroupsByCopastorAndZoneResponse = Record<string, FamilyGroupStats>;
