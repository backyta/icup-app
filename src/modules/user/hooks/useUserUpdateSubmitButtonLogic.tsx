/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';
import { type UserFormData } from '@/modules/user/interfaces';

interface Options {
  userUpdateForm: UseFormReturn<UserFormData, any, UserFormData>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isInputDisabled: boolean;
}

export const useUserUpdateSubmitButtonLogic = ({
  userUpdateForm,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const firstName = userUpdateForm.watch('firstName');
  const lastName = userUpdateForm.watch('lastName');
  const email = userUpdateForm.watch('email');
  const gender = userUpdateForm.watch('gender');
  const roles = userUpdateForm.watch('roles');
  const recordStatus = userUpdateForm.watch('recordStatus');

  //* Effects
  useEffect(() => {
    if (
      userUpdateForm.formState.errors &&
      Object.values(userUpdateForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (firstName && lastName && email && roles && gender && !isInputDisabled) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (!firstName || !lastName || !email || !roles || !gender) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (roles?.length === 0) {
      setIsSubmitButtonDisabled(true);
    }
  }, [userUpdateForm.formState, firstName, lastName, email, roles, gender, recordStatus]);
};
