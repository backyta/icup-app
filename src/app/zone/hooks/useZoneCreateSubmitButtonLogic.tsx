/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';
import { type ZoneFormData } from '@/app/zone/interfaces';

interface Options {
  zoneCreateForm: UseFormReturn<ZoneFormData, any, ZoneFormData>;
  setIsSubmitButtonDisabled: (value: boolean) => void;
  setIsMessageErrorDisabled: (value: boolean) => void;
  isInputDisabled: boolean;
}

export const useZoneCreateSubmitButtonLogic = ({
  zoneCreateForm,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const zoneName = zoneCreateForm.watch('zoneName');
  const country = zoneCreateForm.watch('country');
  const department = zoneCreateForm.watch('department');
  const province = zoneCreateForm.watch('province');
  const district = zoneCreateForm.watch('district');
  const theirSupervisor = zoneCreateForm.watch('theirSupervisor');

  //* Effects
  useEffect(() => {
    if (
      zoneCreateForm.formState.errors &&
      Object.values(zoneCreateForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      theirSupervisor &&
      Object.values(zoneCreateForm.formState.errors).length === 0 &&
      !isInputDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (!zoneName || !country || !department || !province || !district) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
  }, [
    zoneCreateForm.formState,
    zoneName,
    country,
    department,
    province,
    district,
    theirSupervisor,
  ]);
};
