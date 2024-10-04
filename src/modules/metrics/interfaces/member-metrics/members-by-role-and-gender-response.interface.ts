interface RoleAndGenderStats  {
  men: number;
  women: number;
}

export type MembersByRoleAndGenderResponse = Record<string, RoleAndGenderStats>;