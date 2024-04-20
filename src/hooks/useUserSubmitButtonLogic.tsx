/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect } from 'react';

import { type z } from 'zod';
import { type UseFormReturn } from 'react-hook-form';

import { type userSchema } from '@/app/user/validations';
import { type UserData } from '@/app/user/interfaces';

interface Options {
  formUser: UseFormReturn<UserData, any, UserData>;
  setIsSubmitButtonDisabled: (value: boolean) => void;
  setIsMessageErrorDisabled: (value: boolean) => void;
  setIsMessageErrorPasswordDisabled: (value: boolean) => void;
  setIsMessageErrorRolesDisabled: (value: boolean) => void;
  handleSubmit: (values: z.infer<typeof userSchema>) => void;
}

export const useUserSubmitButtonLogic = ({
  formUser,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  setIsMessageErrorPasswordDisabled,
  setIsMessageErrorRolesDisabled,
  handleSubmit,
}: Options): void => {
  // watchers
  const firstName = formUser.watch('firstName');
  const lastName = formUser.watch('lastName');
  const email = formUser.watch('emailAddress');
  const password = formUser.watch('password');
  const passwordConfirm = formUser.watch('passwordConfirm');
  const roles = formUser.watch('roles');
  const status = formUser.watch('status');

  // effects
  useEffect(() => {
    if (firstName && lastName && email && password && passwordConfirm && roles) {
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
  }, [firstName, lastName, email, password, passwordConfirm, roles, handleSubmit, status]);
};
