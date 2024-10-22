import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { type UseFormReturn } from 'react-hook-form';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';

import { type ErrorResponse } from '@/shared/interfaces';

import { createPastor } from '@/modules/pastor/services';
import { type PastorFormData, type PastorResponse } from '@/modules/pastor/interfaces';

interface Options {
  setIsInputDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  pastorCreationForm: UseFormReturn<PastorFormData, any, PastorFormData>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const usePastorCreationMutation = ({
  pastorCreationForm,
  setIsInputDisabled,
  setIsSubmitButtonDisabled,
}: Options): UseMutationResult<PastorResponse, ErrorResponse, PastorFormData, unknown> => {
  //* Hooks (external libraries)
  const navigate = useNavigate();

  //* Mutation
  const mutation = useMutation({
    mutationFn: createPastor,
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
      toast.success('Registro creado exitosamente.', {
        position: 'top-center',
        className: 'justify-center',
      });

      setTimeout(() => {
        setIsInputDisabled(false);
        setIsSubmitButtonDisabled(false);
      }, 1500);

      setTimeout(() => {
        pastorCreationForm.reset();
      }, 1600);

      setTimeout(() => {
        navigate('/pastors');
      }, 2000);
    },
  });

  return mutation;
};
