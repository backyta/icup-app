/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';
import { type FamilyHouseData } from '@/app/family-house/interfaces';

interface Options {
  formFamilyHouseCreate: UseFormReturn<FamilyHouseData, any, FamilyHouseData>;
  setIsSubmitButtonDisabled: (value: boolean) => void;
  setIsInputPreacherDisabled: (value: boolean) => void;
  setIsInputDisabled: (value: boolean) => void;
  setIsMessageErrorDisabled: (value: boolean) => void;
  isInputDisabled: boolean;
}

export const useFamilyHouseCreateSubmitButtonLogic = ({
  formFamilyHouseCreate,
  setIsSubmitButtonDisabled,
  setIsInputPreacherDisabled,
  setIsInputDisabled,
  setIsMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  // watchers
  const zoneName = formFamilyHouseCreate.watch('zoneName');
  const houseName = formFamilyHouseCreate.watch('houseName');
  const country = formFamilyHouseCreate.watch('country');
  const department = formFamilyHouseCreate.watch('department');
  const province = formFamilyHouseCreate.watch('province');
  const district = formFamilyHouseCreate.watch('district');
  const urbanSector = formFamilyHouseCreate.watch('urbanSector');
  const address = formFamilyHouseCreate.watch('address');
  const worshipTime = formFamilyHouseCreate.watch('worshipTime');
  const theirPreacher = formFamilyHouseCreate.watch('theirPreacher');

  // effects
  useEffect(() => {
    if (formFamilyHouseCreate.getValues('zoneName')) {
      setIsInputPreacherDisabled(false);
    }
  }, [zoneName]);

  useEffect(() => {
    if (formFamilyHouseCreate.getValues('theirPreacher')) {
      setIsInputDisabled(false);
    }
  }, [theirPreacher]);

  useEffect(() => {
    if (
      formFamilyHouseCreate.formState.errors &&
      Object.values(formFamilyHouseCreate.formState.errors).length > 0
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
      urbanSector &&
      address &&
      worshipTime &&
      theirPreacher &&
      Object.values(formFamilyHouseCreate.formState.errors).length === 0 &&
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
      !worshipTime ||
      !address ||
      !urbanSector ||
      !theirPreacher
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
  }, [
    formFamilyHouseCreate.formState,
    zoneName,
    houseName,
    country,
    department,
    province,
    district,
    address,
    urbanSector,
    theirPreacher,
    worshipTime,
  ]);
};
