/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type PastorResponse, type PastorFormData } from '@/modules/pastor/interfaces';

interface Options {
  id: string;
  data: PastorResponse | undefined;
  setIsLoadingData: React.Dispatch<React.SetStateAction<boolean>>;
  pastorUpdateForm: UseFormReturn<PastorFormData, any, PastorFormData>;
}

export const usePastorUpdateEffects = ({
  id,
  data,
  setIsLoadingData,
  pastorUpdateForm,
}: Options): void => {
  const district = pastorUpdateForm.watch('district');

  //* Set data
  useEffect(() => {
    pastorUpdateForm.setValue('firstName', data?.firstName ?? '');
    pastorUpdateForm.setValue('lastName', data?.lastName ?? '');
    pastorUpdateForm.setValue('gender', data?.gender ?? '');
    pastorUpdateForm.setValue('originCountry', data?.originCountry ?? '');
    pastorUpdateForm.setValue('birthDate', new Date(String(data?.birthDate).replace(/-/g, '/')));
    pastorUpdateForm.setValue('maritalStatus', data?.maritalStatus ?? '');
    pastorUpdateForm.setValue('numberChildren', String(data?.numberChildren) ?? '0');
    pastorUpdateForm.setValue(
      'conversionDate',
      new Date(String(data?.conversionDate).replace(/-/g, '/'))
    );
    pastorUpdateForm.setValue('email', data?.email ?? '');
    pastorUpdateForm.setValue('phoneNumber', data?.phoneNumber ?? '');
    pastorUpdateForm.setValue('country', data?.country ?? '');
    pastorUpdateForm.setValue('department', data?.department ?? '');
    pastorUpdateForm.setValue('province', data?.province ?? '');
    pastorUpdateForm.setValue('district', data?.district ?? '');
    pastorUpdateForm.setValue('urbanSector', data?.urbanSector ?? '');
    pastorUpdateForm.setValue('address', data?.address ?? '');
    pastorUpdateForm.setValue('referenceAddress', data?.referenceAddress ?? '');
    pastorUpdateForm.setValue('roles', data?.roles as MemberRole[]);
    pastorUpdateForm.setValue('theirChurch', data?.theirChurch?.id);
    pastorUpdateForm.setValue('recordStatus', data?.recordStatus);

    const timeoutId = setTimeout(() => {
      setIsLoadingData(false);
    }, 1200);

    return () => {
      clearTimeout(timeoutId); // Limpiar el timeout cuando el componente se desmonte
    };
  }, []);

  //* Controller district and urban sector
  useEffect(() => {
    pastorUpdateForm.resetField('urbanSector', {
      keepError: true,
    });
  }, [district]);

  //* Generate dynamic url
  useEffect(() => {
    const originalUrl = window.location.href;

    if (id) {
      const url = new URL(window.location.href);
      url.pathname = `/pastors/update/${id}/edit`;

      window.history.replaceState({}, '', url);
    }

    return () => {
      window.history.replaceState({}, '', originalUrl);
    };
  }, [id]);
};
