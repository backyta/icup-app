import { type UserRoles } from "@/enums";



export interface UserData {
  firstName: string,
  lastName:string,
  emailAddress: string,
  password: string,
  passwordConfirm: string,
  roles: UserRoles[],
}

export type DataUserKeys =
  | 'firstName'
  | 'lastName'
  | 'emailAddress'
  | 'password'
  | 'passwordConfirm'
  | 'roles';
