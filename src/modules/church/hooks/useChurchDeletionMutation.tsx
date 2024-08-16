/* eslint-disable @typescript-eslint/no-floating-promises */

import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';

import { deleteChurch } from '@/modules/church/services';

import { type ErrorResponse } from '@/shared/interfaces';

interface Options {
  setIsButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useChurchDeletionMutation = ({
  setIsButtonDisabled,
  setIsCardOpen,
}: Options): UseMutationResult<void, ErrorResponse, string, unknown> => {
  const navigate = useNavigate();

  //* QueryClient
  const queryClient = useQueryClient();

  //* Mutation
  const mutation = useMutation({
    mutationFn: deleteChurch,
    onError: (error: ErrorResponse) => {
      if (error.message !== 'Unauthorized') {
        toast.error(error.message, {
          position: 'top-center',
          className: 'justify-center',
        });

        setTimeout(() => {
          setIsCardOpen(false);
          setIsButtonDisabled(false);
        }, 2000);
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
      toast.success('Registro eliminado correctamente.', {
        position: 'top-center',
        className: 'justify-center',
      });

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['churches-by-term'] });
      }, 1800);

      setTimeout(() => {
        setIsCardOpen(false);
      }, 2000);
    },
  });

  return mutation;
};
