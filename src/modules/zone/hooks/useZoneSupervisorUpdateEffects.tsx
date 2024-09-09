/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import { type UseQueryResult } from '@tanstack/react-query';

import { type SupervisorResponse } from '@/modules/supervisor/interfaces';
import { type ZoneResponse, type ZoneSupervisorUpdateFormData } from '@/modules/zone/interfaces';

interface Options {
  id: string;
  data: ZoneResponse | undefined;
  zoneSupervisorUpdateForm: UseFormReturn<
    ZoneSupervisorUpdateFormData,
    any,
    ZoneSupervisorUpdateFormData
  >;
  supervisorsQuery: UseQueryResult<SupervisorResponse[], Error>;
}

export const useZoneSupervisorUpdateEffects = ({
  id,
  data,
  zoneSupervisorUpdateForm,
  supervisorsQuery,
}: Options): void => {
  //* Watchers
  const newTheirSupervisor = zoneSupervisorUpdateForm.watch('newTheirSupervisor');

  //* Set data
  useEffect(() => {
    zoneSupervisorUpdateForm.setValue(
      'currentTheirSupervisor',
      data?.theirSupervisor?.id
        ? `${data?.theirSupervisor?.firstName} ${data?.theirSupervisor?.lastName}`
        : '❌ Sin Supervisor'
    );
    zoneSupervisorUpdateForm.setValue(
      'currentZone',
      data?.zoneName ? data?.zoneName : '❌ Sin Zona'
    );
  }, []);

  useEffect(() => {
    if (newTheirSupervisor) {
      const zoneBySupervisor = supervisorsQuery?.data?.find(
        (supervisor) => newTheirSupervisor === supervisor.id
      );
      zoneSupervisorUpdateForm.setValue(
        'newZone',
        zoneBySupervisor?.theirZone?.id
          ? zoneBySupervisor?.theirZone?.zoneName
          : '❌ No existe zona'
      );
    }
  }, [newTheirSupervisor]);

  //* Generate dynamic url
  useEffect(() => {
    const originalUrl = window.location.href;

    if (id) {
      const url = new URL(window.location.href);
      url.pathname = `/zones/update-zone/${id}/exchange-supervisor`;

      window.history.replaceState({}, '', url);
    }

    return () => {
      window.history.replaceState({}, '', originalUrl);
    };
  }, [id]);
};