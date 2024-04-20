/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type MemberRoles } from '@/shared/enums';
import { type MemberData } from '@/shared/interfaces';
import { toast } from 'sonner';

interface Options {
  formMemberCrate: UseFormReturn<MemberData, any, MemberData>;
  pathname: string;
  memberRoles: typeof MemberRoles;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDisabledMessageError: React.Dispatch<React.SetStateAction<boolean>>;
  isDisabledMessageError: boolean;
}

export const useMemberCreateSubmitButtonLogic = ({
  formMemberCrate,
  pathname,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsDisabledMessageError,
  isDisabledMessageError,
}: Options): void => {
  // watchers
  const roles = formMemberCrate.watch('roles');
  const firstName = formMemberCrate.watch('firstName');
  const lastName = formMemberCrate.watch('lastName');
  const gender = formMemberCrate.watch('gender');
  const dateBirth = formMemberCrate.watch('dateBirth');
  const conversionDate = formMemberCrate.watch('conversionDate');
  const maritalStatus = formMemberCrate.watch('maritalStatus');
  const emailAddress = formMemberCrate.watch('emailAddress');
  const phoneNumber = formMemberCrate.watch('phoneNumber');
  const originCountry = formMemberCrate.watch('originCountry');
  const numberChildren = formMemberCrate.watch('numberChildren');
  const country = formMemberCrate.watch('country');
  const department = formMemberCrate.watch('department');
  const province = formMemberCrate.watch('province');
  const district = formMemberCrate.watch('district');
  const address = formMemberCrate.watch('address');

  const theirFamilyHouse = formMemberCrate.watch('theirFamilyHouse');
  const theirPastor = formMemberCrate.watch('theirPastor');
  const theirCopastor = formMemberCrate.watch('theirCopastor');
  const theirSupervisor = formMemberCrate.watch('theirSupervisor');

  // effects
  useEffect(() => {
    // pastor
    if (
      pathname === '/pastors/create-pastor' &&
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
      roles.includes(memberRoles.Member) &&
      roles.includes(memberRoles.Pastor)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsDisabledMessageError(false);
    }

    // leaders
    if (
      pathname === '/leaders/create-leader' &&
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
      roles.includes(memberRoles.Member) &&
      roles.includes(memberRoles.Supervisor) &&
      theirCopastor
    ) {
      formMemberCrate.resetField('theirSupervisor', { keepTouched: true });
      setIsSubmitButtonDisabled(true);
      setIsDisabledMessageError(true);
    }

    if (
      pathname === '/leaders/create-leader' &&
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
      roles.includes(memberRoles.Member) &&
      roles.includes(memberRoles.Preacher) &&
      theirSupervisor
    ) {
      formMemberCrate.resetField('theirCopastor', { keepTouched: true });
      setIsSubmitButtonDisabled(true);
      setIsDisabledMessageError(true);
    }

    // toast alert leader
    if (
      formMemberCrate.getValues('roles').includes(memberRoles.Supervisor) &&
      formMemberCrate.getValues('roles').includes(memberRoles.Preacher) &&
      formMemberCrate.getValues('roles').includes(memberRoles.Member)
    ) {
      toast.error('Solo debes elegir un rol: "Predicador" o "Supervisor"', {
        position: 'bottom-left',
        className: 'justify-center',
      });
    }

    // others pages
    if (
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
      roles &&
      (theirFamilyHouse || theirPastor || theirCopastor || theirSupervisor)
    ) {
      setIsSubmitButtonDisabled(false);
      setIsDisabledMessageError(false);
    }

    if (
      !firstName ||
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
      roles.length === 0
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

  useEffect(() => {
    if (pathname === '/disciples/create-disciple') {
      formMemberCrate.setValue('roles', [memberRoles.Member]);
    }
    if (pathname === '/pastors/create-pastor') {
      formMemberCrate.setValue('roles', [memberRoles.Member, memberRoles.Pastor]);
    }
    if (pathname === '/copastors/create-copastor') {
      formMemberCrate.setValue('roles', [memberRoles.Member, memberRoles.Copastor]);
    }
  }, [isDisabledMessageError]);

  useEffect(() => {
    if (pathname === '/leaders/create-leader') {
      formMemberCrate.setValue('roles', [memberRoles.Member]);
    }
  }, []);
};
