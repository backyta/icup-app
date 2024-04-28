/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type ZoneData, type ZoneDataSearch } from '@/app/family-house/interfaces';

interface Options {
  formUpdateZone: UseFormReturn<ZoneData, any, ZoneData>;
  formSearchZone: UseFormReturn<ZoneDataSearch, any, ZoneDataSearch>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSearchButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useZoneUpdateSubmitButtonsLogic = ({
  formUpdateZone,
  formSearchZone,
  setIsSubmitButtonDisabled,
  setIsSearchButtonDisabled,
  setIsMessageErrorDisabled,
}: Options): void => {
  // watchers
  const supervisor = formUpdateZone.watch('theirSupervisor');
  const updateZoneName = formUpdateZone.watch('zoneName');
  const country = formUpdateZone.watch('country');
  const department = formUpdateZone.watch('department');
  const province = formUpdateZone.watch('province');
  const district = formUpdateZone.watch('district');

  const searchZoneName = formSearchZone.watch('zoneName');

  // effects
  useEffect(() => {
    if (supervisor && updateZoneName && country && department && province && district) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (!supervisor || !updateZoneName || !country || !department || !province || !district) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (searchZoneName) {
      setIsSearchButtonDisabled(false);
    }
    if (!searchZoneName) {
      setIsSearchButtonDisabled(true);
    }
  }, [supervisor, updateZoneName, country, department, province, district, searchZoneName]);
};
