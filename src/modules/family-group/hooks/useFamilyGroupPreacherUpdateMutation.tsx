/* eslint-disable @typescript-eslint/no-floating-promises */

import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';

import { type ErrorResponse } from '@/shared/interfaces/error-response.interface';

import {
  updateFamilyGroup,
  type UpdateFamilyGroupOptions,
} from '@/modules/family-group/services/family-group.service';
import { type FamilyGroupResponse } from '@/modules/family-group/interfaces/family-group-response.interface';

interface Options {
  dialogClose: () => void;
  scrollToTop: () => void;
  data: FamilyGroupResponse | undefined;
  setIsInputDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsInputTheirPreacherDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useFamilyGroupPreacherUpdateMutation = ({
  dialogClose,
  scrollToTop,
  data,
  setIsInputDisabled,
  setIsSubmitButtonDisabled,
  setIsInputTheirPreacherDisabled,
}: Options): UseMutationResult<
  FamilyGroupResponse,
  ErrorResponse,
  UpdateFamilyGroupOptions,
  unknown
> => {
  //* Hooks (external libraries)
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
          setIsInputDisabled(true);
          setIsSubmitButtonDisabled(false);
          setIsInputTheirPreacherDisabled(false);
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
        scrollToTop();
      }, 150);

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['family-groups-by-term'] });
        // New refetch in exchange preachers (new)
        queryClient.invalidateQueries({ queryKey: ['preachers-by-zone', data?.theirZone?.id] });
      }, 700);

      setTimeout(() => {
        dialogClose();
        setIsInputDisabled(false);
      }, 1500);
    },
  });

  return mutation;
};
