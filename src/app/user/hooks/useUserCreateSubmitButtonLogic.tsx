/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import { type UserFormData } from '@/app/user/interfaces';

interface Options {
  formCreateUser: UseFormReturn<UserFormData, any, UserFormData>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorPasswordDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorRolesDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isInputDisabled: boolean;
}

export const useUserCreateSubmitButtonLogic = ({
  formCreateUser,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  setIsMessageErrorPasswordDisabled,
  setIsMessageErrorRolesDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const firstName = formCreateUser.watch('firstName');
  const lastName = formCreateUser.watch('lastName');
  const email = formCreateUser.watch('email');
  const password = formCreateUser.watch('password');
  const passwordConfirm = formCreateUser.watch('passwordConfirm');
  const roles = formCreateUser.watch('roles');
  const recordStatus = formCreateUser.watch('recordStatus');

  //* Effects
  useEffect(() => {
    if (
      formCreateUser.formState.errors &&
      Object.values(formCreateUser.formState.errors).length > 0
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
    formCreateUser.formState,
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    roles,
    recordStatus,
  ]);
};
