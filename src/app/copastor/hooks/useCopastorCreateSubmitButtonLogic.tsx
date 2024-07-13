/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type MemberRoles } from '@/shared/enums';

import { type CopastorFormData } from '@/app/copastor/interfaces';

interface Options {
  formCopastorCrate: UseFormReturn<CopastorFormData, any, CopastorFormData>;
  memberRoles: typeof MemberRoles;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isMessageErrorDisabled: boolean;
  isInputDisabled: boolean;
}

export const useCopastorCreateSubmitButtonLogic = ({
  formCopastorCrate,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const firstName = formCopastorCrate.watch('firstName');
  const lastName = formCopastorCrate.watch('lastName');
  const gender = formCopastorCrate.watch('gender');
  const birthDate = formCopastorCrate.watch('birthDate');
  const conversionDate = formCopastorCrate.watch('conversionDate');
  const maritalStatus = formCopastorCrate.watch('maritalStatus');
  const email = formCopastorCrate.watch('email');
  const phoneNumber = formCopastorCrate.watch('phoneNumber');
  const originCountry = formCopastorCrate.watch('originCountry');
  const numberChildren = formCopastorCrate.watch('numberChildren');
  const country = formCopastorCrate.watch('country');
  const department = formCopastorCrate.watch('department');
  const province = formCopastorCrate.watch('province');
  const district = formCopastorCrate.watch('district');
  const urbanSector = formCopastorCrate.watch('urbanSector');
  const address = formCopastorCrate.watch('address');
  const roles = formCopastorCrate.watch('roles');
  const referenceAddress = formCopastorCrate.watch('referenceAddress');
  const theirPastor = formCopastorCrate.watch('theirPastor');

  //* Effects
  useEffect(() => {
    if (
      formCopastorCrate.formState.errors &&
      Object.values(formCopastorCrate.formState.errors).length > 0
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
      theirPastor &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Copastor) &&
      Object.values(formCopastorCrate.formState.errors).length === 0 &&
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
      roles.length === 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
  }, [
    formCopastorCrate.formState,
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
    formCopastorCrate.setValue('roles', [memberRoles.Disciple, memberRoles.Copastor]);
  }, [isMessageErrorDisabled]);
};
