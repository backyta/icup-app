/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';
import { type ChurchData } from '@/app/church/interfaces';

interface Options {
  formChurchCreate: UseFormReturn<ChurchData, any, ChurchData>;
  setIsSubmitButtonDisabled: (value: boolean) => void;
  setIsMessageErrorDisabled: (value: boolean) => void;
}

export const useChurchCreateSubmitButtonLogic = ({
  formChurchCreate,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
}: Options): void => {
  // watchers
  const nameChurch = formChurchCreate.watch('nameChurch');
  const foundingDate = formChurchCreate.watch('foundingDate');
  const worshipTimes = formChurchCreate.watch('worshipTimes');
  const emailAddress = formChurchCreate.watch('emailAddress');
  const phoneNumber = formChurchCreate.watch('phoneNumber');
  const country = formChurchCreate.watch('country');
  const department = formChurchCreate.watch('department');
  const province = formChurchCreate.watch('province');
  const district = formChurchCreate.watch('district');
  const urbanSector = formChurchCreate.watch('urbanSector');
  const address = formChurchCreate.watch('address');
  const addressReference = formChurchCreate.watch('addressReference');
  const isAnexe = formChurchCreate.watch('isAnexe');
  const theirMainChurch = formChurchCreate.watch('theirMainChurch');

  // effects
  useEffect(() => {
    if (
      formChurchCreate.formState.errors &&
      Object.values(formChurchCreate.formState.errors).length > 0
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
      Object.values(formChurchCreate.formState.errors).length === 0
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
      Object.values(formChurchCreate.formState.errors).length === 0
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
