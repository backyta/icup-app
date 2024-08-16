/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import { type UseQueryResult } from '@tanstack/react-query';

import {
  type FamilyGroupResponse,
  type FamilyGroupPreacherUpdateFormData,
} from '@/modules/family-group/interfaces';
import { type PreacherResponse } from '@/modules/preacher/interfaces';

interface Options {
  id: string;
  data: FamilyGroupResponse | undefined;
  familyGroupPreacherUpdateForm: UseFormReturn<
    FamilyGroupPreacherUpdateFormData,
    any,
    FamilyGroupPreacherUpdateFormData
  >;
  preachersQuery: UseQueryResult<PreacherResponse[], Error>;
}

export const useFamilyGroupPreacherUpdateEffects = ({
  id,
  data,
  familyGroupPreacherUpdateForm,
  preachersQuery,
}: Options): void => {
  //* Watchers
  const newTheirPreacher = familyGroupPreacherUpdateForm.watch('newTheirPreacher');

  //* Set data
  useEffect(() => {
    familyGroupPreacherUpdateForm.setValue(
      'currentTheirPreacher',
      data?.theirPreacher?.id
        ? `${data?.theirPreacher?.firstName} ${data?.theirPreacher?.lastName}`
        : '❌ Sin Predicador'
    );
    familyGroupPreacherUpdateForm.setValue(
      'currentFamilyGroup',
      data?.familyGroupName ? data?.familyGroupName : '❌ Sin Grupo Familiar'
    );
  }, []);

  useEffect(() => {
    if (newTheirPreacher) {
      const familyGroupByPreacher = preachersQuery?.data?.find(
        (preacher) => newTheirPreacher === preacher.id
      );
      familyGroupPreacherUpdateForm.setValue(
        'newFamilyGroup',
        familyGroupByPreacher?.theirFamilyGroup?.id
          ? familyGroupByPreacher?.theirFamilyGroup?.familyGroupName
          : '❌ No existe grupo familiar'
      );
    }
  }, [newTheirPreacher]);

  //* Generate dynamic url
  useEffect(() => {
    const originalUrl = window.location.href;

    if (id) {
      const url = new URL(window.location.href);
      url.pathname = `/family-groups/update-family-group/${id}/exchange-preacher`;

      window.history.replaceState({}, '', url);
    }

    return () => {
      window.history.replaceState({}, '', originalUrl);
    };
  }, [id]);
};
