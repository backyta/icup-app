interface RoleAndGenderStats {
  men: number;
  women: number;
  church: {
    isAnexe: boolean;
    abbreviatedChurchName: string;
  };
}

export type MembersByRoleAndGenderResponse = Record<string, RoleAndGenderStats>;
