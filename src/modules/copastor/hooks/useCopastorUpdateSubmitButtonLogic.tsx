/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type CopastorFormData } from '@/modules/copastor/interfaces';

interface Options {
  copastorUpdateForm: UseFormReturn<CopastorFormData, any, CopastorFormData>;
  memberRoles: typeof MemberRole;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isInputDisabled: boolean;
  isRelationSelectDisabled: boolean;
}

export const useCopastorUpdateSubmitButtonLogic = ({
  memberRoles,
  isInputDisabled,
  copastorUpdateForm,
  setIsSubmitButtonDisabled,
  isRelationSelectDisabled,
  setIsMessageErrorDisabled,
}: Options): void => {
  //* Watchers
  const firstName = copastorUpdateForm.watch('firstName');
  const lastName = copastorUpdateForm.watch('lastName');
  const gender = copastorUpdateForm.watch('gender');
  const birthDate = copastorUpdateForm.watch('birthDate');
  const originCountry = copastorUpdateForm.watch('originCountry');
  const maritalStatus = copastorUpdateForm.watch('maritalStatus');
  const numberChildren = copastorUpdateForm.watch('numberChildren');
  const conversionDate = copastorUpdateForm.watch('conversionDate');
  const email = copastorUpdateForm.watch('email');
  const phoneNumber = copastorUpdateForm.watch('phoneNumber');
  const country = copastorUpdateForm.watch('country');
  const department = copastorUpdateForm.watch('department');
  const province = copastorUpdateForm.watch('province');
  const district = copastorUpdateForm.watch('district');
  const urbanSector = copastorUpdateForm.watch('urbanSector');
  const address = copastorUpdateForm.watch('address');
  const referenceAddress = copastorUpdateForm.watch('referenceAddress');
  const roles = copastorUpdateForm.watch('roles');
  const recordStatus = copastorUpdateForm.watch('recordStatus');

  const theirPastor = copastorUpdateForm.watch('theirPastor');
  const theirChurch = copastorUpdateForm.watch('theirChurch');

  //* Effects
  useEffect(() => {
    if (
      copastorUpdateForm.formState.errors &&
      Object.values(copastorUpdateForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      roles.includes(memberRoles.Copastor) &&
      theirPastor &&
      Object.values(copastorUpdateForm.formState.errors).length === 0 &&
      !isInputDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (roles.includes(memberRoles.Copastor) && !theirPastor) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (roles.includes(memberRoles.Pastor) && !theirChurch) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      roles.includes(memberRoles.Pastor) &&
      theirChurch &&
      Object.values(copastorUpdateForm.formState.errors).length === 0 &&
      !isRelationSelectDisabled
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
      roles.length === 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
  }, [
    copastorUpdateForm.formState,
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
    theirChurch,
    roles,
    recordStatus,
  ]);
};
