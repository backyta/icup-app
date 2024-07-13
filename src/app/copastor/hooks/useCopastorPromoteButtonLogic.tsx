import { useEffect, useState } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type FieldNames } from '@/shared/enums';

import { type CopastorFormData } from '@/app/copastor/interfaces';

interface Options {
  formCopastorUpdate: UseFormReturn<CopastorFormData, any, CopastorFormData>;
  fieldName: typeof FieldNames;
  setIsPromoteButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

// TODO : optimizar los anys
export const useCopastorPromoteButtonLogic = ({
  formCopastorUpdate,
  fieldName,
  setIsPromoteButtonDisabled,
}: Options): any => {
  //* States
  const [fixedValues, setFixedValues] = useState<CopastorFormData[]>([]);
  const [lastValues, setLastValues] = useState<CopastorFormData[]>([]);

  //* Watchers
  const firstName = formCopastorUpdate.watch('firstName');
  const lastName = formCopastorUpdate.watch('lastName');
  const gender = formCopastorUpdate.watch('gender');
  const birthDate = formCopastorUpdate.watch('birthDate');
  const originCountry = formCopastorUpdate.watch('originCountry');
  const maritalStatus = formCopastorUpdate.watch('maritalStatus');
  const numberChildren = formCopastorUpdate.watch('numberChildren');
  const conversionDate = formCopastorUpdate.watch('conversionDate');
  const email = formCopastorUpdate.watch('email');
  const phoneNumber = formCopastorUpdate.watch('phoneNumber');
  const country = formCopastorUpdate.watch('country');
  const department = formCopastorUpdate.watch('department');
  const province = formCopastorUpdate.watch('province');
  const district = formCopastorUpdate.watch('district');
  const urbanSector = formCopastorUpdate.watch('urbanSector');
  const address = formCopastorUpdate.watch('address');
  const referenceAddress = formCopastorUpdate.watch('referenceAddress');
  const roles = formCopastorUpdate.watch('roles');
  const status = formCopastorUpdate.watch('status');

  const theirPastor = formCopastorUpdate.watch('theirPastor');

  //* Effects
  useEffect(() => {
    const initialValues = formCopastorUpdate.getValues([...(Object.values(fieldName) as any)]);
    setFixedValues(initialValues);
  }, []);

  //* Validate and compare last and current values
  useEffect(() => {
    const previousValues: CopastorFormData[] = lastValues;
    const currentValues = formCopastorUpdate.getValues([...(Object.values(fieldName) as any)]);

    if (
      previousValues.length !== 0 &&
      JSON.stringify(fixedValues) === JSON.stringify(previousValues)
    ) {
      setIsPromoteButtonDisabled(true);
    }

    //* Validate and compares last and current roles (sorted)
    const arrayEqualsIgnoreOrder = (
      fixed: CopastorFormData[],
      current: CopastorFormData[]
    ): boolean => {
      const sortedA = Array.isArray(fixed[15]) && fixed[15]?.sort();
      const sortedB = Array.isArray(current[15]) && current[15]?.sort();

      return JSON.stringify(sortedA) === JSON.stringify(sortedB);
    };

    if (
      arrayEqualsIgnoreOrder(fixedValues, currentValues as CopastorFormData[]) &&
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
    status,
  ]);
};
