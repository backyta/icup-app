/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';
import { type FamilyGroupFormData } from '@/app/family-group/interfaces';

interface Options {
  familyGroupCreateForm: UseFormReturn<FamilyGroupFormData, any, FamilyGroupFormData>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isInputDisabled: boolean;
}

export const useFamilyGroupCreateSubmitButtonLogic = ({
  familyGroupCreateForm,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const familyGroupName = familyGroupCreateForm.watch('familyGroupName');
  const country = familyGroupCreateForm.watch('country');
  const department = familyGroupCreateForm.watch('department');
  const province = familyGroupCreateForm.watch('province');
  const district = familyGroupCreateForm.watch('district');
  const urbanSector = familyGroupCreateForm.watch('urbanSector');
  const address = familyGroupCreateForm.watch('address');
  const worshipTime = familyGroupCreateForm.watch('worshipTime');
  const theirPreacher = familyGroupCreateForm.watch('theirPreacher');
  const theirZone = familyGroupCreateForm.watch('theirZone');

  //* Effects
  useEffect(() => {
    if (
      familyGroupCreateForm.formState.errors &&
      Object.values(familyGroupCreateForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
    if (
      theirZone &&
      theirPreacher &&
      Object.values(familyGroupCreateForm.formState.errors).length === 0 &&
      !isInputDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      !familyGroupName ||
      !country ||
      !department ||
      !province ||
      !district ||
      !worshipTime ||
      !address ||
      !urbanSector
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
  }, [
    familyGroupCreateForm.formState,
    familyGroupName,
    worshipTime,
    country,
    department,
    province,
    district,
    address,
    urbanSector,
    theirPreacher,
    theirZone,
  ]);
};
