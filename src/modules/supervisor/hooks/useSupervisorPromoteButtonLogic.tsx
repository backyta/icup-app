import { useEffect, useState } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import { type SupervisorFieldNames } from '@/modules/supervisor/enums';
import { type SupervisorFormData } from '@/modules/supervisor/interfaces';

interface Options {
  supervisorUpdateForm: UseFormReturn<SupervisorFormData, any, SupervisorFormData>;
  fieldName: typeof SupervisorFieldNames;
  setIsPromoteButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useSupervisorPromoteButtonLogic = ({
  supervisorUpdateForm,
  fieldName,
  setIsPromoteButtonDisabled,
}: Options): any => {
  //* States
  const [fixedValues, setFixedValues] = useState<SupervisorFormData[]>([]);
  const [lastValues, setLastValues] = useState<SupervisorFormData[]>([]);

  //* Watchers
  const firstName = supervisorUpdateForm.watch('firstName');
  const lastName = supervisorUpdateForm.watch('lastName');
  const gender = supervisorUpdateForm.watch('gender');
  const birthDate = supervisorUpdateForm.watch('birthDate');
  const originCountry = supervisorUpdateForm.watch('originCountry');
  const maritalStatus = supervisorUpdateForm.watch('maritalStatus');
  const numberChildren = supervisorUpdateForm.watch('numberChildren');
  const conversionDate = supervisorUpdateForm.watch('conversionDate');
  const email = supervisorUpdateForm.watch('email');
  const phoneNumber = supervisorUpdateForm.watch('phoneNumber');
  const country = supervisorUpdateForm.watch('country');
  const department = supervisorUpdateForm.watch('department');
  const province = supervisorUpdateForm.watch('province');
  const district = supervisorUpdateForm.watch('district');
  const urbanSector = supervisorUpdateForm.watch('urbanSector');
  const address = supervisorUpdateForm.watch('address');
  const referenceAddress = supervisorUpdateForm.watch('referenceAddress');
  const roles = supervisorUpdateForm.watch('roles');
  const isDirectRelationToPastor = supervisorUpdateForm.watch('isDirectRelationToPastor');
  const recordStatus = supervisorUpdateForm.watch('recordStatus');
  const theirCopastor = supervisorUpdateForm.watch('theirCopastor');
  const theirPastor = supervisorUpdateForm.watch('theirPastor');

  // ? Effects
  //* Setea los valores fijos en un estado
  useEffect(() => {
    const initialValues = supervisorUpdateForm.getValues([...Object.values(fieldName)]);
    setFixedValues(initialValues);
  }, []);

  useEffect(() => {
    //* Asigna los previous values y los current values
    const previousValues: SupervisorFormData[] = lastValues;
    const currentValues: SupervisorFormData[] = supervisorUpdateForm.getValues([
      ...Object.values(fieldName),
    ]);

    //* Si se coloca el co-pastor inicial que tenia, se setea su mismo pastor (para guardar referencia)
    if (fixedValues[20] === currentValues[20]) {
      currentValues[21] = fixedValues[21];
      supervisorUpdateForm.setValue('theirPastor', String(currentValues[21]));
    }

    //* Valida si hay algún cambio y coloca a true el promote button
    if (
      previousValues.length !== 0 &&
      JSON.stringify(fixedValues) === JSON.stringify(previousValues)
    ) {
      setIsPromoteButtonDisabled(true);
    }

    //* Valida y compara si tiene la misma información inicial, ordena y activa el botón
    const arrayEqualsIgnoreOrder = (
      fixed: SupervisorFormData[],
      current: SupervisorFormData[]
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

    //* Si no hay coincidencias setea el current value al lastValues
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
    isDirectRelationToPastor,
    theirCopastor,
    theirPastor,
    recordStatus,
  ]);
};
