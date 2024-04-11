import { useEffect, useState } from 'react';

import { type FieldName } from '@/shared/enums';
import { type MemberData } from '@/shared/interfaces';

interface Options {
  form: any;
  fieldName: typeof FieldName;
  setIsPromoteButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const usePromoteButtonLogic = ({ form, fieldName, setIsPromoteButtonDisabled }: Options): any => {
  const firstName = form.watch('firstName');
  const lastName = form.watch('lastName');
  const gender = form.watch('gender');
  const originCountry = form.watch('originCountry');
  const maritalStatus = form.watch('maritalStatus');
  const dateBirth = form.watch('dateBirth');
  const numberChildren = form.watch('numberChildren');
  const conversionDate = form.watch('conversionDate');
  const emailAddress = form.watch('emailAddress');
  const phoneNumber = form.watch('phoneNumber');
  const country = form.watch('country');
  const department = form.watch('department');
  const province = form.watch('province');
  const district = form.watch('district');
  const address = form.watch('address');
  const roles = form.watch('roles');
  const theirPastor = form.watch('theirPastor');
  const theirCopastor = form.watch('theirCopastor');
  const theirSupervisor = form.watch('theirSupervisor');
  const theirFamilyHouse = form.watch('theirFamilyHouse');
  const isActive = form.watch('isActive');

  const [fixedValues, setFixedValues] = useState<MemberData[]>([]);
  const [lastValues, setLastValues] = useState<MemberData[]>([]);

  useEffect(() => {
    const initialValues: never[] = form.getValues([...Object.values(fieldName)]);
    setFixedValues(initialValues);
  }, []);

  // validate and compare last and current values
  useEffect(() => {
    const previousValues: MemberData[] = lastValues;
    const currentValues: never[] = form.getValues([...Object.values(fieldName)]);

    if (previousValues.length !== 0 && JSON.stringify(fixedValues) === JSON.stringify(previousValues)) {
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
      isActive === 'active'
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
    isActive,
  ]);
};
