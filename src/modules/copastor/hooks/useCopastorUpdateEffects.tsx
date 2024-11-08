/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type CopastorResponse, type CopastorFormData } from '@/modules/copastor/interfaces';

interface Options {
  id: string;
  data: CopastorResponse | undefined;
  setIsLoadingData: React.Dispatch<React.SetStateAction<boolean>>;
  copastorUpdateForm: UseFormReturn<CopastorFormData, any, CopastorFormData>;
}

export const useCopastorUpdateEffects = ({
  id,
  data,
  setIsLoadingData,
  copastorUpdateForm,
}: Options): void => {
  const district = copastorUpdateForm.watch('district');

  //* Set data
  useEffect(() => {
    copastorUpdateForm.setValue('firstName', data?.member?.firstName ?? '');
    copastorUpdateForm.setValue('lastName', data?.member?.lastName ?? '');
    copastorUpdateForm.setValue('gender', data?.member?.gender ?? '');
    copastorUpdateForm.setValue('originCountry', data?.member?.originCountry ?? '');
    copastorUpdateForm.setValue(
      'birthDate',
      new Date(String(data?.member?.birthDate).replace(/-/g, '/'))
    );
    copastorUpdateForm.setValue('maritalStatus', data?.member?.maritalStatus ?? '');
    copastorUpdateForm.setValue('numberChildren', String(data?.member?.numberChildren) ?? '0');
    copastorUpdateForm.setValue(
      'conversionDate',
      new Date(String(data?.member?.conversionDate).replace(/-/g, '/'))
    );
    copastorUpdateForm.setValue('email', data?.member?.email ?? '');
    copastorUpdateForm.setValue('phoneNumber', data?.member?.phoneNumber ?? '');
    copastorUpdateForm.setValue('country', data?.member?.country ?? '');
    copastorUpdateForm.setValue('department', data?.member?.department ?? '');
    copastorUpdateForm.setValue('province', data?.member?.province ?? '');
    copastorUpdateForm.setValue('district', data?.member?.district ?? '');
    copastorUpdateForm.setValue('urbanSector', data?.member?.urbanSector ?? '');
    copastorUpdateForm.setValue('address', data?.member?.address ?? '');
    copastorUpdateForm.setValue('referenceAddress', data?.member?.referenceAddress ?? '');
    copastorUpdateForm.setValue('roles', data?.member?.roles as MemberRole[]);
    copastorUpdateForm.setValue('theirPastor', data?.theirPastor?.id);
    copastorUpdateForm.setValue('recordStatus', data?.recordStatus);

    setTimeout(() => {
      setIsLoadingData(false);
    }, 1000);
  }, []);

  //* Controller district and urban sector
  useEffect(() => {
    copastorUpdateForm.resetField('urbanSector', {
      keepError: true,
    });
  }, [district]);

  //* Generate dynamic url
  useEffect(() => {
    const originalUrl = window.location.href;

    if (id) {
      const url = new URL(window.location.href);
      url.pathname = `/copastors/update/${id}/edit`;

      window.history.replaceState({}, '', url);
    }

    return () => {
      window.history.replaceState({}, '', originalUrl);
    };
  }, [id]);
};
