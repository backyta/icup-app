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
    supervisorUpdateForm.setValue('firstName', data?.firstName ?? '');
    supervisorUpdateForm.setValue('lastName', data?.lastName ?? '');
    supervisorUpdateForm.setValue('gender', data?.gender ?? '');
    supervisorUpdateForm.setValue('originCountry', data?.originCountry ?? '');
    supervisorUpdateForm.setValue(
      'birthDate',
      new Date(String(data?.birthDate).replace(/-/g, '/'))
    );
    supervisorUpdateForm.setValue('maritalStatus', data?.maritalStatus ?? '');
    supervisorUpdateForm.setValue('numberChildren', String(data?.numberChildren) ?? '0');
    supervisorUpdateForm.setValue(
      'conversionDate',
      new Date(String(data?.conversionDate).replace(/-/g, '/'))
    );
    supervisorUpdateForm.setValue('email', data?.email ?? '');
    supervisorUpdateForm.setValue('phoneNumber', data?.phoneNumber ?? '');
    supervisorUpdateForm.setValue('country', data?.country ?? '');
    supervisorUpdateForm.setValue('department', data?.department ?? '');
    supervisorUpdateForm.setValue('province', data?.province ?? '');
    supervisorUpdateForm.setValue('district', data?.district ?? '');
    supervisorUpdateForm.setValue('urbanSector', data?.urbanSector ?? '');
    supervisorUpdateForm.setValue('address', data?.address ?? '');
    supervisorUpdateForm.setValue('referenceAddress', data?.referenceAddress ?? '');
    supervisorUpdateForm.setValue(
      'isDirectRelationToPastor',
      data?.isDirectRelationToPastor ?? undefined
    );
    supervisorUpdateForm.setValue('roles', data?.roles as MemberRole[]);
    supervisorUpdateForm.setValue('theirCopastor', data?.theirCopastor?.id ?? '');
    supervisorUpdateForm.setValue('recordStatus', data?.recordStatus);

    setTimeout(() => {
      setIsLoadingData(false);
    }, 1200);
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
      url.pathname = `/supervisors/update-supervisor/${id}/edit`;

      window.history.replaceState({}, '', url);
    }

    return () => {
      window.history.replaceState({}, '', originalUrl);
    };
  }, [id]);
};
