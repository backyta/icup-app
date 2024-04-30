/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type MemberRoles } from '@/shared/enums';
import { type MemberData } from '@/shared/interfaces';

interface Options {
  formMemberUpdate: UseFormReturn<MemberData, any, MemberData>;
  pathname: string;
  isRelationSelectDisabled: boolean;
  memberRoles: typeof MemberRoles;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useMemberUpdateSubmitButtonLogic = ({
  formMemberUpdate,
  pathname,
  memberRoles,
  isRelationSelectDisabled,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
}: Options): void => {
  // watchers
  const roles = formMemberUpdate.watch('roles');
  const firstName = formMemberUpdate.watch('firstName');
  const lastName = formMemberUpdate.watch('lastName');
  const gender = formMemberUpdate.watch('gender');
  const dateBirth = formMemberUpdate.watch('dateBirth');
  const conversionDate = formMemberUpdate.watch('conversionDate');
  const maritalStatus = formMemberUpdate.watch('maritalStatus');
  const emailAddress = formMemberUpdate.watch('emailAddress');
  const phoneNumber = formMemberUpdate.watch('phoneNumber');
  const originCountry = formMemberUpdate.watch('originCountry');
  const numberChildren = formMemberUpdate.watch('numberChildren');
  const country = formMemberUpdate.watch('country');
  const department = formMemberUpdate.watch('department');
  const province = formMemberUpdate.watch('province');
  const district = formMemberUpdate.watch('district');
  const address = formMemberUpdate.watch('address');

  const theirFamilyHouse = formMemberUpdate.watch('theirFamilyHouse');
  const theirPastor = formMemberUpdate.watch('theirPastor');
  const theirCopastor = formMemberUpdate.watch('theirCopastor');
  const theirSupervisor = formMemberUpdate.watch('theirSupervisor');

  // effects
  useEffect(() => {
    if (
      formMemberUpdate.formState.errors &&
      Object.values(formMemberUpdate.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    // pastor
    if (
      pathname === '/pastors/update-pastor' &&
      firstName &&
      lastName &&
      gender &&
      dateBirth &&
      conversionDate &&
      maritalStatus &&
      emailAddress &&
      phoneNumber &&
      originCountry &&
      numberChildren &&
      country &&
      department &&
      province &&
      district &&
      address &&
      roles.length !== 0 &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Pastor) &&
      theirPastor &&
      Object.values(formMemberUpdate.formState.errors).length === 0 &&
      !isRelationSelectDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      pathname === '/pastors/update-pastor' &&
      (!firstName ||
        !lastName ||
        !gender ||
        !dateBirth ||
        !conversionDate ||
        !maritalStatus ||
        !emailAddress ||
        !phoneNumber ||
        !originCountry ||
        !numberChildren ||
        !country ||
        !department ||
        !province ||
        !district ||
        !address ||
        roles.length === 0)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    // copastor
    if (
      pathname === '/copastors/update-copastor' &&
      firstName &&
      lastName &&
      gender &&
      dateBirth &&
      conversionDate &&
      maritalStatus &&
      emailAddress &&
      phoneNumber &&
      originCountry &&
      numberChildren &&
      country &&
      department &&
      province &&
      district &&
      address &&
      ((roles.includes(memberRoles.Disciple) &&
        roles.includes(memberRoles.Copastor) &&
        theirPastor) ||
        (roles.includes(memberRoles.Disciple) && roles.includes(memberRoles.Pastor))) &&
      Object.values(formMemberUpdate.formState.errors).length === 0 &&
      !isRelationSelectDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      pathname === '/copastors/update-copastor' &&
      (!firstName ||
        !lastName ||
        !gender ||
        !dateBirth ||
        !conversionDate ||
        !maritalStatus ||
        !emailAddress ||
        !phoneNumber ||
        !originCountry ||
        !numberChildren ||
        !country ||
        !department ||
        !province ||
        !district ||
        !address ||
        (roles.includes(memberRoles.Disciple) &&
          roles.includes(memberRoles.Copastor) &&
          !theirPastor))
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    // leaders
    if (
      pathname === '/leaders/update-leader' &&
      firstName &&
      lastName &&
      gender &&
      dateBirth &&
      conversionDate &&
      maritalStatus &&
      emailAddress &&
      phoneNumber &&
      originCountry &&
      numberChildren &&
      country &&
      department &&
      province &&
      district &&
      address &&
      ((roles.includes(memberRoles.Disciple) &&
        roles.includes(memberRoles.Copastor) &&
        theirPastor) ||
        (roles.includes(memberRoles.Disciple) &&
          roles.includes(memberRoles.Supervisor) &&
          theirCopastor) ||
        (roles.includes(memberRoles.Disciple) &&
          roles.includes(memberRoles.Preacher) &&
          theirSupervisor)) &&
      Object.values(formMemberUpdate.formState.errors).length === 0 &&
      !isRelationSelectDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      pathname === '/leaders/update-leader' &&
      (!firstName ||
        !lastName ||
        !gender ||
        !dateBirth ||
        !conversionDate ||
        !maritalStatus ||
        !emailAddress ||
        !phoneNumber ||
        !originCountry ||
        !numberChildren ||
        !country ||
        !department ||
        !province ||
        !district ||
        !address ||
        (!theirPastor && !theirCopastor && !theirSupervisor))
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    // disciples
    if (
      pathname === '/disciples/update-disciple' &&
      firstName &&
      lastName &&
      gender &&
      dateBirth &&
      conversionDate &&
      maritalStatus &&
      emailAddress &&
      phoneNumber &&
      originCountry &&
      numberChildren &&
      country &&
      department &&
      province &&
      district &&
      address &&
      ((roles.includes(memberRoles.Disciple) && theirFamilyHouse) ||
        (roles.includes(memberRoles.Disciple) &&
          roles.includes(memberRoles.Preacher) &&
          theirSupervisor)) &&
      Object.values(formMemberUpdate.formState.errors).length === 0 &&
      !isRelationSelectDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      pathname === '/disciples/update-disciple' &&
      (!firstName ||
        !lastName ||
        !gender ||
        !dateBirth ||
        !conversionDate ||
        !maritalStatus ||
        !emailAddress ||
        !phoneNumber ||
        !originCountry ||
        !numberChildren ||
        !country ||
        !department ||
        !province ||
        !district ||
        !address ||
        (roles.includes(memberRoles.Disciple) &&
          !theirFamilyHouse &&
          roles.includes(memberRoles.Disciple) &&
          roles.includes(memberRoles.Preacher) &&
          !theirSupervisor))
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
  }, [
    formMemberUpdate.formState,
    firstName,
    lastName,
    gender,
    conversionDate,
    dateBirth,
    maritalStatus,
    emailAddress,
    phoneNumber,
    originCountry,
    numberChildren,
    country,
    department,
    province,
    district,
    address,
    theirFamilyHouse,
    theirPastor,
    theirCopastor,
    theirSupervisor,
    roles,
  ]);
};
