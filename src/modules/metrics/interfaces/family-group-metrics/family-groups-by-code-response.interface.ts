interface FamilyGroupStats  {
  familyGroupCode: string;
  preacher: string;
  men: number;
  women: number;
}

export type FamilyGroupsByCodeResponse = Record<string, FamilyGroupStats>;

