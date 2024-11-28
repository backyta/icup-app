/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type PreacherFormData } from '@/modules/preacher/interfaces';

interface Options {
  preacherCreationForm: UseFormReturn<PreacherFormData, any, PreacherFormData>;
  memberRoles: typeof MemberRole;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isMessageErrorDisabled: boolean;
  isInputDisabled: boolean;
}

export const usePreacherCreationSubmitButtonLogic = ({
  preacherCreationForm,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const firstName = preacherCreationForm.watch('firstName');
  const lastName = preacherCreationForm.watch('lastName');
  const gender = preacherCreationForm.watch('gender');
  const birthDate = preacherCreationForm.watch('birthDate');
  const conversionDate = preacherCreationForm.watch('conversionDate');
  const maritalStatus = preacherCreationForm.watch('maritalStatus');
  const email = preacherCreationForm.watch('email');
  const phoneNumber = preacherCreationForm.watch('phoneNumber');
  const originCountry = preacherCreationForm.watch('originCountry');
  const numberChildren = preacherCreationForm.watch('numberChildren');
  const country = preacherCreationForm.watch('country');
  const department = preacherCreationForm.watch('department');
  const province = preacherCreationForm.watch('province');
  const district = preacherCreationForm.watch('district');
  const urbanSector = preacherCreationForm.watch('urbanSector');
  const address = preacherCreationForm.watch('address');
  const roles = preacherCreationForm.watch('roles');
  const referenceAddress = preacherCreationForm.watch('referenceAddress');
  const theirSupervisor = preacherCreationForm.watch('theirSupervisor');

  //* Effects
  useEffect(() => {
    if (
      preacherCreationForm.formState.errors &&
      Object.values(preacherCreationForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      theirSupervisor &&
      roles.includes(memberRoles.Preacher) &&
      Object.values(preacherCreationForm.formState.errors).length === 0 &&
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
      !referenceAddress ||
      !theirSupervisor ||
      roles.length === 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
  }, [
    preacherCreationForm.formState,
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
    roles,
  ]);

  useEffect(() => {
    preacherCreationForm.setValue('roles', [memberRoles.Preacher]);
  }, []);
};
