/* eslint-disable @typescript-eslint/no-floating-promises */

import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';

import { type ErrorResponse } from '@/shared/interfaces';

import { type FamilyGroupResponse } from '@/modules/family-group/interfaces';
import { updateFamilyGroup, type UpdateFamilyGroupOptions } from '@/modules/family-group/services';

interface Options {
  onSubmit: () => void;
  onScroll: () => void;
  setIsInputDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useFamilyGroupUpdateMutation = ({
  onSubmit,
  onScroll,
  setIsInputDisabled,
  setIsSubmitButtonDisabled,
}: Options): UseMutationResult<
  FamilyGroupResponse,
  ErrorResponse,
  UpdateFamilyGroupOptions,
  unknown
> => {
  const navigate = useNavigate();

  //* QueryClient
  const queryClient = useQueryClient();

  //* Mutation
  const mutation = useMutation({
    mutationFn: updateFamilyGroup,
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
      toast.success('Cambios guardados correctamente.', {
        position: 'top-center',
        className: 'justify-center',
      });

      setTimeout(() => {
        onScroll();
      }, 150);

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['family-groups-by-term'] });
      }, 500);

      setTimeout(() => {
        onSubmit();
        setIsInputDisabled(false);
      }, 1500);
    },
  });

  return mutation;
};
