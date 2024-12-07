/* eslint-disable @typescript-eslint/no-floating-promises */

import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';

import {
  inactivateOfferingIncome,
  type InactivateOfferingIncomeOptions,
} from '@/modules/offering/income/services';

import { type ErrorResponse } from '@/shared/interfaces';

interface Options {
  dialogClose: () => void;
  scrollToTop: () => void;
  setIsButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsInputDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useOfferingIncomeCurrencyExchangeMutation = ({
  dialogClose,
  scrollToTop,
  setIsButtonDisabled,
  setIsInputDisabled,
}: Options): UseMutationResult<void, ErrorResponse, InactivateOfferingIncomeOptions, unknown> => {
  //* Hooks (external libraries)
  const navigate = useNavigate();

  //* QueryClient
  const queryClient = useQueryClient();

  //* Mutation
  const mutation = useMutation({
    mutationFn: inactivateOfferingIncome,
    onError: (error: ErrorResponse) => {
      if (error.message !== 'Unauthorized') {
        toast.error(error.message, {
          position: 'top-center',
          className: 'justify-center',
        });

        setTimeout(() => {
          setIsInputDisabled(false);
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
        scrollToTop();
      }, 150);

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['offering-income-by-term'] });
        dialogClose();
        setIsInputDisabled(false);
      }, 1200);
    },
  });

  return mutation;
};
