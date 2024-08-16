export enum UserRole {
  SuperUser = 'super-user',
  AdminUser = 'admin-user',
  TreasurerUser = 'treasurer-user',
  User = 'user',
}

export const UserRoleNames: Record<UserRole, string> = {
  [UserRole.SuperUser]: 'Super Usuario',
  [UserRole.AdminUser]: 'Usuario Admin.',
  [UserRole.TreasurerUser]: 'Usuario Tesor.',
  [UserRole.User]: 'Usuario',
};


