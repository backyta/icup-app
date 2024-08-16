/* eslint-disable @typescript-eslint/no-floating-promises */

import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';

import { type UserResponse } from '@/modules/user/interfaces';
import { updateUser, type UpdateUserOptions } from '@/modules/user/services';

import { type ErrorResponse } from '@/shared/interfaces';

interface Options {
  onSubmit: () => void;
  onScroll: () => void;
  setIsInputDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useUserUpdateMutation = ({
  onSubmit,
  onScroll,
  setIsInputDisabled,
  setIsSubmitButtonDisabled,
}: Options): UseMutationResult<UserResponse, ErrorResponse, UpdateUserOptions, unknown> => {
  const navigate = useNavigate();

  //* QueryClient
  const queryClient = useQueryClient();

  //* Mutation
  const mutation = useMutation({
    mutationFn: updateUser,
    onError: (error: ErrorResponse) => {
      if (error.message !== 'Unauthorized') {
        toast.error(error.message, {
          position: 'top-center',
          className: 'justify-center',
        });

        setTimeout(() => {
          setIsInputDisabled(false);
          setIsSubmitButtonDisabled(false);
        }, 1500);
      }

      if (error.message === 'Unauthorized') {
        toast.error('Operación rechazada, el token expiro ingresa nuevamente.', {
          position: 'top-center',
          className: 'justify-center',
        });

        setTimeout(() => {
          navigate('/');
        }, 3500);
      }
    },
    onSuccess: () => {
      toast.success('Cambios guardados correctamente', {
        position: 'top-center',
        className: 'justify-center',
      });

      setTimeout(() => {
        onScroll();
      }, 150);

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['users-by-term'] });
      }, 500);

      setTimeout(() => {
        onSubmit();
        setIsInputDisabled(false);
      }, 1500);
    },
  });

  return mutation;
};
