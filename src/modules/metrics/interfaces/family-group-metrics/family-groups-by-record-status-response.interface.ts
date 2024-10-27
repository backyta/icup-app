interface FamilyGroupStats  {
  supervisor: string;
  active: number;
  inactive: number;
  church: {
    isAnexe: boolean;
    abbreviatedChurchName: string;
  };
}

export type FamilyGroupsByRecordStatusResponse = Record<string, FamilyGroupStats>;

