import { type MaritalStatus, type MemberRoles } from "@/enums";

export interface MemberData {
  firstName: string;
  lastName: string;
  gender: string;
  originCountry: string;
  dateBirth: Date;
  maritalStatus: MaritalStatus;
  numberChildren: '3';
  conversionDate: Date;
  emailAddress: string;
  phoneNumber: string;
  country: string;
  department: string;
  province: string;
  district: string;
  address: string;
  roles: MemberRoles[];
  theirPastor: string;
  theirCopastor: string;
  theirSupervisor: string;
  theirFamilyHouse: string;
  isActive: string;
}

export type DataMemberKeys =
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
  | 'address'
  | 'roles'
  | 'theirPastor'
  | 'theirCopastor'
  | 'theirSupervisor'
  | 'theirFamilyHouse'
  | 'isActive';