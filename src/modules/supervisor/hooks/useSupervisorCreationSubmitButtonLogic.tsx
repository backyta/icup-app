/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type SupervisorFormData } from '@/modules/supervisor/interfaces';

interface Options {
  supervisorCreationForm: UseFormReturn<SupervisorFormData, any, SupervisorFormData>;
  memberRoles: typeof MemberRole;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isMessageErrorDisabled: boolean;
  isInputDisabled: boolean;
}

export const useSupervisorCreationSubmitButtonLogic = ({
  supervisorCreationForm,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const firstName = supervisorCreationForm.watch('firstName');
  const lastName = supervisorCreationForm.watch('lastName');
  const gender = supervisorCreationForm.watch('gender');
  const birthDate = supervisorCreationForm.watch('birthDate');
  const conversionDate = supervisorCreationForm.watch('conversionDate');
  const maritalStatus = supervisorCreationForm.watch('maritalStatus');
  const email = supervisorCreationForm.watch('email');
  const phoneNumber = supervisorCreationForm.watch('phoneNumber');
  const originCountry = supervisorCreationForm.watch('originCountry');
  const numberChildren = supervisorCreationForm.watch('numberChildren');
  const country = supervisorCreationForm.watch('country');
  const department = supervisorCreationForm.watch('department');
  const province = supervisorCreationForm.watch('province');
  const district = supervisorCreationForm.watch('district');
  const urbanSector = supervisorCreationForm.watch('urbanSector');
  const address = supervisorCreationForm.watch('address');
  const roles = supervisorCreationForm.watch('roles');
  const isDirectRelationToPastor = supervisorCreationForm.watch('isDirectRelationToPastor');
  const referenceAddress = supervisorCreationForm.watch('referenceAddress');
  const theirCopastor = supervisorCreationForm.watch('theirCopastor');
  const theirPastor = supervisorCreationForm.watch('theirPastor');

  //* Effects
  useEffect(() => {
    if (
      supervisorCreationForm.formState.errors &&
      Object.values(supervisorCreationForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      isDirectRelationToPastor &&
      theirPastor &&
      roles.includes(memberRoles.Supervisor) &&
      Object.values(supervisorCreationForm.formState.errors).length === 0 &&
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
      roles.includes(memberRoles.Supervisor) &&
      Object.values(supervisorCreationForm.formState.errors).length === 0 &&
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
    supervisorCreationForm.formState,
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
    supervisorCreationForm.setValue('roles', [memberRoles.Supervisor]);
  }, []);
};
