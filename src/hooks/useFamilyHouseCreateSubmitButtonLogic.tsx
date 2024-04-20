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
}

export const useFamilyHouseCreateSubmitButtonLogic = ({
  formFamilyHouseCreate: formFamilyHouse,
  setIsSubmitButtonDisabled,
  setIsInputPreacherDisabled,
  setIsInputDisabled,
  setIsMessageErrorDisabled,
}: Options): void => {
  // watchers
  const zoneName = formFamilyHouse.watch('zoneName');
  const houseName = formFamilyHouse.watch('houseName');
  const country = formFamilyHouse.watch('country');
  const department = formFamilyHouse.watch('department');
  const province = formFamilyHouse.watch('province');
  const district = formFamilyHouse.watch('district');
  const address = formFamilyHouse.watch('address');
  const theirPreacher = formFamilyHouse.watch('theirPreacher');

  // effects
  useEffect(() => {
    if (formFamilyHouse.getValues('zoneName')) {
      setIsInputPreacherDisabled(false);
    }
  }, [zoneName]);

  useEffect(() => {
    if (formFamilyHouse.getValues('theirPreacher')) {
      setIsInputDisabled(false);
    }
  }, [theirPreacher]);

  useEffect(() => {
    if (
      zoneName &&
      houseName &&
      country &&
      department &&
      province &&
      district &&
      address &&
      theirPreacher
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
  }, [zoneName, houseName, country, department, province, district, address, theirPreacher]);
};
