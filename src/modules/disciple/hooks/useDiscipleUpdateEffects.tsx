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
    discipleUpdateForm.setValue('firstName', data?.member?.firstName ?? '');
    discipleUpdateForm.setValue('lastName', data?.member?.lastName ?? '');
    discipleUpdateForm.setValue('gender', data?.member?.gender ?? '');
    discipleUpdateForm.setValue('originCountry', data?.member?.originCountry ?? '');
    discipleUpdateForm.setValue(
      'birthDate',
      new Date(String(data?.member?.birthDate).replace(/-/g, '/'))
    );
    discipleUpdateForm.setValue('maritalStatus', data?.member?.maritalStatus ?? '');
    discipleUpdateForm.setValue('numberChildren', String(data?.member?.numberChildren) ?? '0');
    discipleUpdateForm.setValue(
      'conversionDate',
      new Date(String(data?.member?.conversionDate).replace(/-/g, '/'))
    );
    discipleUpdateForm.setValue('email', data?.member?.email ?? '');
    discipleUpdateForm.setValue('phoneNumber', data?.member?.phoneNumber ?? '');
    discipleUpdateForm.setValue('country', data?.member?.country ?? '');
    discipleUpdateForm.setValue('department', data?.member?.department ?? '');
    discipleUpdateForm.setValue('province', data?.member?.province ?? '');
    discipleUpdateForm.setValue('district', data?.member?.district ?? '');
    discipleUpdateForm.setValue('urbanSector', data?.member?.urbanSector ?? '');
    discipleUpdateForm.setValue('address', data?.member?.address ?? '');
    discipleUpdateForm.setValue('referenceAddress', data?.member?.referenceAddress ?? '');
    discipleUpdateForm.setValue('roles', data?.member?.roles as MemberRole[]);
    discipleUpdateForm.setValue('theirFamilyGroup', data?.theirFamilyGroup?.id);
    discipleUpdateForm.setValue('recordStatus', data?.recordStatus);

    const timeoutId = setTimeout(() => {
      setIsLoadingData(false);
    }, 1200);

    return () => {
      clearTimeout(timeoutId);
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
