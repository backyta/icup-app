import { useEffect, useState } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type FieldNamesPreacher } from '@/app/preacher/enums';
import { type PreacherFormData } from '@/app/preacher/interfaces';

interface Options {
  formPreacherUpdate: UseFormReturn<PreacherFormData, any, PreacherFormData>;
  fieldNames: typeof FieldNamesPreacher;
  setIsPromoteButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const usePreacherPromoteButtonLogic = ({
  formPreacherUpdate,
  fieldNames,
  setIsPromoteButtonDisabled,
}: Options): any => {
  //* States
  const [fixedValues, setFixedValues] = useState<PreacherFormData[]>([]);
  const [lastValues, setLastValues] = useState<PreacherFormData[]>([]);

  //* Watchers
  const firstName = formPreacherUpdate.watch('firstName');
  const lastName = formPreacherUpdate.watch('lastName');
  const gender = formPreacherUpdate.watch('gender');
  const birthDate = formPreacherUpdate.watch('birthDate');
  const originCountry = formPreacherUpdate.watch('originCountry');
  const maritalStatus = formPreacherUpdate.watch('maritalStatus');
  const numberChildren = formPreacherUpdate.watch('numberChildren');
  const conversionDate = formPreacherUpdate.watch('conversionDate');
  const email = formPreacherUpdate.watch('email');
  const phoneNumber = formPreacherUpdate.watch('phoneNumber');
  const country = formPreacherUpdate.watch('country');
  const department = formPreacherUpdate.watch('department');
  const province = formPreacherUpdate.watch('province');
  const district = formPreacherUpdate.watch('district');
  const urbanSector = formPreacherUpdate.watch('urbanSector');
  const address = formPreacherUpdate.watch('address');
  const referenceAddress = formPreacherUpdate.watch('referenceAddress');
  const roles = formPreacherUpdate.watch('roles');
  const status = formPreacherUpdate.watch('status');

  const theirCopastor = formPreacherUpdate.watch('theirCopastor');
  const theirSupervisor = formPreacherUpdate.watch('theirSupervisor');

  // NOTE : replicar tal como en preacher y hacer sus propios field Names y ver el numero de roles en el array
  // NOTE : después de eso revisar los update form hooks button para optimizar si alguno sobra o falta
  // NOTE : finalmente pasar a modulo disciple y demas

  //* Effects
  useEffect(() => {
    const initialValues = formPreacherUpdate.getValues([...Object.values(fieldNames)]);
    setFixedValues(initialValues);
  }, []);

  //* Validate and compare last and current values
  useEffect(() => {
    const previousValues: PreacherFormData[] = lastValues;
    const currentValues: PreacherFormData[] = formPreacherUpdate.getValues([
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
    theirCopastor,
    theirSupervisor,
    status,
  ]);
};
