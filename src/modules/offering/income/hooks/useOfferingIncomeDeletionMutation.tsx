/* eslint-disable @typescript-eslint/no-floating-promises */

import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';

import {
  deleteOfferingIncome,
  type DeleteOfferingIncomeOptions,
} from '@/modules/offering/income/services';

import { type ErrorResponse } from '@/shared/interfaces';

interface Options {
  setIsCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSelectInputDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsInputDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useOfferingIncomeDeletionMutation = ({
  setIsCardOpen,
  setIsButtonDisabled,
  setIsSelectInputDisabled,
  setIsInputDisabled,
}: Options): UseMutationResult<void, ErrorResponse, DeleteOfferingIncomeOptions, unknown> => {
  //* Hooks (external libraries)
  const navigate = useNavigate();

  //* QueryClient
  const queryClient = useQueryClient();

  //* Mutation
  const mutation = useMutation({
    mutationFn: deleteOfferingIncome,
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
        queryClient.invalidateQueries({ queryKey: ['offerings-income-by-term'] });
      }, 1000);

      setTimeout(() => {
        setIsCardOpen(false);
        setIsSelectInputDisabled(false);
        setIsInputDisabled(false);
      }, 2000);
    },
  });

  return mutation;
};
