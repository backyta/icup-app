/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type DiscipleFormData } from '@/app/disciple/interfaces';

interface Options {
  discipleCreateForm: UseFormReturn<DiscipleFormData, any, DiscipleFormData>;
  memberRoles: typeof MemberRole;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isMessageErrorDisabled: boolean;
  isInputDisabled: boolean;
}

export const useDiscipleCreateSubmitButtonLogic = ({
  discipleCreateForm,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const firstName = discipleCreateForm.watch('firstName');
  const lastName = discipleCreateForm.watch('lastName');
  const gender = discipleCreateForm.watch('gender');
  const birthDate = discipleCreateForm.watch('birthDate');
  const conversionDate = discipleCreateForm.watch('conversionDate');
  const maritalStatus = discipleCreateForm.watch('maritalStatus');
  const email = discipleCreateForm.watch('email');
  const phoneNumber = discipleCreateForm.watch('phoneNumber');
  const originCountry = discipleCreateForm.watch('originCountry');
  const numberChildren = discipleCreateForm.watch('numberChildren');
  const country = discipleCreateForm.watch('country');
  const department = discipleCreateForm.watch('department');
  const province = discipleCreateForm.watch('province');
  const district = discipleCreateForm.watch('district');
  const urbanSector = discipleCreateForm.watch('urbanSector');
  const address = discipleCreateForm.watch('address');
  const roles = discipleCreateForm.watch('roles');
  const referenceAddress = discipleCreateForm.watch('referenceAddress');
  const theirFamilyGroup = discipleCreateForm.watch('theirFamilyGroup');

  //* Effects
  useEffect(() => {
    if (
      discipleCreateForm.formState.errors &&
      Object.values(discipleCreateForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      theirFamilyGroup &&
      roles.includes(memberRoles.Disciple) &&
      Object.values(discipleCreateForm.formState.errors).length === 0 &&
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
      !theirFamilyGroup ||
      roles.length === 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
  }, [
    discipleCreateForm.formState,
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
    theirFamilyGroup,
    roles,
  ]);

  useEffect(() => {
    discipleCreateForm.setValue('roles', [memberRoles.Disciple]);
  }, [isMessageErrorDisabled]);
};
