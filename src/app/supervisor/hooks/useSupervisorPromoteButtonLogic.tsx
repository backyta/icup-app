import { useEffect, useState } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import { type SupervisorFieldNames } from '@/app/supervisor/enums';
import { type SupervisorFormData } from '@/app/supervisor/interfaces';

interface Options {
  formSupervisorUpdate: UseFormReturn<SupervisorFormData, any, SupervisorFormData>;
  fieldName: typeof SupervisorFieldNames;
  setIsPromoteButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useSupervisorPromoteButtonLogic = ({
  formSupervisorUpdate,
  fieldName,
  setIsPromoteButtonDisabled,
}: Options): any => {
  //* States
  const [fixedValues, setFixedValues] = useState<SupervisorFormData[]>([]);
  const [lastValues, setLastValues] = useState<SupervisorFormData[]>([]);

  //* Watchers
  const firstName = formSupervisorUpdate.watch('firstName');
  const lastName = formSupervisorUpdate.watch('lastName');
  const gender = formSupervisorUpdate.watch('gender');
  const birthDate = formSupervisorUpdate.watch('birthDate');
  const originCountry = formSupervisorUpdate.watch('originCountry');
  const maritalStatus = formSupervisorUpdate.watch('maritalStatus');
  const numberChildren = formSupervisorUpdate.watch('numberChildren');
  const conversionDate = formSupervisorUpdate.watch('conversionDate');
  const email = formSupervisorUpdate.watch('email');
  const phoneNumber = formSupervisorUpdate.watch('phoneNumber');
  const country = formSupervisorUpdate.watch('country');
  const department = formSupervisorUpdate.watch('department');
  const province = formSupervisorUpdate.watch('province');
  const district = formSupervisorUpdate.watch('district');
  const urbanSector = formSupervisorUpdate.watch('urbanSector');
  const address = formSupervisorUpdate.watch('address');
  const referenceAddress = formSupervisorUpdate.watch('referenceAddress');
  const roles = formSupervisorUpdate.watch('roles');
  const recordStatus = formSupervisorUpdate.watch('recordStatus');
  const theirCopastor = formSupervisorUpdate.watch('theirCopastor');

  //* Effects
  useEffect(() => {
    const initialValues = formSupervisorUpdate.getValues([...Object.values(fieldName)]);
    setFixedValues(initialValues);
  }, []);

  //* Validate and compare last and current values
  useEffect(() => {
    const previousValues: SupervisorFormData[] = lastValues;
    const currentValues: SupervisorFormData[] = formSupervisorUpdate.getValues([
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
