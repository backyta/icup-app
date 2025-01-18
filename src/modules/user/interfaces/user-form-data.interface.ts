import { type UserRole } from '@/modules/user/enums/user-role.enum';

export interface UserFormData {
  firstNames: string;
  lastNames: string;
  email: string;
  password?: string | undefined;
  passwordConfirm?: string | undefined;
  gender: string;
  roles: UserRole[];
  recordStatus?: string | undefined;
}

export type UserFormDataKeys =
  | 'id'
  | 'firstNames'
  | 'lastNames'
  | 'email'
  | 'gender'
  | 'password'
  | 'passwordConfirm'
  | 'roles'
  | 'status';

export type User = Omit<UserFormData, 'password' | 'passwordConfirm'>;
