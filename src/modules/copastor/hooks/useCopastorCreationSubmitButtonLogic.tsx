/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type CopastorFormData } from '@/modules/copastor/interfaces';

interface Options {
  copastorCreationForm: UseFormReturn<CopastorFormData, any, CopastorFormData>;
  memberRoles: typeof MemberRole;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isInputDisabled: boolean;
}

export const useCopastorCreationSubmitButtonLogic = ({
  copastorCreationForm,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const firstName = copastorCreationForm.watch('firstName');
  const lastName = copastorCreationForm.watch('lastName');
  const gender = copastorCreationForm.watch('gender');
  const birthDate = copastorCreationForm.watch('birthDate');
  const conversionDate = copastorCreationForm.watch('conversionDate');
  const maritalStatus = copastorCreationForm.watch('maritalStatus');
  const email = copastorCreationForm.watch('email');
  const phoneNumber = copastorCreationForm.watch('phoneNumber');
  const originCountry = copastorCreationForm.watch('originCountry');
  const numberChildren = copastorCreationForm.watch('numberChildren');
  const country = copastorCreationForm.watch('country');
  const department = copastorCreationForm.watch('department');
  const province = copastorCreationForm.watch('province');
  const district = copastorCreationForm.watch('district');
  const urbanSector = copastorCreationForm.watch('urbanSector');
  const address = copastorCreationForm.watch('address');
  const roles = copastorCreationForm.watch('roles');
  const referenceAddress = copastorCreationForm.watch('referenceAddress');
  const theirPastor = copastorCreationForm.watch('theirPastor');

  //* Effects
  useEffect(() => {
    if (
      copastorCreationForm.formState.errors &&
      Object.values(copastorCreationForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      theirPastor &&
      roles.includes(memberRoles.Copastor) &&
      Object.values(copastorCreationForm.formState.errors).length === 0 &&
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
      !theirPastor ||
      roles.length === 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
  }, [
    copastorCreationForm.formState,
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
    theirPastor,
    roles,
  ]);

  useEffect(() => {
    copastorCreationForm.setValue('roles', [memberRoles.Copastor]);
  }, []);
};
