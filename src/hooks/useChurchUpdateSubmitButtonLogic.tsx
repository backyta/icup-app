/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';
import { type ChurchFormData } from '@/app/church/interfaces';

interface Options {
  formChurchUpdate: UseFormReturn<ChurchFormData, any, ChurchFormData>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useChurchUpdateSubmitButtonLogic = ({
  formChurchUpdate,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
}: Options): void => {
  // watchers
  const nameChurch = formChurchUpdate.watch('churchName');
  const foundingDate = formChurchUpdate.watch('foundingDate');
  const worshipTimes = formChurchUpdate.watch('worshipTimes');
  const email = formChurchUpdate.watch('email');
  const phoneNumber = formChurchUpdate.watch('phoneNumber');
  const country = formChurchUpdate.watch('country');
  const department = formChurchUpdate.watch('department');
  const province = formChurchUpdate.watch('province');
  const district = formChurchUpdate.watch('district');
  const urbanSector = formChurchUpdate.watch('urbanSector');
  const address = formChurchUpdate.watch('address');
  const referenceAddress = formChurchUpdate.watch('referenceAddress');
  const isAnexe = formChurchUpdate.watch('isAnexe');
  const theirMainChurch = formChurchUpdate.watch('theirMainChurch');
  // effects
  useEffect(() => {
    if (
      formChurchUpdate.formState.errors &&
      Object.values(formChurchUpdate.formState.errors).length > 0
    ) {
      console.log('xd1');
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      nameChurch &&
      foundingDate &&
      worshipTimes &&
      email &&
      phoneNumber &&
      country &&
      department &&
      province &&
      district &&
      urbanSector &&
      address &&
      referenceAddress &&
      isAnexe &&
      theirMainChurch &&
      Object.values(formChurchUpdate.formState.errors).length === 0
    ) {
      console.log('xd2');
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      nameChurch &&
      foundingDate &&
      worshipTimes &&
      email &&
      phoneNumber &&
      country &&
      department &&
      province &&
      district &&
      urbanSector &&
      address &&
      referenceAddress &&
      !isAnexe &&
      Object.values(formChurchUpdate.formState.errors).length === 0
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      !nameChurch ||
      !foundingDate ||
      !worshipTimes ||
      !email ||
      !phoneNumber ||
      !country ||
      !department ||
      !province ||
      !district ||
      !urbanSector ||
      !address ||
      !referenceAddress
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
  }, [
    nameChurch,
    foundingDate,
    worshipTimes,
    email,
    phoneNumber,
    country,
    department,
    province,
    district,
    urbanSector,
    address,
    referenceAddress,
    isAnexe,
    theirMainChurch,
  ]);
};
