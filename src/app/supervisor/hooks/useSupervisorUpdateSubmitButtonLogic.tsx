/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type MemberRoles } from '@/shared/enums';
import { type SupervisorFormData } from '@/app/supervisor/interfaces';

interface Options {
  formSupervisorUpdate: UseFormReturn<SupervisorFormData, any, SupervisorFormData>;
  memberRoles: typeof MemberRoles;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useSupervisorUpdateSubmitButtonLogic = ({
  formSupervisorUpdate,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
}: Options): void => {
  //* Watchers
  const firstName = formSupervisorUpdate.watch('firstName');
  const lastName = formSupervisorUpdate.watch('lastName');
  const gender = formSupervisorUpdate.watch('gender');
  const birthDate = formSupervisorUpdate.watch('birthDate');
  const originCountry = formSupervisorUpdate.watch('originCountry');
  const maritalStatus = formSupervisorUpdate.watch('maritalStatus');
  const numberChildren = formSupervisorUpdate.watch('numberChildren');
  const conversionDate = formSupervisorUpdate.watch('conversionDate');
  const email = formSupervisorUpdate.watch('email');
  const phoneNumber = formSupervisorUpdate.watch('phoneNumber');
  const country = formSupervisorUpdate.watch('country');
  const department = formSupervisorUpdate.watch('department');
  const province = formSupervisorUpdate.watch('province');
  const district = formSupervisorUpdate.watch('district');
  const urbanSector = formSupervisorUpdate.watch('urbanSector');
  const address = formSupervisorUpdate.watch('address');
  const referenceAddress = formSupervisorUpdate.watch('referenceAddress');
  const roles = formSupervisorUpdate.watch('roles');
  const status = formSupervisorUpdate.watch('status');

  const theirCopastor = formSupervisorUpdate.watch('theirCopastor');
  const theirPastor = formSupervisorUpdate.watch('theirPastor');

  //* Effects
  useEffect(() => {
    if (
      formSupervisorUpdate.formState.errors &&
      Object.values(formSupervisorUpdate.formState.errors).length > 0
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
      address &&
      urbanSector &&
      referenceAddress &&
      roles.length !== 0 &&
      theirCopastor &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Copastor) &&
      Object.values(formSupervisorUpdate.formState.errors).length === 0
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
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
      address &&
      urbanSector &&
      referenceAddress &&
      roles.length !== 0 &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Pastor) &&
      !theirPastor &&
      Object.values(formSupervisorUpdate.formState.errors).length === 0
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
      address &&
      urbanSector &&
      referenceAddress &&
      roles.length !== 0 &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Pastor) &&
      theirPastor &&
      Object.values(formSupervisorUpdate.formState.errors).length === 0
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
      !urbanSector ||
      !referenceAddress ||
      !address ||
      roles.length === 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
  }, [
    formSupervisorUpdate.formState,
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
    status,
  ]);
};
