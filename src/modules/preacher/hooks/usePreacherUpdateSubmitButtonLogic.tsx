/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type PreacherFormData } from '@/modules/preacher/interfaces';

interface Options {
  preacherUpdateForm: UseFormReturn<PreacherFormData, any, PreacherFormData>;
  memberRoles: typeof MemberRole;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isInputDisabled: boolean;
  isRelationSelectDisabled: boolean;
}

export const usePreacherUpdateSubmitButtonLogic = ({
  preacherUpdateForm,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isRelationSelectDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const firstName = preacherUpdateForm.watch('firstName');
  const lastName = preacherUpdateForm.watch('lastName');
  const gender = preacherUpdateForm.watch('gender');
  const birthDate = preacherUpdateForm.watch('birthDate');
  const originCountry = preacherUpdateForm.watch('originCountry');
  const maritalStatus = preacherUpdateForm.watch('maritalStatus');
  const numberChildren = preacherUpdateForm.watch('numberChildren');
  const conversionDate = preacherUpdateForm.watch('conversionDate');
  const email = preacherUpdateForm.watch('email');
  const phoneNumber = preacherUpdateForm.watch('phoneNumber');
  const country = preacherUpdateForm.watch('country');
  const department = preacherUpdateForm.watch('department');
  const province = preacherUpdateForm.watch('province');
  const district = preacherUpdateForm.watch('district');
  const urbanSector = preacherUpdateForm.watch('urbanSector');
  const address = preacherUpdateForm.watch('address');
  const referenceAddress = preacherUpdateForm.watch('referenceAddress');
  const roles = preacherUpdateForm.watch('roles');
  const recordStatus = preacherUpdateForm.watch('recordStatus');
  const isDirectRelationToPastor = preacherUpdateForm.watch('isDirectRelationToPastor');

  const theirSupervisor = preacherUpdateForm.watch('theirSupervisor');
  const theirCopastor = preacherUpdateForm.watch('theirCopastor');
  const theirPastor = preacherUpdateForm.watch('theirPastor');

  //* Effects
  useEffect(() => {
    if (
      preacherUpdateForm.formState.errors &&
      Object.values(preacherUpdateForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      roles.includes(memberRoles.Preacher) &&
      theirSupervisor &&
      Object.values(preacherUpdateForm.formState.errors).length === 0 &&
      !isInputDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      !isDirectRelationToPastor &&
      theirCopastor &&
      roles.includes(memberRoles.Supervisor) &&
      Object.values(preacherUpdateForm.formState.errors).length === 0 &&
      !isRelationSelectDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (!isDirectRelationToPastor && roles.includes(memberRoles.Supervisor) && !theirCopastor) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      isDirectRelationToPastor &&
      roles.includes(memberRoles.Supervisor) &&
      theirPastor &&
      Object.values(preacherUpdateForm.formState.errors).length === 0 &&
      !isRelationSelectDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (isDirectRelationToPastor && roles.includes(memberRoles.Supervisor) && !theirPastor) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
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
    preacherUpdateForm.formState,
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
    theirSupervisor,
    theirCopastor,
    theirPastor,
    isDirectRelationToPastor,
    roles,
    recordStatus,
  ]);
};
