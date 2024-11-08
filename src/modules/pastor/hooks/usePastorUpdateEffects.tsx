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
    pastorUpdateForm.setValue('firstName', data?.member?.firstName ?? '');
    pastorUpdateForm.setValue('lastName', data?.member?.lastName ?? '');
    pastorUpdateForm.setValue('gender', data?.member?.gender ?? '');
    pastorUpdateForm.setValue('originCountry', data?.member?.originCountry ?? '');
    pastorUpdateForm.setValue(
      'birthDate',
      new Date(String(data?.member?.birthDate).replace(/-/g, '/'))
    );
    pastorUpdateForm.setValue('maritalStatus', data?.member?.maritalStatus ?? '');
    pastorUpdateForm.setValue('numberChildren', String(data?.member?.numberChildren) ?? '0');
    pastorUpdateForm.setValue(
      'conversionDate',
      new Date(String(data?.member?.conversionDate).replace(/-/g, '/'))
    );
    pastorUpdateForm.setValue('email', data?.member?.email ?? '');
    pastorUpdateForm.setValue('phoneNumber', data?.member?.phoneNumber ?? '');
    pastorUpdateForm.setValue('country', data?.member?.country ?? '');
    pastorUpdateForm.setValue('department', data?.member?.department ?? '');
    pastorUpdateForm.setValue('province', data?.member?.province ?? '');
    pastorUpdateForm.setValue('district', data?.member?.district ?? '');
    pastorUpdateForm.setValue('urbanSector', data?.member?.urbanSector ?? '');
    pastorUpdateForm.setValue('address', data?.member?.address ?? '');
    pastorUpdateForm.setValue('referenceAddress', data?.member?.referenceAddress ?? '');
    pastorUpdateForm.setValue('roles', data?.member?.roles as MemberRole[]);
    pastorUpdateForm.setValue('theirChurch', data?.theirChurch?.id);
    pastorUpdateForm.setValue('recordStatus', data?.recordStatus);

    const timeoutId = setTimeout(() => {
      setIsLoadingData(false);
    }, 1200);

    return () => {
      clearTimeout(timeoutId);
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
