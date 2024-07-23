/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type PastorFormData } from '@/app/pastor/interfaces';

interface Options {
  formPastorUpdate: UseFormReturn<PastorFormData, any, PastorFormData>;
  memberRoles: typeof MemberRole;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isInputDisabled: boolean;
}

export const usePastorUpdateSubmitButtonLogic = ({
  formPastorUpdate,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const firstName = formPastorUpdate.watch('firstName');
  const lastName = formPastorUpdate.watch('lastName');
  const gender = formPastorUpdate.watch('gender');
  const birthDate = formPastorUpdate.watch('birthDate');
  const originCountry = formPastorUpdate.watch('originCountry');
  const maritalStatus = formPastorUpdate.watch('maritalStatus');
  const numberChildren = formPastorUpdate.watch('numberChildren');
  const conversionDate = formPastorUpdate.watch('conversionDate');
  const email = formPastorUpdate.watch('email');
  const phoneNumber = formPastorUpdate.watch('phoneNumber');
  const country = formPastorUpdate.watch('country');
  const department = formPastorUpdate.watch('department');
  const province = formPastorUpdate.watch('province');
  const district = formPastorUpdate.watch('district');
  const urbanSector = formPastorUpdate.watch('urbanSector');
  const address = formPastorUpdate.watch('address');
  const referenceAddress = formPastorUpdate.watch('referenceAddress');
  const roles = formPastorUpdate.watch('roles');
  const recordStatus = formPastorUpdate.watch('recordStatus');
  const theirChurch = formPastorUpdate.watch('theirChurch');

  //* Effects
  useEffect(() => {
    if (
      formPastorUpdate.formState.errors &&
      Object.values(formPastorUpdate.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      theirChurch &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Pastor) &&
      Object.values(formPastorUpdate.formState.errors).length === 0 &&
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
    formPastorUpdate.formState,
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
