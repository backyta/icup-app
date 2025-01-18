interface CategoryAndGenderStats {
  men: number;
  women: number;
  church: {
    isAnexe: boolean;
    abbreviatedChurchName: string;
  };
}

export type MembersByCategoryAndGenderResponse = Record<string, CategoryAndGenderStats>;
