/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect } from "react";

interface Options {
  formUpdateZone:any;
  formSearchZone:any;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSearchButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;

}

export const useZoneUpdateSubmitButtonsLogic = ({
  formUpdateZone, 
  formSearchZone, 
  setIsSubmitButtonDisabled, 
  setIsSearchButtonDisabled
}: Options): void => {
  //* Watchers
  const watchUpdateSupervisor = formUpdateZone.watch('theirSupervisor');
  const watchUpdateZoneName = formUpdateZone.watch('zoneName');
  const watchUpdateCountry = formUpdateZone.watch('country');
  const watchUpdateDepartment = formUpdateZone.watch('department');
  const watchUpdateProvince = formUpdateZone.watch('province');
  const watchUpdateDistrict = formUpdateZone.watch('district');

  const watchSearchZoneName = formSearchZone.watch('zoneName');

  useEffect(() => {
    if (
      formUpdateZone.getValues('zoneName') &&
      formUpdateZone.getValues('country') &&
      formUpdateZone.getValues('department') &&
      formUpdateZone.getValues('province') &&
      formUpdateZone.getValues('district') &&
      formUpdateZone.getValues('theirSupervisor')
    ) {
      setIsSubmitButtonDisabled(false);
    }

    if (
      !formUpdateZone.getValues('zoneName') ||
      !formUpdateZone.getValues('country') ||
      !formUpdateZone.getValues('department') ||
      !formUpdateZone.getValues('province') ||
      !formUpdateZone.getValues('district') ||
      !formUpdateZone.getValues('theirSupervisor')
    ) {
      setIsSubmitButtonDisabled(true);
    }

    if (formSearchZone.getValues('zoneName')) {
      setIsSearchButtonDisabled(false);
    }
    if (!formSearchZone.getValues('zoneName')) {
      setIsSearchButtonDisabled(true);
    }
  }, [
    watchUpdateSupervisor,
    watchUpdateZoneName,
    watchUpdateCountry,
    watchUpdateDepartment,
    watchUpdateProvince,
    watchUpdateDistrict,
    watchSearchZoneName,
  ]);
}
