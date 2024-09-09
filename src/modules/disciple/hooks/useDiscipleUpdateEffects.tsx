/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type DiscipleResponse, type DiscipleFormData } from '@/modules/disciple/interfaces';

interface Options {
  id: string;
  data: DiscipleResponse | undefined;
  setIsLoadingData: React.Dispatch<React.SetStateAction<boolean>>;
  discipleUpdateForm: UseFormReturn<DiscipleFormData, any, DiscipleFormData>;
}

export const useDiscipleUpdateEffects = ({
  id,
  data,
  setIsLoadingData,
  discipleUpdateForm,
}: Options): void => {
  const district = discipleUpdateForm.watch('district');

  //* Set data
  useEffect(() => {
    discipleUpdateForm.setValue('firstName', data?.firstName ?? '');
    discipleUpdateForm.setValue('lastName', data?.lastName ?? '');
    discipleUpdateForm.setValue('gender', data?.gender ?? '');
    discipleUpdateForm.setValue('originCountry', data?.originCountry ?? '');
    discipleUpdateForm.setValue('birthDate', new Date(String(data?.birthDate).replace(/-/g, '/')));
    discipleUpdateForm.setValue('maritalStatus', data?.maritalStatus ?? '');
    discipleUpdateForm.setValue('numberChildren', String(data?.numberChildren) ?? '0');
    discipleUpdateForm.setValue(
      'conversionDate',
      new Date(String(data?.conversionDate).replace(/-/g, '/'))
    );
    discipleUpdateForm.setValue('email', data?.email ?? '');
    discipleUpdateForm.setValue('phoneNumber', data?.phoneNumber ?? '');
    discipleUpdateForm.setValue('country', data?.country ?? '');
    discipleUpdateForm.setValue('department', data?.department ?? '');
    discipleUpdateForm.setValue('province', data?.province ?? '');
    discipleUpdateForm.setValue('district', data?.district ?? '');
    discipleUpdateForm.setValue('urbanSector', data?.urbanSector ?? '');
    discipleUpdateForm.setValue('address', data?.address ?? '');
    discipleUpdateForm.setValue('referenceAddress', data?.referenceAddress ?? '');
    discipleUpdateForm.setValue('roles', data?.roles as MemberRole[]);
    discipleUpdateForm.setValue('theirFamilyGroup', data?.theirFamilyGroup?.id);
    discipleUpdateForm.setValue('recordStatus', data?.recordStatus);

    const timeoutId = setTimeout(() => {
      setIsLoadingData(false);
    }, 1200);

    return () => {
      clearTimeout(timeoutId); // Limpiar el timeout cuando el componente se desmonte
    };
  }, []);

  //* Controller district and urban sector
  useEffect(() => {
    discipleUpdateForm.resetField('urbanSector', {
      keepError: true,
    });
  }, [district]);

  //* Generate dynamic url
  useEffect(() => {
    const originalUrl = window.location.href;

    if (id) {
      const url = new URL(window.location.href);
      url.pathname = `/disciples/update/${id}/edit`;

      window.history.replaceState({}, '', url);
    }

    return () => {
      window.history.replaceState({}, '', originalUrl);
    };
  }, [id]);
};
