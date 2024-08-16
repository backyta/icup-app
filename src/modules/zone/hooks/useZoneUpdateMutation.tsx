/* eslint-disable @typescript-eslint/no-floating-promises */

import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';

import { type ErrorResponse } from '@/shared/interfaces';

import { type ZoneResponse } from '@/modules/zone/interfaces';
import { updateZone, type UpdateZoneOptions } from '@/modules/zone/services';

interface Options {
  onSubmit: () => void;
  onScroll: () => void;
  setIsInputDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useZoneUpdateMutation = ({
  onSubmit,
  onScroll,
  setIsInputDisabled,
  setIsSubmitButtonDisabled,
}: Options): UseMutationResult<ZoneResponse, ErrorResponse, UpdateZoneOptions, unknown> => {
  const navigate = useNavigate();

  //* QueryClient
  const queryClient = useQueryClient();

  //* Mutation
  const mutation = useMutation({
    mutationFn: updateZone,
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
        queryClient.invalidateQueries({ queryKey: ['zones-by-term'] });
      }, 500);

      setTimeout(() => {
        onSubmit();
        setIsInputDisabled(false);
      }, 1500);
    },
  });

  return mutation;
};
