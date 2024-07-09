import { type MemberRoles } from '@/shared/enums';


export interface SupervisorFormData {
  firstName: string;
  lastName: string;
  gender: string;
  originCountry: string;
  birthDate: Date;
  maritalStatus: string;
  numberChildren: string;
  conversionDate: Date;
  email: string,
  phoneNumber: string,
  country: string;
  department: string;
  province: string;
  district: string;
  urbanSector: string;
  address: string;
  referenceAddress: string;
  roles: MemberRoles[];
  status?: string | undefined;
  theirCopastor?: string | undefined;
  theirPastor?: string | undefined;
}

export type SupervisorFormDataKeys =
  | 'firstName'
  | 'lastName'
  | 'gender'
  | 'churchName'
  | 'originCountry'
  | 'birthDate'
  | 'maritalStatus'
  | 'numberChildren'
  | 'conversionDate'
  | 'email'
  | 'phoneNumber'
  | 'country'
  | 'department'
  | 'province'
  | 'district'
  | 'urbanSector'
  | 'address'
  | 'referenceAddress'
  | 'roles'
  | 'status'
  | 'theirCopastor'
  | 'theirPastor'