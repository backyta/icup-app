interface FamilyGroupStats  {
  preacher: string;
  men: number;
  women: number;
  familyGroupCode: string;
}

export type FamilyGroupsByCodeResponse = Record<string, FamilyGroupStats>;

