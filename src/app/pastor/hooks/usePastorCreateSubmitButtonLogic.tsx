/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type MemberRoles } from '@/shared/enums';
import { type PastorFormData } from '@/app/pastor/interfaces';

interface Options {
  formPastorCrate: UseFormReturn<PastorFormData, any, PastorFormData>;
  memberRoles: typeof MemberRoles;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isMessageErrorDisabled: boolean;
}

export const usePastorCreateSubmitButtonLogic = ({
  formPastorCrate,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isMessageErrorDisabled,
}: Options): void => {
  //* Watchers
  const firstName = formPastorCrate.watch('firstName');
  const lastName = formPastorCrate.watch('lastName');
  const gender = formPastorCrate.watch('gender');
  const birthDate = formPastorCrate.watch('birthDate');
  const conversionDate = formPastorCrate.watch('conversionDate');
  const maritalStatus = formPastorCrate.watch('maritalStatus');
  const email = formPastorCrate.watch('email');
  const phoneNumber = formPastorCrate.watch('phoneNumber');
  const originCountry = formPastorCrate.watch('originCountry');
  const numberChildren = formPastorCrate.watch('numberChildren');
  const country = formPastorCrate.watch('country');
  const department = formPastorCrate.watch('department');
  const province = formPastorCrate.watch('province');
  const district = formPastorCrate.watch('district');
  const urbanSector = formPastorCrate.watch('urbanSector');
  const address = formPastorCrate.watch('address');
  const roles = formPastorCrate.watch('roles');
  const referenceAddress = formPastorCrate.watch('referenceAddress');
  const theirChurch = formPastorCrate.watch('theirChurch');

  //* Effects
  useEffect(() => {
    if (
      formPastorCrate.formState.errors &&
      Object.values(formPastorCrate.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      firstName &&
      lastName &&
      gender &&
      birthDate &&
      conversionDate &&
      maritalStatus &&
      email &&
      phoneNumber &&
      originCountry &&
      numberChildren &&
      country &&
      department &&
      province &&
      district &&
      urbanSector &&
      address &&
      referenceAddress &&
      theirChurch &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Pastor) &&
      Object.values(formPastorCrate.formState.errors).length === 0
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
      (referenceAddress && roles.length === 0)
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
  }, [
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
    formPastorCrate.setValue('roles', [memberRoles.Disciple, memberRoles.Pastor]);
  }, [isMessageErrorDisabled]);
};
