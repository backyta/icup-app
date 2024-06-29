import { type UserRoles } from '@/app/user/enums';

export interface UserData {
  id: string;
  firstName: string,
  lastName:string,
  email: string,
  password: string,
  passwordConfirm: string,
  gender: string,
  roles: UserRoles[],
  status?: string | undefined,
}

export type UserDataKeys =
  | 'id'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'gender'
  | 'password'
  | 'passwordConfirm'
  | 'roles'
  | 'status';


export type User = Omit<UserData, 'password' | 'passwordConfirm'>;