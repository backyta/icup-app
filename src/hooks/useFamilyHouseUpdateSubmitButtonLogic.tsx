/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';
import { type FamilyHouseData } from '@/app/family-house/interfaces';
interface Options {
  formFamilyHouseUpdate: UseFormReturn<FamilyHouseData, any, FamilyHouseData>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useFamilyHouseUpdateSubmitButtonLogic = ({
  formFamilyHouseUpdate: formFamilyHouse,
  setIsSubmitButtonDisabled,
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
