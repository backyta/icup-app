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
    copastorUpdateForm.setValue('firstName', data?.firstName ?? '');
    copastorUpdateForm.setValue('lastName', data?.lastName ?? '');
    copastorUpdateForm.setValue('gender', data?.gender ?? '');
    copastorUpdateForm.setValue('originCountry', data?.originCountry ?? '');
    copastorUpdateForm.setValue('birthDate', new Date(String(data?.birthDate).replace(/-/g, '/')));
    copastorUpdateForm.setValue('maritalStatus', data?.maritalStatus ?? '');
    copastorUpdateForm.setValue('numberChildren', String(data?.numberChildren) ?? '0');
    copastorUpdateForm.setValue(
      'conversionDate',
      new Date(String(data?.conversionDate).replace(/-/g, '/'))
    );
    copastorUpdateForm.setValue('email', data?.email ?? '');
    copastorUpdateForm.setValue('phoneNumber', data?.phoneNumber ?? '');
    copastorUpdateForm.setValue('country', data?.country ?? '');
    copastorUpdateForm.setValue('department', data?.department ?? '');
    copastorUpdateForm.setValue('province', data?.province ?? '');
    copastorUpdateForm.setValue('district', data?.district ?? '');
    copastorUpdateForm.setValue('urbanSector', data?.urbanSector ?? '');
    copastorUpdateForm.setValue('address', data?.address ?? '');
    copastorUpdateForm.setValue('referenceAddress', data?.referenceAddress ?? '');
    copastorUpdateForm.setValue('roles', data?.roles as MemberRole[]);
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
