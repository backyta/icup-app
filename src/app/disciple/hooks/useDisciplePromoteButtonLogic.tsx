import { useEffect, useState } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type DiscipleFieldNames } from '@/app/disciple/enums';
import { type DiscipleFormData } from '@/app/disciple/interfaces';

interface Options {
  formDiscipleUpdate: UseFormReturn<DiscipleFormData, any, DiscipleFormData>;
  fieldName: typeof DiscipleFieldNames;
  setIsPromoteButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDisciplePromoteButtonLogic = ({
  formDiscipleUpdate,
  fieldName,
  setIsPromoteButtonDisabled,
}: Options): any => {
  //* States
  const [fixedValues, setFixedValues] = useState<DiscipleFormData[]>([]);
  const [lastValues, setLastValues] = useState<DiscipleFormData[]>([]);

  //* Watchers
  const firstName = formDiscipleUpdate.watch('firstName');
  const lastName = formDiscipleUpdate.watch('lastName');
  const gender = formDiscipleUpdate.watch('gender');
  const birthDate = formDiscipleUpdate.watch('birthDate');
  const originCountry = formDiscipleUpdate.watch('originCountry');
  const maritalStatus = formDiscipleUpdate.watch('maritalStatus');
  const numberChildren = formDiscipleUpdate.watch('numberChildren');
  const conversionDate = formDiscipleUpdate.watch('conversionDate');
  const email = formDiscipleUpdate.watch('email');
  const phoneNumber = formDiscipleUpdate.watch('phoneNumber');
  const country = formDiscipleUpdate.watch('country');
  const department = formDiscipleUpdate.watch('department');
  const province = formDiscipleUpdate.watch('province');
  const district = formDiscipleUpdate.watch('district');
  const urbanSector = formDiscipleUpdate.watch('urbanSector');
  const address = formDiscipleUpdate.watch('address');
  const referenceAddress = formDiscipleUpdate.watch('referenceAddress');
  const roles = formDiscipleUpdate.watch('roles');
  const recordStatus = formDiscipleUpdate.watch('recordStatus');

  const theirFamilyGroup = formDiscipleUpdate.watch('theirFamilyGroup');

  //* Effects
  useEffect(() => {
    const initialValues = formDiscipleUpdate.getValues([...Object.values(fieldName)]);
    setFixedValues(initialValues);
  }, []);

  //* Validate and compare last and current values
  useEffect(() => {
    const previousValues: DiscipleFormData[] = lastValues;
    const currentValues: DiscipleFormData[] = formDiscipleUpdate.getValues([
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
