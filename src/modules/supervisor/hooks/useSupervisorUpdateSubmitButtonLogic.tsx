/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type SupervisorFormData } from '@/modules/supervisor/interfaces';

interface Options {
  supervisorUpdateForm: UseFormReturn<SupervisorFormData, any, SupervisorFormData>;
  memberRoles: typeof MemberRole;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isInputDisabled: boolean;
  isRelationSelectDisabled: boolean;
}

export const useSupervisorUpdateSubmitButtonLogic = ({
  supervisorUpdateForm,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isRelationSelectDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const firstName = supervisorUpdateForm.watch('firstName');
  const lastName = supervisorUpdateForm.watch('lastName');
  const gender = supervisorUpdateForm.watch('gender');
  const birthDate = supervisorUpdateForm.watch('birthDate');
  const originCountry = supervisorUpdateForm.watch('originCountry');
  const maritalStatus = supervisorUpdateForm.watch('maritalStatus');
  const numberChildren = supervisorUpdateForm.watch('numberChildren');
  const conversionDate = supervisorUpdateForm.watch('conversionDate');
  const email = supervisorUpdateForm.watch('email');
  const phoneNumber = supervisorUpdateForm.watch('phoneNumber');
  const country = supervisorUpdateForm.watch('country');
  const department = supervisorUpdateForm.watch('department');
  const province = supervisorUpdateForm.watch('province');
  const district = supervisorUpdateForm.watch('district');
  const urbanSector = supervisorUpdateForm.watch('urbanSector');
  const address = supervisorUpdateForm.watch('address');
  const referenceAddress = supervisorUpdateForm.watch('referenceAddress');
  const roles = supervisorUpdateForm.watch('roles');
  const recordStatus = supervisorUpdateForm.watch('recordStatus');
  const isDirectRelationToPastor = supervisorUpdateForm.watch('isDirectRelationToPastor');
  const theirCopastor = supervisorUpdateForm.watch('theirCopastor');
  const theirPastor = supervisorUpdateForm.watch('theirPastor');

  //* Effects
  useEffect(() => {
    if (
      supervisorUpdateForm.formState.errors &&
      Object.values(supervisorUpdateForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      !isDirectRelationToPastor &&
      theirCopastor &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Supervisor) &&
      Object.values(supervisorUpdateForm.formState.errors).length === 0 &&
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
      Object.values(supervisorUpdateForm.formState.errors).length === 0 &&
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
      Object.values(supervisorUpdateForm.formState.errors).length === 0 &&
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
    supervisorUpdateForm.formState,
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
