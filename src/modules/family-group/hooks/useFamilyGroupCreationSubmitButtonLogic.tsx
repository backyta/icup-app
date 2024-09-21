/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';
import { type FamilyGroupFormData } from '@/modules/family-group/interfaces';

interface Options {
  familyGroupCreationForm: UseFormReturn<FamilyGroupFormData, any, FamilyGroupFormData>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isInputDisabled: boolean;
}

export const useFamilyGroupCreationSubmitButtonLogic = ({
  familyGroupCreationForm,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const familyGroupName = familyGroupCreationForm.watch('familyGroupName');
  const country = familyGroupCreationForm.watch('country');
  const department = familyGroupCreationForm.watch('department');
  const province = familyGroupCreationForm.watch('province');
  const district = familyGroupCreationForm.watch('district');
  const urbanSector = familyGroupCreationForm.watch('urbanSector');
  const address = familyGroupCreationForm.watch('address');
  const worshipTime = familyGroupCreationForm.watch('worshipTime');
  const theirPreacher = familyGroupCreationForm.watch('theirPreacher');
  const theirZone = familyGroupCreationForm.watch('theirZone');

  //* Effects
  useEffect(() => {
    if (
      familyGroupCreationForm.formState.errors &&
      Object.values(familyGroupCreationForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
    if (
      theirZone &&
      theirPreacher &&
      Object.values(familyGroupCreationForm.formState.errors).length === 0 &&
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
      !urbanSector ||
      !theirPreacher ||
      !theirZone
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
  }, [
    familyGroupCreationForm.formState,
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
