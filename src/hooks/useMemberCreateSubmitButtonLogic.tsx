/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { toast } from 'sonner';
import { type UseFormReturn } from 'react-hook-form';

import { type MemberRoles } from '@/shared/enums';
import { type MemberData } from '@/shared/interfaces';

interface Options {
  formMemberCrate: UseFormReturn<MemberData, any, MemberData>;
  pathname: string;
  memberRoles: typeof MemberRoles;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isInputDisabled: boolean;
  isMessageErrorDisabled: boolean;
}

export const useMemberCreateSubmitButtonLogic = ({
  formMemberCrate,
  pathname,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isInputDisabled,
  isMessageErrorDisabled,
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
    if (
      formMemberCrate.formState.errors &&
      Object.values(formMemberCrate.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

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
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Pastor) &&
      Object.values(formMemberCrate.formState.errors).length === 0 &&
      !isInputDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
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
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Supervisor) &&
      theirCopastor &&
      Object.values(formMemberCrate.formState.errors).length === 0 &&
      !isInputDisabled
    ) {
      formMemberCrate.resetField('theirSupervisor', { keepTouched: true });
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
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
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Preacher) &&
      theirSupervisor &&
      Object.values(formMemberCrate.formState.errors).length === 0 &&
      !isInputDisabled
    ) {
      formMemberCrate.resetField('theirCopastor', { keepTouched: true });
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    // toast alert leader
    if (
      formMemberCrate.getValues('roles').includes(memberRoles.Supervisor) &&
      formMemberCrate.getValues('roles').includes(memberRoles.Preacher) &&
      formMemberCrate.getValues('roles').includes(memberRoles.Disciple)
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
      (theirFamilyHouse || theirPastor || theirCopastor || theirSupervisor) &&
      Object.values(formMemberCrate.formState.errors).length === 0 &&
      !isInputDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
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
      setIsMessageErrorDisabled(true);
    }
  }, [
    formMemberCrate.formState,
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
      formMemberCrate.setValue('roles', [memberRoles.Disciple]);
    }
    if (pathname === '/pastors/create-pastor') {
      formMemberCrate.setValue('roles', [memberRoles.Disciple, memberRoles.Pastor]);
    }
    if (pathname === '/copastors/create-copastor') {
      formMemberCrate.setValue('roles', [memberRoles.Disciple, memberRoles.Copastor]);
    }
  }, [isMessageErrorDisabled]);

  useEffect(() => {
    if (pathname === '/leaders/create-leader') {
      formMemberCrate.setValue('roles', [memberRoles.Disciple]);
    }
  }, []);
};
