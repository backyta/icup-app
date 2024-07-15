/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type MemberRoles } from '@/shared/enums';
import { type PreacherFormData } from '@/app/preacher/interfaces';

interface Options {
  formPreacherCrate: UseFormReturn<PreacherFormData, any, PreacherFormData>;
  memberRoles: typeof MemberRoles;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isMessageErrorDisabled: boolean;
  isInputDisabled: boolean;
}

export const usePreacherCreateSubmitButtonLogic = ({
  formPreacherCrate,
  memberRoles,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const firstName = formPreacherCrate.watch('firstName');
  const lastName = formPreacherCrate.watch('lastName');
  const gender = formPreacherCrate.watch('gender');
  const birthDate = formPreacherCrate.watch('birthDate');
  const conversionDate = formPreacherCrate.watch('conversionDate');
  const maritalStatus = formPreacherCrate.watch('maritalStatus');
  const email = formPreacherCrate.watch('email');
  const phoneNumber = formPreacherCrate.watch('phoneNumber');
  const originCountry = formPreacherCrate.watch('originCountry');
  const numberChildren = formPreacherCrate.watch('numberChildren');
  const country = formPreacherCrate.watch('country');
  const department = formPreacherCrate.watch('department');
  const province = formPreacherCrate.watch('province');
  const district = formPreacherCrate.watch('district');
  const urbanSector = formPreacherCrate.watch('urbanSector');
  const address = formPreacherCrate.watch('address');
  const roles = formPreacherCrate.watch('roles');
  const referenceAddress = formPreacherCrate.watch('referenceAddress');
  const theirSupervisor = formPreacherCrate.watch('theirSupervisor');

  //* Effects
  useEffect(() => {
    if (
      formPreacherCrate.formState.errors &&
      Object.values(formPreacherCrate.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      theirSupervisor &&
      roles.includes(memberRoles.Disciple) &&
      roles.includes(memberRoles.Preacher) &&
      Object.values(formPreacherCrate.formState.errors).length === 0 &&
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
      !theirSupervisor ||
      roles.length === 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
  }, [
    formPreacherCrate.formState,
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
    roles,
  ]);

  useEffect(() => {
    formPreacherCrate.setValue('roles', [memberRoles.Disciple, memberRoles.Preacher]);
  }, [isMessageErrorDisabled]);
};
