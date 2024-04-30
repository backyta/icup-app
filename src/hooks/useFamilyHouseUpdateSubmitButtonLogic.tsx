/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';
import { type FamilyHouseData } from '@/app/family-house/interfaces';
interface Options {
  formFamilyHouseUpdate: UseFormReturn<FamilyHouseData, any, FamilyHouseData>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isInputDisabled: boolean;
}

export const useFamilyHouseUpdateSubmitButtonLogic = ({
  formFamilyHouseUpdate,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  // watchers
  const zoneName = formFamilyHouseUpdate.watch('zoneName');
  const houseName = formFamilyHouseUpdate.watch('houseName');
  const country = formFamilyHouseUpdate.watch('country');
  const department = formFamilyHouseUpdate.watch('department');
  const province = formFamilyHouseUpdate.watch('province');
  const district = formFamilyHouseUpdate.watch('district');
  const address = formFamilyHouseUpdate.watch('address');
  const theirPreacher = formFamilyHouseUpdate.watch('theirPreacher');

  // effects
  useEffect(() => {
    if (
      formFamilyHouseUpdate.formState.errors &&
      Object.values(formFamilyHouseUpdate.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      zoneName &&
      houseName &&
      country &&
      department &&
      province &&
      district &&
      address &&
      theirPreacher &&
      Object.values(formFamilyHouseUpdate.formState.errors).length === 0 &&
      !isInputDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      !zoneName ||
      !houseName ||
      !country ||
      !department ||
      !province ||
      !district ||
      !address ||
      !theirPreacher
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
  }, [
    formFamilyHouseUpdate.formState,
    zoneName,
    houseName,
    country,
    department,
    province,
    district,
    address,
    theirPreacher,
  ]);
};
