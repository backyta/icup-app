/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import { type MemberRole } from '@/shared/enums';
import { type SupervisorResponse, type SupervisorFormData } from '@/modules/supervisor/interfaces';

interface Options {
  id: string;
  data: SupervisorResponse | undefined;
  setIsLoadingData: React.Dispatch<React.SetStateAction<boolean>>;
  supervisorUpdateForm: UseFormReturn<SupervisorFormData, any, SupervisorFormData>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useSupervisorUpdateEffects = ({
  id,
  data,
  setIsLoadingData,
  supervisorUpdateForm,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
}: Options): void => {
  const district = supervisorUpdateForm.watch('district');
  const theirPastor = supervisorUpdateForm.watch('theirPastor');
  const isDirectRelationToPastor = supervisorUpdateForm.watch('isDirectRelationToPastor');

  //* Set data
  useEffect(() => {
    supervisorUpdateForm.setValue('firstName', data?.member?.firstName ?? '');
    supervisorUpdateForm.setValue('lastName', data?.member?.lastName ?? '');
    supervisorUpdateForm.setValue('gender', data?.member?.gender ?? '');
    supervisorUpdateForm.setValue('originCountry', data?.member?.originCountry ?? '');
    supervisorUpdateForm.setValue(
      'birthDate',
      new Date(String(data?.member?.birthDate).replace(/-/g, '/'))
    );
    supervisorUpdateForm.setValue('maritalStatus', data?.member?.maritalStatus ?? '');
    supervisorUpdateForm.setValue('numberChildren', String(data?.member?.numberChildren) ?? '0');
    supervisorUpdateForm.setValue(
      'conversionDate',
      new Date(String(data?.member?.conversionDate).replace(/-/g, '/'))
    );
    supervisorUpdateForm.setValue('email', data?.member?.email ?? '');
    supervisorUpdateForm.setValue('phoneNumber', data?.member?.phoneNumber ?? '');
    supervisorUpdateForm.setValue('country', data?.member?.country ?? '');
    supervisorUpdateForm.setValue('department', data?.member?.department ?? '');
    supervisorUpdateForm.setValue('province', data?.member?.province ?? '');
    supervisorUpdateForm.setValue('district', data?.member?.district ?? '');
    supervisorUpdateForm.setValue('urbanSector', data?.member?.urbanSector ?? '');
    supervisorUpdateForm.setValue('address', data?.member?.address ?? '');
    supervisorUpdateForm.setValue('referenceAddress', data?.member?.referenceAddress ?? '');
    supervisorUpdateForm.setValue(
      'isDirectRelationToPastor',
      data?.isDirectRelationToPastor ?? undefined
    );
    supervisorUpdateForm.setValue('roles', data?.member?.roles as MemberRole[]);
    supervisorUpdateForm.setValue('theirCopastor', data?.theirCopastor?.id ?? '');
    supervisorUpdateForm.setValue('recordStatus', data?.recordStatus);

    const timeoutId = setTimeout(() => {
      setIsLoadingData(false);
    }, 1200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  //* Controller district and urban sector
  useEffect(() => {
    supervisorUpdateForm.resetField('urbanSector', {
      keepError: true,
    });
  }, [district]);

  //* Controller direct relation to pastor
  useEffect(() => {
    if (isDirectRelationToPastor) {
      supervisorUpdateForm.resetField('theirCopastor', {
        keepError: true,
      });
    }

    if (!isDirectRelationToPastor) {
      supervisorUpdateForm.resetField('theirPastor', {
        keepError: true,
      });
    }
  }, [isDirectRelationToPastor]);

  useEffect(() => {
    if (isDirectRelationToPastor && !theirPastor) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }
  }, [isDirectRelationToPastor]);

  //* Generate dynamic url
  useEffect(() => {
    const originalUrl = window.location.href;

    if (id) {
      const url = new URL(window.location.href);
      url.pathname = `/supervisors/update/${id}/edit`;

      window.history.replaceState({}, '', url);
    }

    return () => {
      window.history.replaceState({}, '', originalUrl);
    };
  }, [id]);
};
