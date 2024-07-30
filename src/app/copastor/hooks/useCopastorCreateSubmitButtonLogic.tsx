/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type CopastorFormData } from '@/app/copastor/interfaces';

interface Options {
  copastorCreateForm: UseFormReturn<CopastorFormData, any, CopastorFormData>;
  memberRoles: typeof MemberRole;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isMessageErrorDisabled: boolean;
  isInputDisabled: boolean;
}

export const useCopastorCreateSubmitButtonLogic = ({
  copastorCreateForm,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const firstName = copastorCreateForm.watch('firstName');
  const lastName = copastorCreateForm.watch('lastName');
  const gender = copastorCreateForm.watch('gender');
  const birthDate = copastorCreateForm.watch('birthDate');
  const conversionDate = copastorCreateForm.watch('conversionDate');
  const maritalStatus = copastorCreateForm.watch('maritalStatus');
  const email = copastorCreateForm.watch('email');
  const phoneNumber = copastorCreateForm.watch('phoneNumber');
  const originCountry = copastorCreateForm.watch('originCountry');
  const numberChildren = copastorCreateForm.watch('numberChildren');
  const country = copastorCreateForm.watch('country');
  const department = copastorCreateForm.watch('department');
  const province = copastorCreateForm.watch('province');
  const district = copastorCreateForm.watch('district');
  const urbanSector = copastorCreateForm.watch('urbanSector');
  const address = copastorCreateForm.watch('address');
  const roles = copastorCreateForm.watch('roles');
  const referenceAddress = copastorCreateForm.watch('referenceAddress');
  const theirPastor = copastorCreateForm.watch('theirPastor');

  //* Effects
  useEffect(() => {
    if (
      copastorCreateForm.formState.errors &&
      Object.values(copastorCreateForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      theirPastor &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Copastor) &&
      Object.values(copastorCreateForm.formState.errors).length === 0 &&
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
    copastorCreateForm.formState,
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
    copastorCreateForm.setValue('roles', [memberRoles.Disciple, memberRoles.Copastor]);
  }, [isMessageErrorDisabled]);
};
