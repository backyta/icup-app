/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';
import { type ChurchFormData } from '@/app/church/interfaces';

interface Options {
  churchCreateForm: UseFormReturn<ChurchFormData, any, ChurchFormData>;
  setIsSubmitButtonDisabled: (value: boolean) => void;
  setIsMessageErrorDisabled: (value: boolean) => void;
  isInputDisabled: boolean;
}

export const useChurchCreateSubmitButtonLogic = ({
  churchCreateForm,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const nameChurch = churchCreateForm.watch('churchName');
  const foundingDate = churchCreateForm.watch('foundingDate');
  const worshipTimes = churchCreateForm.watch('worshipTimes');
  const emailAddress = churchCreateForm.watch('email');
  const phoneNumber = churchCreateForm.watch('phoneNumber');
  const country = churchCreateForm.watch('country');
  const department = churchCreateForm.watch('department');
  const province = churchCreateForm.watch('province');
  const district = churchCreateForm.watch('district');
  const urbanSector = churchCreateForm.watch('urbanSector');
  const address = churchCreateForm.watch('address');
  const referenceAddress = churchCreateForm.watch('referenceAddress');
  const isAnexe = churchCreateForm.watch('isAnexe');
  const theirMainChurch = churchCreateForm.watch('theirMainChurch');

  //* Effects
  useEffect(() => {
    if (
      churchCreateForm.formState.errors &&
      Object.values(churchCreateForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      isAnexe &&
      theirMainChurch &&
      Object.values(churchCreateForm.formState.errors).length === 0 &&
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
      Object.values(churchCreateForm.formState.errors).length === 0 &&
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
    churchCreateForm.formState,
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
