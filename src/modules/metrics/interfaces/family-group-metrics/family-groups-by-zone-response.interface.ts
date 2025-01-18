interface FamilyGroupStats {
  familyGroupCode: string;
  supervisor: string;
  preacher: string;
  men: number;
  women: number;
  church: {
    isAnexe: boolean;
    abbreviatedChurchName: string;
  };
}

export type FamilyGroupsByZoneResponse = Record<string, FamilyGroupStats>;
