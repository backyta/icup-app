/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type DiscipleFormData } from '@/app/disciple/interfaces';

interface Options {
  formDiscipleCreate: UseFormReturn<DiscipleFormData, any, DiscipleFormData>;
  memberRoles: typeof MemberRole;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isMessageErrorDisabled: boolean;
  isInputDisabled: boolean;
}

export const useDiscipleCreateSubmitButtonLogic = ({
  formDiscipleCreate,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const firstName = formDiscipleCreate.watch('firstName');
  const lastName = formDiscipleCreate.watch('lastName');
  const gender = formDiscipleCreate.watch('gender');
  const birthDate = formDiscipleCreate.watch('birthDate');
  const conversionDate = formDiscipleCreate.watch('conversionDate');
  const maritalStatus = formDiscipleCreate.watch('maritalStatus');
  const email = formDiscipleCreate.watch('email');
  const phoneNumber = formDiscipleCreate.watch('phoneNumber');
  const originCountry = formDiscipleCreate.watch('originCountry');
  const numberChildren = formDiscipleCreate.watch('numberChildren');
  const country = formDiscipleCreate.watch('country');
  const department = formDiscipleCreate.watch('department');
  const province = formDiscipleCreate.watch('province');
  const district = formDiscipleCreate.watch('district');
  const urbanSector = formDiscipleCreate.watch('urbanSector');
  const address = formDiscipleCreate.watch('address');
  const roles = formDiscipleCreate.watch('roles');
  const referenceAddress = formDiscipleCreate.watch('referenceAddress');
  const theirFamilyGroup = formDiscipleCreate.watch('theirFamilyGroup');

  //* Effects
  useEffect(() => {
    if (
      formDiscipleCreate.formState.errors &&
      Object.values(formDiscipleCreate.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      theirFamilyGroup &&
      roles.includes(memberRoles.Disciple) &&
      Object.values(formDiscipleCreate.formState.errors).length === 0 &&
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
      !theirFamilyGroup ||
      roles.length === 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
  }, [
    formDiscipleCreate.formState,
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
    theirFamilyGroup,
    roles,
  ]);

  useEffect(() => {
    formDiscipleCreate.setValue('roles', [memberRoles.Disciple]);
  }, [isMessageErrorDisabled]);
};
