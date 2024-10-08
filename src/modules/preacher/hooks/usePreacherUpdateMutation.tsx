/* eslint-disable @typescript-eslint/no-floating-promises */

import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';

import { type ErrorResponse } from '@/shared/interfaces';

import { type PreacherResponse } from '@/modules/preacher/interfaces';
import { updatePreacher, type UpdatePreacherOptions } from '@/modules/preacher/services';

interface Options {
  onSubmit: () => void;
  onScroll: () => void;
  setIsInputDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRelationSelectDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCheckBoxDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const usePreacherUpdateMutation = ({
  onSubmit,
  onScroll,
  setIsInputDisabled,
  setIsSubmitButtonDisabled,
  setIsRelationSelectDisabled,
  setIsCheckBoxDisabled,
}: Options): UseMutationResult<PreacherResponse, ErrorResponse, UpdatePreacherOptions, unknown> => {
  //* Hooks (external libraries)
  const navigate = useNavigate();

  //* QueryClient
  const queryClient = useQueryClient();

  //* Mutation
  const mutation = useMutation({
    mutationFn: updatePreacher,
    onError: (error: ErrorResponse) => {
      if (error.message !== 'Unauthorized') {
        toast.error(error.message, {
          position: 'top-center',
          className: 'justify-center',
        });

        setTimeout(() => {
          setIsInputDisabled(false);
          setIsRelationSelectDisabled(false);
          setIsCheckBoxDisabled(false);
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
        queryClient.invalidateQueries({ queryKey: ['preachers-by-term'] });
      }, 700);

      setTimeout(() => {
        onSubmit();
        setIsRelationSelectDisabled(false);
        setIsCheckBoxDisabled(false);
        setIsInputDisabled(false);
      }, 1500);
    },
  });

  return mutation;
};
