/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type PastorFormData } from '@/app/pastor/interfaces';

interface Options {
  pastorCreateForm: UseFormReturn<PastorFormData, any, PastorFormData>;
  memberRoles: typeof MemberRole;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isMessageErrorDisabled: boolean;
  isInputDisabled: boolean;
}

export const usePastorCreateSubmitButtonLogic = ({
  pastorCreateForm,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const firstName = pastorCreateForm.watch('firstName');
  const lastName = pastorCreateForm.watch('lastName');
  const gender = pastorCreateForm.watch('gender');
  const birthDate = pastorCreateForm.watch('birthDate');
  const conversionDate = pastorCreateForm.watch('conversionDate');
  const maritalStatus = pastorCreateForm.watch('maritalStatus');
  const email = pastorCreateForm.watch('email');
  const phoneNumber = pastorCreateForm.watch('phoneNumber');
  const originCountry = pastorCreateForm.watch('originCountry');
  const numberChildren = pastorCreateForm.watch('numberChildren');
  const country = pastorCreateForm.watch('country');
  const department = pastorCreateForm.watch('department');
  const province = pastorCreateForm.watch('province');
  const district = pastorCreateForm.watch('district');
  const urbanSector = pastorCreateForm.watch('urbanSector');
  const address = pastorCreateForm.watch('address');
  const roles = pastorCreateForm.watch('roles');
  const referenceAddress = pastorCreateForm.watch('referenceAddress');
  const theirChurch = pastorCreateForm.watch('theirChurch');

  //* Effects
  useEffect(() => {
    if (
      pastorCreateForm.formState.errors &&
      Object.values(pastorCreateForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      theirChurch &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Pastor) &&
      Object.values(pastorCreateForm.formState.errors).length === 0 &&
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
    pastorCreateForm.formState,
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
    pastorCreateForm.setValue('roles', [memberRoles.Disciple, memberRoles.Pastor]);
  }, [isMessageErrorDisabled]);
};
