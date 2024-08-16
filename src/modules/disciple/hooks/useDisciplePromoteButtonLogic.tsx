import { useEffect, useState } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type DiscipleFieldNames } from '@/modules/disciple/enums';
import { type DiscipleFormData } from '@/modules/disciple/interfaces';

interface Options {
  discipleUpdateForm: UseFormReturn<DiscipleFormData, any, DiscipleFormData>;
  fieldName: typeof DiscipleFieldNames;
  setIsPromoteButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDisciplePromoteButtonLogic = ({
  discipleUpdateForm,
  fieldName,
  setIsPromoteButtonDisabled,
}: Options): any => {
  //* States
  const [fixedValues, setFixedValues] = useState<DiscipleFormData[]>([]);
  const [lastValues, setLastValues] = useState<DiscipleFormData[]>([]);

  //* Watchers
  const firstName = discipleUpdateForm.watch('firstName');
  const lastName = discipleUpdateForm.watch('lastName');
  const gender = discipleUpdateForm.watch('gender');
  const birthDate = discipleUpdateForm.watch('birthDate');
  const originCountry = discipleUpdateForm.watch('originCountry');
  const maritalStatus = discipleUpdateForm.watch('maritalStatus');
  const numberChildren = discipleUpdateForm.watch('numberChildren');
  const conversionDate = discipleUpdateForm.watch('conversionDate');
  const email = discipleUpdateForm.watch('email');
  const phoneNumber = discipleUpdateForm.watch('phoneNumber');
  const country = discipleUpdateForm.watch('country');
  const department = discipleUpdateForm.watch('department');
  const province = discipleUpdateForm.watch('province');
  const district = discipleUpdateForm.watch('district');
  const urbanSector = discipleUpdateForm.watch('urbanSector');
  const address = discipleUpdateForm.watch('address');
  const referenceAddress = discipleUpdateForm.watch('referenceAddress');
  const roles = discipleUpdateForm.watch('roles');
  const recordStatus = discipleUpdateForm.watch('recordStatus');
  const theirFamilyGroup = discipleUpdateForm.watch('theirFamilyGroup');

  //* Effects
  useEffect(() => {
    const initialValues = discipleUpdateForm.getValues([...Object.values(fieldName)]);
    setFixedValues(initialValues);
  }, []);

  //* Validate and compare last and current values
  useEffect(() => {
    const previousValues: DiscipleFormData[] = lastValues;
    const currentValues: DiscipleFormData[] = discipleUpdateForm.getValues([
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
      fixed: DiscipleFormData[],
      current: DiscipleFormData[]
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
    theirFamilyGroup,
    recordStatus,
  ]);
};
