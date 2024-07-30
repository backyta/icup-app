/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type SupervisorFormData } from '@/app/supervisor/interfaces';

interface Options {
  supervisorCreateForm: UseFormReturn<SupervisorFormData, any, SupervisorFormData>;
  memberRoles: typeof MemberRole;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isMessageErrorDisabled: boolean;
  isInputDisabled: boolean;
}

export const useSupervisorCreateSubmitButtonLogic = ({
  supervisorCreateForm,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const firstName = supervisorCreateForm.watch('firstName');
  const lastName = supervisorCreateForm.watch('lastName');
  const gender = supervisorCreateForm.watch('gender');
  const birthDate = supervisorCreateForm.watch('birthDate');
  const conversionDate = supervisorCreateForm.watch('conversionDate');
  const maritalStatus = supervisorCreateForm.watch('maritalStatus');
  const email = supervisorCreateForm.watch('email');
  const phoneNumber = supervisorCreateForm.watch('phoneNumber');
  const originCountry = supervisorCreateForm.watch('originCountry');
  const numberChildren = supervisorCreateForm.watch('numberChildren');
  const country = supervisorCreateForm.watch('country');
  const department = supervisorCreateForm.watch('department');
  const province = supervisorCreateForm.watch('province');
  const district = supervisorCreateForm.watch('district');
  const urbanSector = supervisorCreateForm.watch('urbanSector');
  const address = supervisorCreateForm.watch('address');
  const roles = supervisorCreateForm.watch('roles');
  const isDirectRelationToPastor = supervisorCreateForm.watch('isDirectRelationToPastor');
  const referenceAddress = supervisorCreateForm.watch('referenceAddress');
  const theirCopastor = supervisorCreateForm.watch('theirCopastor');
  const theirPastor = supervisorCreateForm.watch('theirPastor');

  //* Effects
  useEffect(() => {
    if (
      supervisorCreateForm.formState.errors &&
      Object.values(supervisorCreateForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      isDirectRelationToPastor &&
      theirPastor &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Supervisor) &&
      Object.values(supervisorCreateForm.formState.errors).length === 0 &&
      !isInputDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (isDirectRelationToPastor && !theirPastor) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      !isDirectRelationToPastor &&
      theirCopastor &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Supervisor) &&
      Object.values(supervisorCreateForm.formState.errors).length === 0 &&
      !isInputDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (!isDirectRelationToPastor && !theirCopastor) {
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
    supervisorCreateForm.formState,
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
    isDirectRelationToPastor,
    referenceAddress,
    theirCopastor,
    theirPastor,
    roles,
  ]);

  useEffect(() => {
    supervisorCreateForm.setValue('roles', [memberRoles.Disciple, memberRoles.Supervisor]);
  }, [isMessageErrorDisabled]);
};
