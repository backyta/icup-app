interface FamilyGroupStats  {
  supervisor: string;
  serviceTimesCount: number;
  church: {
    isAnexe: boolean;
    abbreviatedChurchName: string;
  };
}

export type FamilyGroupsByServiceTimeResponse = Record<string, FamilyGroupStats>;

