import { type MaritalStatus, type MemberRole } from '@/shared/enums';

export interface MemberData {
  firstName: string;
  lastName: string;
  gender: string;
  originCountry: string;
  birthDate: Date;
  maritalStatus: string | MaritalStatus;
  numberChildren: string;
  conversionDate: Date;
  emailAddress: string;
  phoneNumber: string;
  countryResidence: string;
  departmentResidence: string;
  provinceResidence: string;
  districtResidence: string;
  urbanSectorResidence: string;
  addressResidence: string;
  roles: MemberRole[];
  addressResidenceReference: string;
  theirPastor?: string | undefined;
  theirCopastor?: string | undefined;
  theirSupervisor?: string | undefined;
  theirFamilyHouse?: string | undefined;
  createdBy?: string | undefined;
  updatedBy?: string | undefined;
  status?: string | undefined;
}

export type MemberDataKeys =
  | 'firstName'
  | 'lastName'
  | 'gender'
  | 'originCountry'
  | 'birthDate'
  | 'maritalStatus'
  | 'numberChildren'
  | 'conversionDate'
  | 'emailAddress'
  | 'phoneNumber'
  | 'countryResidence'
  | 'departmentResidence'
  | 'provinceResidence'
  | 'districtResidence'
  | 'urbanSectorResidence'
  | 'addressResidence'
  | 'addressResidenceReference'
  | 'roles'
  | 'theirPastor'
  | 'theirCopastor'
  | 'theirSupervisor'
  | 'theirFamilyHouse'
  | 'createdBy'
  | 'updatedBy'
  | 'status';