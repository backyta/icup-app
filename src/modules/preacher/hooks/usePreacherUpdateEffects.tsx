/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type PreacherResponse, type PreacherFormData } from '@/modules/preacher/interfaces';

interface Options {
  id: string;
  data: PreacherResponse | undefined;
  setIsLoadingData: React.Dispatch<React.SetStateAction<boolean>>;
  preacherUpdateForm: UseFormReturn<PreacherFormData, any, PreacherFormData>;
}

export const usePreacherUpdateEffects = ({
  id,
  data,
  setIsLoadingData,
  preacherUpdateForm,
}: Options): void => {
  const district = preacherUpdateForm.watch('district');
  const isDirectRelationToPastor = preacherUpdateForm.watch('isDirectRelationToPastor');

  //* Set data
  useEffect(() => {
    preacherUpdateForm.setValue('firstName', data?.member?.firstName ?? '');
    preacherUpdateForm.setValue('lastName', data?.member?.lastName ?? '');
    preacherUpdateForm.setValue('gender', data?.member?.gender ?? '');
    preacherUpdateForm.setValue('originCountry', data?.member?.originCountry ?? '');
    preacherUpdateForm.setValue(
      'birthDate',
      new Date(String(data?.member?.birthDate).replace(/-/g, '/'))
    );
    preacherUpdateForm.setValue('maritalStatus', data?.member?.maritalStatus ?? '');
    preacherUpdateForm.setValue('numberChildren', String(data?.member?.numberChildren) ?? '0');
    preacherUpdateForm.setValue(
      'conversionDate',
      new Date(String(data?.member?.conversionDate).replace(/-/g, '/'))
    );
    preacherUpdateForm.setValue('email', data?.member?.email ?? '');
    preacherUpdateForm.setValue('phoneNumber', data?.member?.phoneNumber ?? '');
    preacherUpdateForm.setValue('country', data?.member?.country ?? '');
    preacherUpdateForm.setValue('department', data?.member?.department ?? '');
    preacherUpdateForm.setValue('province', data?.member?.province ?? '');
    preacherUpdateForm.setValue('district', data?.member?.district ?? '');
    preacherUpdateForm.setValue('urbanSector', data?.member?.urbanSector ?? '');
    preacherUpdateForm.setValue('address', data?.member?.address ?? '');
    preacherUpdateForm.setValue('referenceAddress', data?.member?.referenceAddress ?? '');
    preacherUpdateForm.setValue('roles', data?.member?.roles as MemberRole[]);
    preacherUpdateForm.setValue('theirSupervisor', data?.theirSupervisor?.id ?? '');
    preacherUpdateForm.setValue('recordStatus', data?.recordStatus);

    const timeoutId = setTimeout(() => {
      setIsLoadingData(false);
    }, 1200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  //* Controller district and urban sector
  useEffect(() => {
    preacherUpdateForm.resetField('urbanSector', {
      keepError: true,
    });
  }, [district]);

  //* Controller direct relation to pastor
  useEffect(() => {
    if (isDirectRelationToPastor) {
      preacherUpdateForm.resetField('theirCopastor', {
        keepError: true,
      });
    }

    if (!isDirectRelationToPastor) {
      preacherUpdateForm.resetField('theirPastor', {
        keepError: true,
      });
    }
  }, [isDirectRelationToPastor]);

  //* Generate dynamic url
  useEffect(() => {
    const originalUrl = window.location.href;

    if (id) {
      const url = new URL(window.location.href);
      url.pathname = `/preachers/update/${id}/edit`;

      window.history.replaceState({}, '', url);
    }

    return () => {
      window.history.replaceState({}, '', originalUrl);
    };
  }, [id]);
};
