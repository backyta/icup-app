/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';
import { type UserFormData } from '@/modules/user/interfaces';

interface Options {
  userCreationForm: UseFormReturn<UserFormData, any, UserFormData>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorPasswordDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorRolesDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isInputDisabled: boolean;
}

export const useUserCreationSubmitButtonLogic = ({
  userCreationForm,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  setIsMessageErrorPasswordDisabled,
  setIsMessageErrorRolesDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const firstName = userCreationForm.watch('firstName');
  const lastName = userCreationForm.watch('lastName');
  const email = userCreationForm.watch('email');
  const password = userCreationForm.watch('password');
  const passwordConfirm = userCreationForm.watch('passwordConfirm');
  const roles = userCreationForm.watch('roles');
  const recordStatus = userCreationForm.watch('recordStatus');

  //* Effects
  useEffect(() => {
    if (
      userCreationForm.formState.errors &&
      Object.values(userCreationForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (
      firstName &&
      lastName &&
      email &&
      password &&
      passwordConfirm &&
      roles &&
      !isInputDisabled
    ) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
      setIsMessageErrorPasswordDisabled(false);
      setIsMessageErrorRolesDisabled(false);
    }

    if (!firstName || !lastName || !email || !password || !passwordConfirm || !roles) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (password !== passwordConfirm) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorPasswordDisabled(true);
    }

    if (roles?.length === 0) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorRolesDisabled(true);
    }
  }, [
    userCreationForm.formState,
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    roles,
    recordStatus,
  ]);
};
