/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { toast } from 'sonner';
import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type PastorFormData } from '@/app/pastor/interfaces';

interface Options {
  formMemberCrate: UseFormReturn<PastorFormData, any, PastorFormData>;
  pathname: string;
  memberRoles: typeof MemberRole;
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
  const birthDate = formMemberCrate.watch('birthDate');
  const conversionDate = formMemberCrate.watch('conversionDate');
  const maritalStatus = formMemberCrate.watch('maritalStatus');
  const email = formMemberCrate.watch('email');
  const phoneNumber = formMemberCrate.watch('phoneNumber');
  const originCountry = formMemberCrate.watch('originCountry');
  const numberChildren = formMemberCrate.watch('numberChildren');
  const country = formMemberCrate.watch('country');
  const department = formMemberCrate.watch('department');
  const province = formMemberCrate.watch('province');
  const district = formMemberCrate.watch('district');
  const urbanSector = formMemberCrate.watch('urbanSector');
  const addressResidence = formMemberCrate.watch('address');
  const addressResidenceReference = formMemberCrate.watch('referenceAddress');

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
      birthDate &&
      conversionDate &&
      maritalStatus &&
      email &&
      phoneNumber &&
      originCountry &&
      numberChildren &&
      country &&
      department &&
      province &&
      district &&
      urbanSector &&
      addressResidence &&
      addressResidenceReference &&
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
      birthDate &&
      conversionDate &&
      maritalStatus &&
      email &&
      phoneNumber &&
      originCountry &&
      numberChildren &&
      country &&
      department &&
      province &&
      district &&
      addressResidence &&
      urbanSector &&
      addressResidenceReference &&
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
      birthDate &&
      conversionDate &&
      maritalStatus &&
      email &&
      phoneNumber &&
      originCountry &&
      numberChildren &&
      country &&
      department &&
      province &&
      district &&
      addressResidence &&
      urbanSector &&
      addressResidenceReference &&
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
      birthDate &&
      conversionDate &&
      maritalStatus &&
      email &&
      phoneNumber &&
      originCountry &&
      numberChildren &&
      country &&
      department &&
      province &&
      district &&
      addressResidence &&
      urbanSector &&
      addressResidenceReference &&
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
      !birthDate ||
      !conversionDate ||
      !maritalStatus ||
      !email ||
      !phoneNumber ||
      !originCountry ||
      !numberChildren ||
      !country ||
      !department ||
      !province ||
      !district ||
      !addressResidence ||
      !urbanSector ||
      !addressResidence ||
      (addressResidenceReference && roles.length === 0)
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
    birthDate,
    maritalStatus,
    email,
    phoneNumber,
    originCountry,
    numberChildren,
    country,
    department,
    province,
    district,
    addressResidence,
    urbanSector,
    addressResidenceReference,
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
