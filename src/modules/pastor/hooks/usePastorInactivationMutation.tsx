/* eslint-disable @typescript-eslint/no-floating-promises */

import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';

import {
  inactivatePastor,
  type InactivatePastorOptions,
} from '@/modules/pastor/services/pastor.service';

import { type ErrorResponse } from '@/shared/interfaces/error-response.interface';

interface Options {
  scrollToTop: () => void;
  setIsCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSelectInputDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const usePastorInactivationMutation = ({
  scrollToTop,
  setIsCardOpen,
  setIsButtonDisabled,
  setIsSelectInputDisabled,
}: Options): UseMutationResult<void, ErrorResponse, InactivatePastorOptions, unknown> => {
  //* Hooks (external libraries)
  const navigate = useNavigate();

  //* QueryClient
  const queryClient = useQueryClient();

  //* Mutation
  const mutation = useMutation({
    mutationFn: inactivatePastor,
    onError: (error: ErrorResponse) => {
      if (error.message !== 'Unauthorized') {
        toast.error(error.message, {
          position: 'top-center',
          className: 'justify-center',
        });

        setTimeout(() => {
          setIsCardOpen(true);
          setIsButtonDisabled(false);
          setIsSelectInputDisabled(false);
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
        scrollToTop();
      }, 150);

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['pastors-by-term'] });
      }, 1000);

      setTimeout(() => {
        setIsCardOpen(false);
        setIsSelectInputDisabled(false);
        setIsButtonDisabled(false);
      }, 2000);
    },
  });

  return mutation;
};
