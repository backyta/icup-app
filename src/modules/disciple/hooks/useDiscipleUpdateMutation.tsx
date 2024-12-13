/* eslint-disable @typescript-eslint/no-floating-promises */

import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';

import { type ErrorResponse } from '@/shared/interfaces/error-response.interface';

import {
  updateDisciple,
  type UpdateDiscipleOptions,
} from '@/modules/disciple/services/disciple.service';
import { type DiscipleResponse } from '@/modules/disciple/interfaces/disciple-response.interface';

interface Options {
  dialogClose: () => void;
  scrollToTop: () => void;
  setIsInputDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRelationSelectDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDiscipleUpdateMutation = ({
  dialogClose,
  scrollToTop,
  setIsInputDisabled,
  setIsSubmitButtonDisabled,
  setIsRelationSelectDisabled,
}: Options): UseMutationResult<DiscipleResponse, ErrorResponse, UpdateDiscipleOptions, unknown> => {
  //* Hooks (external libraries)
  const navigate = useNavigate();

  //* QueryClient
  const queryClient = useQueryClient();

  //* Mutation
  const mutation = useMutation({
    mutationFn: updateDisciple,
    onError: (error: ErrorResponse) => {
      if (error.message !== 'Unauthorized') {
        toast.error(error.message, {
          position: 'top-center',
          className: 'justify-center',
        });

        setTimeout(() => {
          setIsInputDisabled(false);
          setIsRelationSelectDisabled(false);
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
      toast.success('Cambios guardados correctamente.', {
        position: 'top-center',
        className: 'justify-center',
      });

      setTimeout(() => {
        scrollToTop();
      }, 150);

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['disciples-by-term'] });
      }, 700);

      setTimeout(() => {
        dialogClose();
        setIsInputDisabled(false);
        setIsRelationSelectDisabled(false);
      }, 1500);
    },
  });

  return mutation;
};
