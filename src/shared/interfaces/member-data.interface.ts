import { type MaritalStatus, type MemberRole } from '@/shared/enums';

export interface MemberData {
  firstName: string;
  lastName: string;
  gender: string;
  originCountry: string;
  dateBirth: Date;
  maritalStatus: string | MaritalStatus;
  numberChildren: string;
  conversionDate: Date;
  emailAddress: string;
  phoneNumber: string;
  country: string;
  department: string;
  province: string;
  district: string;
  urbanSector: string;
  address: string;
  roles: MemberRole[];
  referenceComments: string;
  theirPastor?: string | undefined;
  theirCopastor?: string | undefined;
  theirSupervisor?: string | undefined;
  theirFamilyHouse?: string | undefined;
  status?: string | undefined;
}

export type MemberDataKeys =
  | 'firstName'
  | 'lastName'
  | 'gender'
  | 'originCountry'
  | 'dateBirth'
  | 'maritalStatus'
  | 'numberChildren'
  | 'conversionDate'
  | 'emailAddress'
  | 'phoneNumber'
  | 'country'
  | 'department'
  | 'province'
  | 'district'
  | 'urbanSector'
  | 'address'
  | 'referenceComments'
  | 'roles'
  | 'theirPastor'
  | 'theirCopastor'
  | 'theirSupervisor'
  | 'theirFamilyHouse'
  | 'status';