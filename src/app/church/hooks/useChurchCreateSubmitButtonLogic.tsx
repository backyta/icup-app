/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type ChurchFormData } from '@/app/church/interfaces';

interface Options {
  formChurchCreate: UseFormReturn<ChurchFormData, any, ChurchFormData>;
  setIsSubmitButtonDisabled: (value: boolean) => void;
  setIsMessageErrorDisabled: (value: boolean) => void;
  isInputDisabled: boolean;
}

export const useChurchCreateSubmitButtonLogic = ({
  formChurchCreate,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const nameChurch = formChurchCreate.watch('churchName');
  const foundingDate = formChurchCreate.watch('foundingDate');
  const worshipTimes = formChurchCreate.watch('worshipTimes');
  const emailAddress = formChurchCreate.watch('email');
  const phoneNumber = formChurchCreate.watch('phoneNumber');
  const country = formChurchCreate.watch('country');
  const department = formChurchCreate.watch('department');
  const province = formChurchCreate.watch('province');
  const district = formChurchCreate.watch('district');
  const urbanSector = formChurchCreate.watch('urbanSector');
  const address = formChurchCreate.watch('address');
  const referenceAddress = formChurchCreate.watch('referenceAddress');
  const isAnexe = formChurchCreate.watch('isAnexe');
  const theirMainChurch = formChurchCreate.watch('theirMainChurch');

  //* Effects
  useEffect(() => {
    if (
      formChurchCreate.formState.errors &&
      Object.values(formChurchCreate.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      isAnexe &&
      theirMainChurch &&
      Object.values(formChurchCreate.formState.errors).length === 0 &&
      !isInputDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (isAnexe && !theirMainChurch) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      !isAnexe &&
      Object.values(formChurchCreate.formState.errors).length === 0 &&
      !isInputDisabled
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
      !referenceAddress
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
  }, [
    formChurchCreate.formState,
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
    referenceAddress,
    isAnexe,
    theirMainChurch,
  ]);
};
