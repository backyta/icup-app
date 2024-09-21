interface CategoryAndGenderStats  {
  men: number;
  women: number;
}

export type MembersByCategoryAndGenderResponse = Record<string, CategoryAndGenderStats>;