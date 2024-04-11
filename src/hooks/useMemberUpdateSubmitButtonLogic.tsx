/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type MemberRoles } from '@/shared/enums';
import { useEffect } from 'react';

interface Options {
  form: any;
  pathname: string;
  memberRoles: typeof MemberRoles;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDisabledMessageError: React.Dispatch<React.SetStateAction<boolean>>;
}

// Submit button update Member
export const useMemberUpdateSubmitButtonLogic = ({
  form,
  pathname,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsDisabledMessageError,
}: Options): void => {
  const roles = form.watch('roles');
  const firstName = form.watch('firstName');
  const lastName = form.watch('lastName');
  const gender = form.watch('gender');
  const dateBirth = form.watch('dateBirth');
  const conversionDate = form.watch('conversionDate');
  const maritalStatus = form.watch('maritalStatus');
  const emailAddress = form.watch('emailAddress');
  const phoneNumber = form.watch('phoneNumber');
  const originCountry = form.watch('originCountry');
  const numberChildren = form.watch('numberChildren');
  const country = form.watch('country');
  const department = form.watch('department');
  const province = form.watch('province');
  const district = form.watch('district');
  const address = form.watch('address');

  const theirFamilyHouse = form.watch('theirFamilyHouse');
  const theirPastor = form.watch('theirPastor');
  const theirCopastor = form.watch('theirCopastor');
  const theirSupervisor = form.watch('theirSupervisor');

  useEffect(() => {
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
      roles.length !== 0
    ) {
      setIsSubmitButtonDisabled(false);
      setIsDisabledMessageError(false);
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
      setIsDisabledMessageError(true);
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
      ((roles.includes(memberRoles.Member) &&
        roles.includes(memberRoles.Copastor) &&
        theirPastor) ||
        (roles.includes(memberRoles.Member) && roles.includes(memberRoles.Pastor)))
    ) {
      setIsSubmitButtonDisabled(false);
      setIsDisabledMessageError(false);
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
        (roles.includes(memberRoles.Member) &&
          roles.includes(memberRoles.Copastor) &&
          !theirPastor))
    ) {
      setIsSubmitButtonDisabled(true);
      setIsDisabledMessageError(true);
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
      ((roles.includes(memberRoles.Member) &&
        roles.includes(memberRoles.Copastor) &&
        theirPastor) ||
        (roles.includes(memberRoles.Member) &&
          roles.includes(memberRoles.Supervisor) &&
          theirCopastor) ||
        (roles.includes(memberRoles.Member) &&
          roles.includes(memberRoles.Preacher) &&
          theirSupervisor))
    ) {
      setIsSubmitButtonDisabled(false);
      setIsDisabledMessageError(false);
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
      setIsDisabledMessageError(true);
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
      ((roles.includes(memberRoles.Member) && theirFamilyHouse) ||
        (roles.includes(memberRoles.Member) &&
          roles.includes(memberRoles.Preacher) &&
          theirSupervisor))
    ) {
      setIsSubmitButtonDisabled(false);
      setIsDisabledMessageError(false);
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
        (roles.includes(memberRoles.Member) &&
          !theirFamilyHouse &&
          roles.includes(memberRoles.Member) &&
          roles.includes(memberRoles.Preacher) &&
          !theirSupervisor))
    ) {
      setIsSubmitButtonDisabled(true);
      setIsDisabledMessageError(true);
    }
  }, [
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
