/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type SupervisorFormData } from '@/app/supervisor/interfaces';

interface Options {
  formSupervisorUpdate: UseFormReturn<SupervisorFormData, any, SupervisorFormData>;
  memberRoles: typeof MemberRole;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isInputDisabled: boolean;
  isRelationSelectDisabled: boolean;
}

export const useSupervisorUpdateSubmitButtonLogic = ({
  formSupervisorUpdate,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isRelationSelectDisabled,
  isInputDisabled,
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
  const recordStatus = formSupervisorUpdate.watch('recordStatus');
  const isDirectRelationToPastor = formSupervisorUpdate.watch('isDirectRelationToPastor');

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
      !isDirectRelationToPastor &&
      theirCopastor &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Supervisor) &&
      Object.values(formSupervisorUpdate.formState.errors).length === 0 &&
      !isInputDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (!isDirectRelationToPastor && !theirCopastor && !isInputDisabled) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      isDirectRelationToPastor &&
      theirPastor &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Supervisor) &&
      Object.values(formSupervisorUpdate.formState.errors).length === 0 &&
      !isInputDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (isDirectRelationToPastor && !theirPastor && !isInputDisabled) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Copastor) &&
      theirPastor &&
      Object.values(formSupervisorUpdate.formState.errors).length === 0 &&
      !isRelationSelectDisabled
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
      !address ||
      !referenceAddress ||
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
    recordStatus,
  ]);
};
