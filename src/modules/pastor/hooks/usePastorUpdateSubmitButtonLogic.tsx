/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type PastorFormData } from '@/modules/pastor/interfaces';

interface Options {
  pastorUpdateForm: UseFormReturn<PastorFormData, any, PastorFormData>;
  memberRoles: typeof MemberRole;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isInputDisabled: boolean;
}

export const usePastorUpdateSubmitButtonLogic = ({
  pastorUpdateForm,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const firstName = pastorUpdateForm.watch('firstName');
  const lastName = pastorUpdateForm.watch('lastName');
  const gender = pastorUpdateForm.watch('gender');
  const birthDate = pastorUpdateForm.watch('birthDate');
  const originCountry = pastorUpdateForm.watch('originCountry');
  const maritalStatus = pastorUpdateForm.watch('maritalStatus');
  const numberChildren = pastorUpdateForm.watch('numberChildren');
  const conversionDate = pastorUpdateForm.watch('conversionDate');
  const email = pastorUpdateForm.watch('email');
  const phoneNumber = pastorUpdateForm.watch('phoneNumber');
  const country = pastorUpdateForm.watch('country');
  const department = pastorUpdateForm.watch('department');
  const province = pastorUpdateForm.watch('province');
  const district = pastorUpdateForm.watch('district');
  const urbanSector = pastorUpdateForm.watch('urbanSector');
  const address = pastorUpdateForm.watch('address');
  const referenceAddress = pastorUpdateForm.watch('referenceAddress');
  const roles = pastorUpdateForm.watch('roles');
  const recordStatus = pastorUpdateForm.watch('recordStatus');
  const theirChurch = pastorUpdateForm.watch('theirChurch');

  //* Effects
  useEffect(() => {
    if (
      pastorUpdateForm.formState.errors &&
      Object.values(pastorUpdateForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      theirChurch &&
      roles.includes(memberRoles.Pastor) &&
      Object.values(pastorUpdateForm.formState.errors).length === 0 &&
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
    pastorUpdateForm.formState,
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
    recordStatus,
  ]);
};
