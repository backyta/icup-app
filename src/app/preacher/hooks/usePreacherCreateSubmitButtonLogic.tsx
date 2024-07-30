/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type PreacherFormData } from '@/app/preacher/interfaces';

interface Options {
  preacherCreateForm: UseFormReturn<PreacherFormData, any, PreacherFormData>;
  memberRoles: typeof MemberRole;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isMessageErrorDisabled: boolean;
  isInputDisabled: boolean;
}

export const usePreacherCreateSubmitButtonLogic = ({
  preacherCreateForm,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const firstName = preacherCreateForm.watch('firstName');
  const lastName = preacherCreateForm.watch('lastName');
  const gender = preacherCreateForm.watch('gender');
  const birthDate = preacherCreateForm.watch('birthDate');
  const conversionDate = preacherCreateForm.watch('conversionDate');
  const maritalStatus = preacherCreateForm.watch('maritalStatus');
  const email = preacherCreateForm.watch('email');
  const phoneNumber = preacherCreateForm.watch('phoneNumber');
  const originCountry = preacherCreateForm.watch('originCountry');
  const numberChildren = preacherCreateForm.watch('numberChildren');
  const country = preacherCreateForm.watch('country');
  const department = preacherCreateForm.watch('department');
  const province = preacherCreateForm.watch('province');
  const district = preacherCreateForm.watch('district');
  const urbanSector = preacherCreateForm.watch('urbanSector');
  const address = preacherCreateForm.watch('address');
  const roles = preacherCreateForm.watch('roles');
  const referenceAddress = preacherCreateForm.watch('referenceAddress');
  const theirSupervisor = preacherCreateForm.watch('theirSupervisor');

  //* Effects
  useEffect(() => {
    if (
      preacherCreateForm.formState.errors &&
      Object.values(preacherCreateForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      theirSupervisor &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Preacher) &&
      Object.values(preacherCreateForm.formState.errors).length === 0 &&
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
    preacherCreateForm.formState,
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
    preacherCreateForm.setValue('roles', [memberRoles.Disciple, memberRoles.Preacher]);
  }, [isMessageErrorDisabled]);
};
