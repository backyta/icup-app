export enum UserRoles {
  superUser = 'super-user',
  adminUser = 'admin-user',
  treasurerUser = 'treasurer-user',
  user = 'user',
}

export const UserRoleNames: Record<UserRoles, string> = {
  'super-user': 'Super-Usuario',
  'admin-user': 'Admin-Usuario',
  'treasurer-user': 'Tesorero-Usuario',
  'user': 'Usuario',

};
