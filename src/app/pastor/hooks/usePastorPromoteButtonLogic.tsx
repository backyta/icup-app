import { useEffect, useState } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type FieldNames } from '@/shared/enums';

import { type PastorFormData } from '../interfaces';

interface Options {
  formPastorUpdate: UseFormReturn<PastorFormData, any, PastorFormData>;
  fieldName: typeof FieldNames;
  setIsPromoteButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

// TODO : replicar en copastor y demás módulos que si promueven
export const usePastorPromoteButtonLogic = ({
  formPastorUpdate,
  fieldName,
  setIsPromoteButtonDisabled,
}: Options): any => {
  //* States
  const [fixedValues, setFixedValues] = useState<PastorFormData[]>([]);
  const [lastValues, setLastValues] = useState<PastorFormData[]>([]);

  //* Watchers
  const firstName = formPastorUpdate.watch('firstName');
  const lastName = formPastorUpdate.watch('lastName');
  const gender = formPastorUpdate.watch('gender');
  const birthDate = formPastorUpdate.watch('birthDate');
  const originCountry = formPastorUpdate.watch('originCountry');
  const maritalStatus = formPastorUpdate.watch('maritalStatus');
  const numberChildren = formPastorUpdate.watch('numberChildren');
  const conversionDate = formPastorUpdate.watch('conversionDate');
  const email = formPastorUpdate.watch('email');
  const phoneNumber = formPastorUpdate.watch('phoneNumber');
  const country = formPastorUpdate.watch('country');
  const department = formPastorUpdate.watch('department');
  const province = formPastorUpdate.watch('province');
  const district = formPastorUpdate.watch('district');
  const urbanSector = formPastorUpdate.watch('urbanSector');
  const address = formPastorUpdate.watch('address');
  const referenceAddress = formPastorUpdate.watch('referenceAddress');
  const roles = formPastorUpdate.watch('roles');
  const status = formPastorUpdate.watch('status');

  const theirChurch = formPastorUpdate.watch('theirChurch');

  //* Effects
  useEffect(() => {
    const initialValues: any[] = formPastorUpdate.getValues([...Object.values(fieldName)]);
    setFixedValues(initialValues);
  }, []);

  // validate and compare last and current values
  useEffect(() => {
    const previousValues: PastorFormData[] = lastValues;
    const currentValues: never[] = formPastorUpdate.getValues([...Object.values(fieldName)]);

    if (
      previousValues.length !== 0 &&
      JSON.stringify(fixedValues) === JSON.stringify(previousValues)
    ) {
      setIsPromoteButtonDisabled(true);
    }

    // Validate and compares last and current roles (sorted)
    const arrayEqualsIgnoreOrder = (
      fixed: PastorFormData[],
      current: PastorFormData[]
    ): boolean => {
      const sortedA = Array.isArray(fixed[15]) && fixed[15]?.sort();
      const sortedB = Array.isArray(current[15]) && current[15]?.sort();

      return JSON.stringify(sortedA) === JSON.stringify(sortedB);
    };

    if (
      arrayEqualsIgnoreOrder(fixedValues, currentValues) &&
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
    theirChurch,
    status,
  ]);
};
