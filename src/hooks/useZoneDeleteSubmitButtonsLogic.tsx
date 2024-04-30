/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type ZoneDataSearch, type ZoneData } from '@/app/family-house/interfaces';

interface Options {
  formDeleteZone: UseFormReturn<ZoneData, any, ZoneData>;
  formSearchZone: UseFormReturn<ZoneDataSearch, any, ZoneDataSearch>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSearchButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useZoneDeleteSubmitButtonsLogic = ({
  formDeleteZone,
  formSearchZone,
  setIsSubmitButtonDisabled,
  setIsSearchButtonDisabled,
}: Options): void => {
  // watchers
  const supervisor = formDeleteZone.watch('theirSupervisor');
  const updateZoneName = formDeleteZone.watch('zoneName');
  const country = formDeleteZone.watch('country');
  const department = formDeleteZone.watch('department');
  const province = formDeleteZone.watch('province');
  const district = formDeleteZone.watch('district');

  const searchZoneName = formSearchZone.watch('zoneName');

  // effects
  useEffect(() => {
    if (supervisor && updateZoneName && country && department && province && district) {
      setIsSubmitButtonDisabled(false);
    }

    if (!supervisor || !updateZoneName || !country || !department || !province || !district) {
      setIsSubmitButtonDisabled(true);
    }

    if (searchZoneName) {
      setIsSearchButtonDisabled(false);
    }
    if (!searchZoneName) {
      setIsSearchButtonDisabled(true);
    }
  }, [supervisor, updateZoneName, country, department, province, district, searchZoneName]);
};
