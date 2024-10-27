interface FamilyGroupStats  {
  familyGroupCode: string;
  preacher: string;
  men: number;
  women: number;
  church: {
    isAnexe: boolean;
    abbreviatedChurchName: string;
  };
}

export type FamilyGroupsByCodeResponse = Record<string, FamilyGroupStats>;

