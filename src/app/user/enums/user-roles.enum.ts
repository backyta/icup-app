export enum UserRoles {
  SuperUser = 'super-user',
  AdminUser = 'admin-user',
  TreasurerUser = 'treasurer-user',
  User = 'user',
}

export const UserRoleNames: Record<UserRoles, string> = {
  'super-user': 'Super-Usuario',
  'admin-user': 'Admin-Usuario',
  'treasurer-user': 'Tesorero-Usuario',
  'user': 'Usuario',
};
