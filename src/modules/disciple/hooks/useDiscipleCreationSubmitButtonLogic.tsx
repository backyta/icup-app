/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type DiscipleFormData } from '@/modules/disciple/interfaces';

interface Options {
  discipleCreationForm: UseFormReturn<DiscipleFormData, any, DiscipleFormData>;
  memberRoles: typeof MemberRole;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isMessageErrorDisabled: boolean;
  isInputDisabled: boolean;
}

export const useDiscipleCreationSubmitButtonLogic = ({
  discipleCreationForm,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const firstName = discipleCreationForm.watch('firstName');
  const lastName = discipleCreationForm.watch('lastName');
  const gender = discipleCreationForm.watch('gender');
  const birthDate = discipleCreationForm.watch('birthDate');
  const conversionDate = discipleCreationForm.watch('conversionDate');
  const maritalStatus = discipleCreationForm.watch('maritalStatus');
  const email = discipleCreationForm.watch('email');
  const phoneNumber = discipleCreationForm.watch('phoneNumber');
  const originCountry = discipleCreationForm.watch('originCountry');
  const numberChildren = discipleCreationForm.watch('numberChildren');
  const country = discipleCreationForm.watch('country');
  const department = discipleCreationForm.watch('department');
  const province = discipleCreationForm.watch('province');
  const district = discipleCreationForm.watch('district');
  const urbanSector = discipleCreationForm.watch('urbanSector');
  const address = discipleCreationForm.watch('address');
  const roles = discipleCreationForm.watch('roles');
  const referenceAddress = discipleCreationForm.watch('referenceAddress');
  const theirFamilyGroup = discipleCreationForm.watch('theirFamilyGroup');

  //* Effects
  useEffect(() => {
    if (
      discipleCreationForm.formState.errors &&
      Object.values(discipleCreationForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      theirFamilyGroup &&
      roles.includes(memberRoles.Disciple) &&
      Object.values(discipleCreationForm.formState.errors).length === 0 &&
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
    discipleCreationForm.formState,
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
    discipleCreationForm.setValue('roles', [memberRoles.Disciple]);
  }, [isMessageErrorDisabled]);
};
