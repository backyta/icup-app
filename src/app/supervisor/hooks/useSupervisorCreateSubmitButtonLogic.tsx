/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type MemberRoles } from '@/shared/enums';
import { type SupervisorFormData } from '@/app/supervisor/interfaces';

interface Options {
  formSupervisorCrate: UseFormReturn<SupervisorFormData, any, SupervisorFormData>;
  memberRoles: typeof MemberRoles;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isMessageErrorDisabled: boolean;
  isInputDisabled: boolean;
}

export const useSupervisorCreateSubmitButtonLogic = ({
  formSupervisorCrate,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const firstName = formSupervisorCrate.watch('firstName');
  const lastName = formSupervisorCrate.watch('lastName');
  const gender = formSupervisorCrate.watch('gender');
  const birthDate = formSupervisorCrate.watch('birthDate');
  const conversionDate = formSupervisorCrate.watch('conversionDate');
  const maritalStatus = formSupervisorCrate.watch('maritalStatus');
  const email = formSupervisorCrate.watch('email');
  const phoneNumber = formSupervisorCrate.watch('phoneNumber');
  const originCountry = formSupervisorCrate.watch('originCountry');
  const numberChildren = formSupervisorCrate.watch('numberChildren');
  const country = formSupervisorCrate.watch('country');
  const department = formSupervisorCrate.watch('department');
  const province = formSupervisorCrate.watch('province');
  const district = formSupervisorCrate.watch('district');
  const urbanSector = formSupervisorCrate.watch('urbanSector');
  const address = formSupervisorCrate.watch('address');
  const roles = formSupervisorCrate.watch('roles');
  const referenceAddress = formSupervisorCrate.watch('referenceAddress');
  const theirCopastor = formSupervisorCrate.watch('theirCopastor');
  const theirPastor = formSupervisorCrate.watch('theirPastor');

  //* Effects
  useEffect(() => {
    if (
      formSupervisorCrate.formState.errors &&
      Object.values(formSupervisorCrate.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

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
      urbanSector &&
      address &&
      referenceAddress &&
      (theirCopastor || theirPastor) &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Supervisor) &&
      Object.values(formSupervisorCrate.formState.errors).length === 0 &&
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
      !address ||
      !urbanSector ||
      !address ||
      referenceAddress ||
      roles.length === 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
  }, [
    formSupervisorCrate.formState,
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
    address,
    urbanSector,
    referenceAddress,
    theirCopastor,
    theirPastor,
    roles,
  ]);

  useEffect(() => {
    formSupervisorCrate.setValue('roles', [memberRoles.Disciple, memberRoles.Supervisor]);
  }, [isMessageErrorDisabled]);
};
