/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type PreacherFormData } from '@/app/preacher/interfaces';

interface Options {
  formPreacherUpdate: UseFormReturn<PreacherFormData, any, PreacherFormData>;
  memberRoles: typeof MemberRole;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isInputDisabled: boolean;
  isRelationSelectDisabled: boolean;
}

export const usePreacherUpdateSubmitButtonLogic = ({
  formPreacherUpdate,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isRelationSelectDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const firstName = formPreacherUpdate.watch('firstName');
  const lastName = formPreacherUpdate.watch('lastName');
  const gender = formPreacherUpdate.watch('gender');
  const birthDate = formPreacherUpdate.watch('birthDate');
  const originCountry = formPreacherUpdate.watch('originCountry');
  const maritalStatus = formPreacherUpdate.watch('maritalStatus');
  const numberChildren = formPreacherUpdate.watch('numberChildren');
  const conversionDate = formPreacherUpdate.watch('conversionDate');
  const email = formPreacherUpdate.watch('email');
  const phoneNumber = formPreacherUpdate.watch('phoneNumber');
  const country = formPreacherUpdate.watch('country');
  const department = formPreacherUpdate.watch('department');
  const province = formPreacherUpdate.watch('province');
  const district = formPreacherUpdate.watch('district');
  const urbanSector = formPreacherUpdate.watch('urbanSector');
  const address = formPreacherUpdate.watch('address');
  const referenceAddress = formPreacherUpdate.watch('referenceAddress');
  const roles = formPreacherUpdate.watch('roles');
  const recordStatus = formPreacherUpdate.watch('recordStatus');
  const isDirectRelationToPastor = formPreacherUpdate.watch('isDirectRelationToPastor');

  const theirSupervisor = formPreacherUpdate.watch('theirSupervisor');
  const theirCopastor = formPreacherUpdate.watch('theirCopastor');
  const theirPastor = formPreacherUpdate.watch('theirPastor');

  //* Effects
  useEffect(() => {
    if (
      formPreacherUpdate.formState.errors &&
      Object.values(formPreacherUpdate.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Preacher) &&
      theirSupervisor &&
      Object.values(formPreacherUpdate.formState.errors).length === 0 &&
      !isInputDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      !isDirectRelationToPastor &&
      theirCopastor &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Supervisor) &&
      Object.values(formPreacherUpdate.formState.errors).length === 0 &&
      !isRelationSelectDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      !isDirectRelationToPastor &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Supervisor) &&
      !theirCopastor
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      isDirectRelationToPastor &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Supervisor) &&
      theirPastor &&
      Object.values(formPreacherUpdate.formState.errors).length === 0 &&
      !isRelationSelectDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      isDirectRelationToPastor &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Supervisor) &&
      !theirPastor
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
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
    formPreacherUpdate.formState,
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
    theirSupervisor,
    theirCopastor,
    theirPastor,
    isDirectRelationToPastor,
    roles,
    recordStatus,
  ]);
};
