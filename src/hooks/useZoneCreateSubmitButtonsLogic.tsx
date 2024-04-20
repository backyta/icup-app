/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type ZoneData } from '@/app/family-house/interfaces';

interface Options {
  formCreateZone: UseFormReturn<ZoneData, any, ZoneData>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useZoneCreateSubmitButtonsLogic = ({
  formCreateZone,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
}: Options): void => {
  // watchers
  const zoneName = formCreateZone.watch('zoneName');
  const country = formCreateZone.watch('country');
  const department = formCreateZone.watch('department');
  const provincia = formCreateZone.watch('province');
  const district = formCreateZone.watch('district');
  const theirSupervisor = formCreateZone.watch('theirSupervisor');

  // effects
  useEffect(() => {
    if (zoneName && country && department && district && provincia && theirSupervisor) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (!zoneName || !country || !department || !district || !provincia || !theirSupervisor) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
  }, [zoneName, country, department, provincia, district, theirSupervisor]);
};
