/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type CopastorFormData } from '@/app/copastor/interfaces';

interface Options {
  formCopastorUpdate: UseFormReturn<CopastorFormData, any, CopastorFormData>;
  memberRoles: typeof MemberRole;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isInputDisabled: boolean;
  isRelationSelectDisabled: boolean;
}

export const useCopastorUpdateSubmitButtonLogic = ({
  formCopastorUpdate,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isInputDisabled,
  isRelationSelectDisabled,
}: Options): void => {
  //* Watchers
  const firstName = formCopastorUpdate.watch('firstName');
  const lastName = formCopastorUpdate.watch('lastName');
  const gender = formCopastorUpdate.watch('gender');
  const birthDate = formCopastorUpdate.watch('birthDate');
  const originCountry = formCopastorUpdate.watch('originCountry');
  const maritalStatus = formCopastorUpdate.watch('maritalStatus');
  const numberChildren = formCopastorUpdate.watch('numberChildren');
  const conversionDate = formCopastorUpdate.watch('conversionDate');
  const email = formCopastorUpdate.watch('email');
  const phoneNumber = formCopastorUpdate.watch('phoneNumber');
  const country = formCopastorUpdate.watch('country');
  const department = formCopastorUpdate.watch('department');
  const province = formCopastorUpdate.watch('province');
  const district = formCopastorUpdate.watch('district');
  const urbanSector = formCopastorUpdate.watch('urbanSector');
  const address = formCopastorUpdate.watch('address');
  const referenceAddress = formCopastorUpdate.watch('referenceAddress');
  const roles = formCopastorUpdate.watch('roles');
  const status = formCopastorUpdate.watch('status');

  const theirPastor = formCopastorUpdate.watch('theirPastor');
  const theirChurch = formCopastorUpdate.watch('theirChurch');

  //* Effects
  useEffect(() => {
    if (
      formCopastorUpdate.formState.errors &&
      Object.values(formCopastorUpdate.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Copastor) &&
      theirPastor &&
      Object.values(formCopastorUpdate.formState.errors).length === 0 &&
      !isInputDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Copastor) &&
      !theirPastor
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Pastor) &&
      !theirChurch
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Pastor) &&
      theirChurch &&
      Object.values(formCopastorUpdate.formState.errors).length === 0 &&
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
    formCopastorUpdate.formState,
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
    status,
  ]);
};
