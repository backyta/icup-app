import { type UserRole } from '@/app/user/enums';

export interface UserFormData {
  firstName: string,
  lastName:string,
  email: string,
  password?: string | undefined,
  passwordConfirm?: string  | undefined,
  gender: string,
  roles: UserRole[],
  recordStatus?: string | undefined,
}

export type UserFormDataKeys =
  | 'id'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'gender'
  | 'password'
  | 'passwordConfirm'
  | 'roles'
  | 'status';

export type User = Omit<UserFormData, 'password' | 'passwordConfirm'>;