import { useEffect, useState } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type CopastorFieldNames } from '@/app/copastor/enums';
import { type CopastorFormData } from '@/app/copastor/interfaces';

interface Options {
  copastorUpdateForm: UseFormReturn<CopastorFormData, any, CopastorFormData>;
  fieldName: typeof CopastorFieldNames;
  setIsPromoteButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useCopastorPromoteButtonLogic = ({
  copastorUpdateForm,
  fieldName,
  setIsPromoteButtonDisabled,
}: Options): any => {
  //* States
  const [fixedValues, setFixedValues] = useState<CopastorFormData[]>([]);
  const [lastValues, setLastValues] = useState<CopastorFormData[]>([]);

  //* Watchers
  const firstName = copastorUpdateForm.watch('firstName');
  const lastName = copastorUpdateForm.watch('lastName');
  const gender = copastorUpdateForm.watch('gender');
  const birthDate = copastorUpdateForm.watch('birthDate');
  const originCountry = copastorUpdateForm.watch('originCountry');
  const maritalStatus = copastorUpdateForm.watch('maritalStatus');
  const numberChildren = copastorUpdateForm.watch('numberChildren');
  const conversionDate = copastorUpdateForm.watch('conversionDate');
  const email = copastorUpdateForm.watch('email');
  const phoneNumber = copastorUpdateForm.watch('phoneNumber');
  const country = copastorUpdateForm.watch('country');
  const department = copastorUpdateForm.watch('department');
  const province = copastorUpdateForm.watch('province');
  const district = copastorUpdateForm.watch('district');
  const urbanSector = copastorUpdateForm.watch('urbanSector');
  const address = copastorUpdateForm.watch('address');
  const referenceAddress = copastorUpdateForm.watch('referenceAddress');
  const roles = copastorUpdateForm.watch('roles');
  const recordStatus = copastorUpdateForm.watch('recordStatus');

  const theirPastor = copastorUpdateForm.watch('theirPastor');

  //* Effects
  useEffect(() => {
    const initialValues = copastorUpdateForm.getValues([...Object.values(fieldName)]);
    setFixedValues(initialValues);
  }, []);

  //* Validate and compare last and current values
  useEffect(() => {
    const previousValues: CopastorFormData[] = lastValues;
    const currentValues: CopastorFormData[] = copastorUpdateForm.getValues([
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
      fixed: CopastorFormData[],
      current: CopastorFormData[]
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
    theirPastor,
    recordStatus,
  ]);
};
