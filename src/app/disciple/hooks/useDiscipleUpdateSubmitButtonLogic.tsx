/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type DiscipleFormData } from '@/app/disciple/interfaces';

interface Options {
  formDiscipleUpdate: UseFormReturn<DiscipleFormData, any, DiscipleFormData>;
  memberRoles: typeof MemberRole;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isInputDisabled: boolean;
  isRelationSelectDisabled: boolean;
}

export const useDiscipleUpdateSubmitButtonLogic = ({
  formDiscipleUpdate,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isInputDisabled,
  isRelationSelectDisabled,
}: Options): void => {
  //* Watchers
  const firstName = formDiscipleUpdate.watch('firstName');
  const lastName = formDiscipleUpdate.watch('lastName');
  const gender = formDiscipleUpdate.watch('gender');
  const birthDate = formDiscipleUpdate.watch('birthDate');
  const originCountry = formDiscipleUpdate.watch('originCountry');
  const maritalStatus = formDiscipleUpdate.watch('maritalStatus');
  const numberChildren = formDiscipleUpdate.watch('numberChildren');
  const conversionDate = formDiscipleUpdate.watch('conversionDate');
  const email = formDiscipleUpdate.watch('email');
  const phoneNumber = formDiscipleUpdate.watch('phoneNumber');
  const country = formDiscipleUpdate.watch('country');
  const department = formDiscipleUpdate.watch('department');
  const province = formDiscipleUpdate.watch('province');
  const district = formDiscipleUpdate.watch('district');
  const urbanSector = formDiscipleUpdate.watch('urbanSector');
  const address = formDiscipleUpdate.watch('address');
  const referenceAddress = formDiscipleUpdate.watch('referenceAddress');
  const roles = formDiscipleUpdate.watch('roles');
  const recordStatus = formDiscipleUpdate.watch('recordStatus');
  const theirFamilyGroup = formDiscipleUpdate.watch('theirFamilyGroup');
  const theirSupervisor = formDiscipleUpdate.watch('theirSupervisor');

  //* Effects
  useEffect(() => {
    if (
      formDiscipleUpdate.formState.errors &&
      Object.values(formDiscipleUpdate.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      roles.includes(memberRoles.Disciple) &&
      !roles.includes(memberRoles.Preacher) &&
      theirFamilyGroup &&
      Object.values(formDiscipleUpdate.formState.errors).length === 0 &&
      !isInputDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      roles.includes(memberRoles.Disciple) &&
      !roles.includes(memberRoles.Preacher) &&
      !theirFamilyGroup
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Preacher) &&
      !theirSupervisor
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Preacher) &&
      theirSupervisor &&
      Object.values(formDiscipleUpdate.formState.errors).length === 0 &&
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
    formDiscipleUpdate.formState,
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
    theirSupervisor,
    roles,
    recordStatus,
  ]);
};
