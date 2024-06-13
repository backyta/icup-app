/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';
import { type ChurchData } from '@/app/church/interfaces';

interface Options {
  formChurchUpdate: UseFormReturn<ChurchData, any, ChurchData>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useChurchUpdateSubmitButtonLogic = ({
  formChurchUpdate,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
}: Options): void => {
  // watchers
  const nameChurch = formChurchUpdate.watch('nameChurch');
  const foundingDate = formChurchUpdate.watch('foundingDate');
  const worshipTimes = formChurchUpdate.watch('worshipTimes');
  const emailAddress = formChurchUpdate.watch('emailAddress');
  const phoneNumber = formChurchUpdate.watch('phoneNumber');
  const country = formChurchUpdate.watch('country');
  const department = formChurchUpdate.watch('department');
  const province = formChurchUpdate.watch('province');
  const district = formChurchUpdate.watch('district');
  const urbanSector = formChurchUpdate.watch('urbanSector');
  const address = formChurchUpdate.watch('address');
  const addressReference = formChurchUpdate.watch('addressReference');
  const isAnexe = formChurchUpdate.watch('isAnexe');
  const theirMainChurch = formChurchUpdate.watch('theirMainChurch');
  // effects
  useEffect(() => {
    if (
      formChurchUpdate.formState.errors &&
      Object.values(formChurchUpdate.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      nameChurch &&
      foundingDate &&
      worshipTimes &&
      emailAddress &&
      phoneNumber &&
      country &&
      department &&
      province &&
      district &&
      urbanSector &&
      address &&
      addressReference &&
      isAnexe &&
      theirMainChurch &&
      Object.values(formChurchUpdate.formState.errors).length === 0
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (
      nameChurch &&
      foundingDate &&
      worshipTimes &&
      emailAddress &&
      phoneNumber &&
      country &&
      department &&
      province &&
      district &&
      urbanSector &&
      address &&
      addressReference &&
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
      !emailAddress ||
      !phoneNumber ||
      !country ||
      !department ||
      !province ||
      !district ||
      !urbanSector ||
      !address ||
      !addressReference
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
  }, [
    nameChurch,
    foundingDate,
    worshipTimes,
    emailAddress,
    phoneNumber,
    country,
    department,
    province,
    district,
    urbanSector,
    address,
    addressReference,
    isAnexe,
    theirMainChurch,
  ]);
};
