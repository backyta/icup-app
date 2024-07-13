/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type MemberRoles } from '@/shared/enums';
import { type PreacherFormData } from '@/app/preacher/interfaces';

interface Options {
  formPreacherUpdate: UseFormReturn<PreacherFormData, any, PreacherFormData>;
  memberRoles: typeof MemberRoles;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isInputDisabled: boolean;
}

export const usePreacherUpdateSubmitButtonLogic = ({
  formPreacherUpdate,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,

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
  const status = formPreacherUpdate.watch('status');
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
      console.log('entro');
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
      address &&
      urbanSector &&
      referenceAddress &&
      roles.length !== 0 &&
      !isDirectRelationToPastor &&
      theirSupervisor &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Preacher) &&
      Object.values(formPreacherUpdate.formState.errors).length === 0 &&
      !isInputDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
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
      address &&
      urbanSector &&
      referenceAddress &&
      roles.length !== 0 &&
      theirCopastor &&
      !isDirectRelationToPastor &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Supervisor) &&
      Object.values(formPreacherUpdate.formState.errors).length === 0 &&
      !isInputDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
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
      address &&
      urbanSector &&
      referenceAddress &&
      roles.length !== 0 &&
      theirPastor &&
      isDirectRelationToPastor &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Supervisor) &&
      Object.values(formPreacherUpdate.formState.errors).length === 0 &&
      !isInputDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
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
      address &&
      urbanSector &&
      referenceAddress &&
      roles.length !== 0 &&
      !isDirectRelationToPastor &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Preacher) &&
      !theirSupervisor &&
      Object.values(formPreacherUpdate.formState.errors).length === 0 &&
      !isInputDisabled
    ) {
      console.log('entro2');
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
      address &&
      urbanSector &&
      referenceAddress &&
      roles.length !== 0 &&
      !isDirectRelationToPastor &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Supervisor) &&
      !theirCopastor &&
      Object.values(formPreacherUpdate.formState.errors).length === 0 &&
      !isInputDisabled
    ) {
      console.log('entro3');
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
      address &&
      urbanSector &&
      referenceAddress &&
      roles.length !== 0 &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Supervisor) &&
      theirCopastor &&
      Object.values(formPreacherUpdate.formState.errors).length === 0 &&
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
    status,
  ]);
};
