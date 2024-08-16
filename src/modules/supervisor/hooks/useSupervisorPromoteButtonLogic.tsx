import { useEffect, useState } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import { type SupervisorFieldNames } from '@/modules/supervisor/enums';
import { type SupervisorFormData } from '@/modules/supervisor/interfaces';

interface Options {
  supervisorUpdateForm: UseFormReturn<SupervisorFormData, any, SupervisorFormData>;
  fieldName: typeof SupervisorFieldNames;
  setIsPromoteButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useSupervisorPromoteButtonLogic = ({
  supervisorUpdateForm,
  fieldName,
  setIsPromoteButtonDisabled,
}: Options): any => {
  //* States
  const [fixedValues, setFixedValues] = useState<SupervisorFormData[]>([]);
  const [lastValues, setLastValues] = useState<SupervisorFormData[]>([]);

  //* Watchers
  const firstName = supervisorUpdateForm.watch('firstName');
  const lastName = supervisorUpdateForm.watch('lastName');
  const gender = supervisorUpdateForm.watch('gender');
  const birthDate = supervisorUpdateForm.watch('birthDate');
  const originCountry = supervisorUpdateForm.watch('originCountry');
  const maritalStatus = supervisorUpdateForm.watch('maritalStatus');
  const numberChildren = supervisorUpdateForm.watch('numberChildren');
  const conversionDate = supervisorUpdateForm.watch('conversionDate');
  const email = supervisorUpdateForm.watch('email');
  const phoneNumber = supervisorUpdateForm.watch('phoneNumber');
  const country = supervisorUpdateForm.watch('country');
  const department = supervisorUpdateForm.watch('department');
  const province = supervisorUpdateForm.watch('province');
  const district = supervisorUpdateForm.watch('district');
  const urbanSector = supervisorUpdateForm.watch('urbanSector');
  const address = supervisorUpdateForm.watch('address');
  const referenceAddress = supervisorUpdateForm.watch('referenceAddress');
  const roles = supervisorUpdateForm.watch('roles');
  const recordStatus = supervisorUpdateForm.watch('recordStatus');
  const theirCopastor = supervisorUpdateForm.watch('theirCopastor');

  //* Effects
  useEffect(() => {
    const initialValues = supervisorUpdateForm.getValues([...Object.values(fieldName)]);
    setFixedValues(initialValues);
  }, []);

  //* Validate and compare last and current values
  useEffect(() => {
    const previousValues: SupervisorFormData[] = lastValues;
    const currentValues: SupervisorFormData[] = supervisorUpdateForm.getValues([
      ...Object.values(fieldName),
    ]);

    if (
      previousValues.length !== 0 &&
      JSON.stringify(fixedValues) === JSON.stringify(previousValues)
    ) {
      setIsPromoteButtonDisabled(true);
    }

    //* Validate and compares last and current roles (sorted)
    const arrayEqualsIgnoreOrder = (
      fixed: SupervisorFormData[],
      current: SupervisorFormData[]
    ): boolean => {
      const sortedA = Array.isArray(fixed[17]) && fixed[17]?.sort();
      const sortedB = Array.isArray(current[17]) && current[17]?.sort();

      return JSON.stringify(sortedA) === JSON.stringify(sortedB);
    };

    if (
      arrayEqualsIgnoreOrder(fixedValues, currentValues) &&
      JSON.stringify(fixedValues) === JSON.stringify(currentValues) &&
      recordStatus === 'active'
    ) {
      setIsPromoteButtonDisabled(false);
    }
    setLastValues(currentValues);
  }, [
    firstName,
    lastName,
    gender,
    originCountry,
    maritalStatus,
    birthDate,
    numberChildren,
    conversionDate,
    email,
    phoneNumber,
    country,
    department,
    province,
    urbanSector,
    referenceAddress,
    district,
    address,
    roles,
    theirCopastor,
    recordStatus,
  ]);
};
