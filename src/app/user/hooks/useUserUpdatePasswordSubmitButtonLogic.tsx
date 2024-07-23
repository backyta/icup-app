/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';
import { type UserPasswordUpdateFormData } from '@/app/user/interfaces';

interface Options {
  formUpdatePasswordUser: UseFormReturn<
    UserPasswordUpdateFormData,
    any,
    UserPasswordUpdateFormData
  >;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorPasswordDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isInputDisabled: boolean;
}

export const useUserUpdatePasswordSubmitButtonLogic = ({
  formUpdatePasswordUser,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  setIsMessageErrorPasswordDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const currentPassword = formUpdatePasswordUser.watch('currentPassword');
  const newPassword = formUpdatePasswordUser.watch('newPassword');
  const newPasswordConfirm = formUpdatePasswordUser.watch('newPasswordConfirm');

  //* Effects
  useEffect(() => {
    if (
      formUpdatePasswordUser.formState.errors &&
      Object.values(formUpdatePasswordUser.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (currentPassword && newPassword && newPasswordConfirm && !isInputDisabled) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
      setIsMessageErrorPasswordDisabled(false);
    }

    if (!currentPassword || !newPassword || !newPasswordConfirm) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (newPassword !== newPasswordConfirm) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorPasswordDisabled(true);
    }
  }, [formUpdatePasswordUser.formState, currentPassword, newPassword, newPasswordConfirm]);
};
