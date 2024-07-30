/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';
import { type ChurchFormData } from '@/app/church/interfaces';

interface Options {
  churchUpdateForm: UseFormReturn<ChurchFormData, any, ChurchFormData>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isInputDisabled: boolean;
}

export const useZoneUpdateSubmitButtonLogic = ({
  churchUpdateForm,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const nameChurch = churchUpdateForm.watch('churchName');
  const foundingDate = churchUpdateForm.watch('foundingDate');
  const worshipTimes = churchUpdateForm.watch('worshipTimes');
  const email = churchUpdateForm.watch('email');
  const phoneNumber = churchUpdateForm.watch('phoneNumber');
  const country = churchUpdateForm.watch('country');
  const department = churchUpdateForm.watch('department');
  const province = churchUpdateForm.watch('province');
  const district = churchUpdateForm.watch('district');
  const urbanSector = churchUpdateForm.watch('urbanSector');
  const address = churchUpdateForm.watch('address');
  const referenceAddress = churchUpdateForm.watch('referenceAddress');
  const isAnexe = churchUpdateForm.watch('isAnexe');
  const recordStatus = churchUpdateForm.watch('recordStatus');
  const theirMainChurch = churchUpdateForm.watch('theirMainChurch');

  //* Effects
  useEffect(() => {
    if (
      churchUpdateForm.formState.errors &&
      Object.values(churchUpdateForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      isAnexe &&
      theirMainChurch &&
      Object.values(churchUpdateForm.formState.errors).length === 0 &&
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
      Object.values(churchUpdateForm.formState.errors).length === 0 &&
      !isInputDisabled
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
    churchUpdateForm.formState,
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
    recordStatus,
    theirMainChurch,
  ]);
};
