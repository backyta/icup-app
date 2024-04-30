import { type UserRoles } from '@/app/user/enums';

export interface UserData {
  firstName: string,
  lastName:string,
  emailAddress: string,
  password: string,
  passwordConfirm: string,
  roles: UserRoles[],
  status?: string | undefined,
}

export type UserDataKeys =
  | 'firstName'
  | 'lastName'
  | 'emailAddress'
  | 'password'
  | 'passwordConfirm'
  | 'roles'
  | 'status';


  