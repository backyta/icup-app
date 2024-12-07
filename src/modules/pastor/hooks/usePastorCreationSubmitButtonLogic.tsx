/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type PastorFormData } from '@/modules/pastor/interfaces';

interface Options {
  pastorCreationForm: UseFormReturn<PastorFormData, any, PastorFormData>;
  memberRoles: typeof MemberRole;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isInputDisabled: boolean;
}

export const usePastorCreationSubmitButtonLogic = ({
  memberRoles,
  isInputDisabled,
  pastorCreationForm,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
}: Options): void => {
  //* Watchers
  const firstName = pastorCreationForm.watch('firstName');
  const lastName = pastorCreationForm.watch('lastName');
  const gender = pastorCreationForm.watch('gender');
  const birthDate = pastorCreationForm.watch('birthDate');
  const conversionDate = pastorCreationForm.watch('conversionDate');
  const maritalStatus = pastorCreationForm.watch('maritalStatus');
  const email = pastorCreationForm.watch('email');
  const phoneNumber = pastorCreationForm.watch('phoneNumber');
  const originCountry = pastorCreationForm.watch('originCountry');
  const numberChildren = pastorCreationForm.watch('numberChildren');
  const country = pastorCreationForm.watch('country');
  const department = pastorCreationForm.watch('department');
  const province = pastorCreationForm.watch('province');
  const district = pastorCreationForm.watch('district');
  const urbanSector = pastorCreationForm.watch('urbanSector');
  const address = pastorCreationForm.watch('address');
  const roles = pastorCreationForm.watch('roles');
  const referenceAddress = pastorCreationForm.watch('referenceAddress');
  const theirChurch = pastorCreationForm.watch('theirChurch');

  //* Effects
  useEffect(() => {
    if (
      pastorCreationForm.formState.errors &&
      Object.values(pastorCreationForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      theirChurch &&
      roles.includes(memberRoles.Pastor) &&
      Object.values(pastorCreationForm.formState.errors).length === 0 &&
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
      !theirChurch ||
      roles.length === 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
  }, [
    pastorCreationForm.formState,
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
    theirChurch,
    roles,
  ]);

  useEffect(() => {
    pastorCreationForm.setValue('roles', [memberRoles.Pastor]);
  }, []);
};
