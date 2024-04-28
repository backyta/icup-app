import { useEffect, useState } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type FieldNames } from '@/shared/enums';
import { type MemberData } from '@/shared/interfaces';

interface Options {
  formMemberUpdate: UseFormReturn<MemberData, any, MemberData>;
  fieldName: typeof FieldNames;
  setIsPromoteButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const usePromoteButtonLogic = ({
  formMemberUpdate,
  fieldName,
  setIsPromoteButtonDisabled,
}: Options): any => {
  // watchers
  const firstName = formMemberUpdate.watch('firstName');
  const lastName = formMemberUpdate.watch('lastName');
  const gender = formMemberUpdate.watch('gender');
  const originCountry = formMemberUpdate.watch('originCountry');
  const maritalStatus = formMemberUpdate.watch('maritalStatus');
  const dateBirth = formMemberUpdate.watch('dateBirth');
  const numberChildren = formMemberUpdate.watch('numberChildren');
  const conversionDate = formMemberUpdate.watch('conversionDate');
  const emailAddress = formMemberUpdate.watch('emailAddress');
  const phoneNumber = formMemberUpdate.watch('phoneNumber');
  const country = formMemberUpdate.watch('country');
  const department = formMemberUpdate.watch('department');
  const province = formMemberUpdate.watch('province');
  const district = formMemberUpdate.watch('district');
  const address = formMemberUpdate.watch('address');
  const roles = formMemberUpdate.watch('roles');
  const theirPastor = formMemberUpdate.watch('theirPastor');
  const theirCopastor = formMemberUpdate.watch('theirCopastor');
  const theirSupervisor = formMemberUpdate.watch('theirSupervisor');
  const theirFamilyHouse = formMemberUpdate.watch('theirFamilyHouse');
  const status = formMemberUpdate.watch('status');

  const [fixedValues, setFixedValues] = useState<MemberData[]>([]);
  const [lastValues, setLastValues] = useState<MemberData[]>([]);

  // effects
  useEffect(() => {
    const initialValues: never[] = formMemberUpdate.getValues([...Object.values(fieldName)]);
    setFixedValues(initialValues);
  }, []);

  // validate and compare last and current values
  useEffect(() => {
    const previousValues: MemberData[] = lastValues;
    const currentValues: never[] = formMemberUpdate.getValues([...Object.values(fieldName)]);

    if (
      previousValues.length !== 0 &&
      JSON.stringify(fixedValues) === JSON.stringify(previousValues)
    ) {
      setIsPromoteButtonDisabled(true);
    }

    // Validate and compares last and current roles (sorted)
    const arrayEqualsIgnoreOrder = (fixed: MemberData[], current: MemberData[]): boolean => {
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
    dateBirth,
    numberChildren,
    conversionDate,
    emailAddress,
    phoneNumber,
    country,
    department,
    province,
    district,
    address,
    roles,
    theirPastor,
    theirCopastor,
    theirSupervisor,
    theirFamilyHouse,
    status,
  ]);
};
