import { useEffect, useState } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type FieldNames } from '@/shared/enums';

import { type SupervisorFormData } from '@/app/supervisor/interfaces';

interface Options {
  formSupervisorUpdate: UseFormReturn<SupervisorFormData, any, SupervisorFormData>;
  fieldName: typeof FieldNames;
  setIsPromoteButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

// TODO : optimizar los anys
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
  const status = formSupervisorUpdate.watch('status');

  const theirPastor = formSupervisorUpdate.watch('theirPastor');
  const theirCopastor = formSupervisorUpdate.watch('theirCopastor');

  //* Effects
  useEffect(() => {
    const initialValues = formSupervisorUpdate.getValues([...(Object.values(fieldName) as any)]);
    setFixedValues(initialValues);
  }, []);

  //* Validate and compare last and current values
  useEffect(() => {
    const previousValues: SupervisorFormData[] = lastValues;
    const currentValues = formSupervisorUpdate.getValues([...(Object.values(fieldName) as any)]);

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
      const sortedA = Array.isArray(fixed[15]) && fixed[15]?.sort();
      const sortedB = Array.isArray(current[15]) && current[15]?.sort();

      return JSON.stringify(sortedA) === JSON.stringify(sortedB);
    };

    if (
      arrayEqualsIgnoreOrder(fixedValues, currentValues as SupervisorFormData[]) &&
      JSON.stringify(fixedValues) === JSON.stringify(currentValues) &&
      status === 'active'
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
    theirPastor,
    theirCopastor,
    status,
  ]);
};
