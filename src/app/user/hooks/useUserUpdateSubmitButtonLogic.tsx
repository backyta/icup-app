/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';
import { type UserFormData } from '@/app/user/interfaces';

interface Options {
  formUpdateUser: UseFormReturn<UserFormData, any, UserFormData>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isInputDisabled: boolean;
}

export const useUserUpdateSubmitButtonLogic = ({
  formUpdateUser,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const firstName = formUpdateUser.watch('firstName');
  const lastName = formUpdateUser.watch('lastName');
  const email = formUpdateUser.watch('email');
  const gender = formUpdateUser.watch('gender');
  const roles = formUpdateUser.watch('roles');
  const recordStatus = formUpdateUser.watch('recordStatus');

  //* Effects
  useEffect(() => {
    if (
      formUpdateUser.formState.errors &&
      Object.values(formUpdateUser.formState.errors).length > 0
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
  }, [formUpdateUser.formState, firstName, lastName, email, roles, gender, recordStatus]);
};
