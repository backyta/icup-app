import { useEffect, useState } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type PreacherFieldNames } from '@/modules/preacher/enums';
import { type PreacherFormData } from '@/modules/preacher/interfaces';

interface Options {
  preacherUpdateForm: UseFormReturn<PreacherFormData, any, PreacherFormData>;
  fieldNames: typeof PreacherFieldNames;
  setIsPromoteButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const usePreacherPromoteButtonLogic = ({
  preacherUpdateForm,
  fieldNames,
  setIsPromoteButtonDisabled,
}: Options): any => {
  //* States
  const [fixedValues, setFixedValues] = useState<PreacherFormData[]>([]);
  const [lastValues, setLastValues] = useState<PreacherFormData[]>([]);

  //* Watchers
  const firstName = preacherUpdateForm.watch('firstName');
  const lastName = preacherUpdateForm.watch('lastName');
  const gender = preacherUpdateForm.watch('gender');
  const birthDate = preacherUpdateForm.watch('birthDate');
  const originCountry = preacherUpdateForm.watch('originCountry');
  const maritalStatus = preacherUpdateForm.watch('maritalStatus');
  const numberChildren = preacherUpdateForm.watch('numberChildren');
  const conversionDate = preacherUpdateForm.watch('conversionDate');
  const email = preacherUpdateForm.watch('email');
  const phoneNumber = preacherUpdateForm.watch('phoneNumber');
  const country = preacherUpdateForm.watch('country');
  const department = preacherUpdateForm.watch('department');
  const province = preacherUpdateForm.watch('province');
  const district = preacherUpdateForm.watch('district');
  const urbanSector = preacherUpdateForm.watch('urbanSector');
  const address = preacherUpdateForm.watch('address');
  const referenceAddress = preacherUpdateForm.watch('referenceAddress');
  const roles = preacherUpdateForm.watch('roles');
  const recordStatus = preacherUpdateForm.watch('recordStatus');

  const theirSupervisor = preacherUpdateForm.watch('theirSupervisor');

  //* Effects
  useEffect(() => {
    const initialValues = preacherUpdateForm.getValues([...Object.values(fieldNames)]);
    setFixedValues(initialValues);
  }, []);

  //* Validate and compare last and current values
  useEffect(() => {
    const previousValues: PreacherFormData[] = lastValues;
    const currentValues: PreacherFormData[] = preacherUpdateForm.getValues([
      ...Object.values(fieldNames),
    ]);

    if (
      previousValues.length !== 0 &&
      JSON.stringify(fixedValues) === JSON.stringify(previousValues)
    ) {
      setIsPromoteButtonDisabled(true);
    }

    //* Validate and compares last and current roles (sorted)
    const arrayEqualsIgnoreOrder = (
      fixed: PreacherFormData[],
      current: PreacherFormData[]
    ): boolean => {
      const sortedA = Array.isArray(fixed['17']) && fixed[17]?.sort();
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
    theirSupervisor,
    recordStatus,
  ]);
};
