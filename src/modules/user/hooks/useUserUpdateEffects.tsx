/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import { type UserRole } from '@/modules/user/enums';

import { type UserResponse, type UserFormData } from '@/modules/user/interfaces';

interface Options {
  id: string;
  data: UserResponse | undefined;
  setIsLoadingData: React.Dispatch<React.SetStateAction<boolean>>;
  userUpdateForm: UseFormReturn<UserFormData, any, UserFormData>;
}

export const useUserUpdateEffects = ({
  id,
  data,
  setIsLoadingData,
  userUpdateForm,
}: Options): void => {
  //* Set data
  useEffect(() => {
    userUpdateForm.setValue('firstName', data?.firstName ?? '');
    userUpdateForm.setValue('lastName', data?.lastName ?? '');
    userUpdateForm.setValue('gender', data?.gender ?? '');
    userUpdateForm.setValue('email', data?.email ?? '');
    userUpdateForm.setValue('roles', data?.roles as UserRole[]);
    userUpdateForm.setValue('recordStatus', data?.recordStatus);

    setTimeout(() => {
      setIsLoadingData(false);
    }, 1200);
  }, []);

  //* Generate dynamic url
  useEffect(() => {
    const originalUrl = window.location.href;

    if (id) {
      const url = new URL(window.location.href);
      url.pathname = `/users/update-user/${id}/edit`;

      window.history.replaceState({}, '', url);
    }

    return () => {
      window.history.replaceState({}, '', originalUrl);
    };
  }, [id]);
};
