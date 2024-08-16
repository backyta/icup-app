/* eslint-disable @typescript-eslint/no-floating-promises */

import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';

import { type ErrorResponse } from '@/shared/interfaces';

import { type SupervisorResponse } from '@/modules/supervisor/interfaces';
import { updateSupervisor, type UpdateSupervisorOptions } from '@/modules/supervisor/services';

interface Options {
  onSubmit: () => void;
  onScroll: () => void;
  setIsInputDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRelationSelectDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useSupervisorUpdateMutation = ({
  onSubmit,
  onScroll,
  setIsInputDisabled,
  setIsSubmitButtonDisabled,
  setIsRelationSelectDisabled,
}: Options): UseMutationResult<
  SupervisorResponse,
  ErrorResponse,
  UpdateSupervisorOptions,
  unknown
> => {
  const navigate = useNavigate();
  //* QueryClient
  const queryClient = useQueryClient();

  //* Mutation
  const mutation = useMutation({
    mutationFn: updateSupervisor,
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
        onScroll();
      }, 150);

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['supervisors-by-term'] });
      }, 500);

      setTimeout(() => {
        onSubmit();
        setIsRelationSelectDisabled(false);
        setIsInputDisabled(false);
      }, 1500);
    },
  });

  return mutation;
};
