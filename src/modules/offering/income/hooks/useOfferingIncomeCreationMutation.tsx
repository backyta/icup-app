import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { type UseFormReturn } from 'react-hook-form';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';

import {
  type OfferingIncomeResponse,
  type OfferingIncomeFormData,
} from '@/modules/offering/income/interfaces';
import { createOfferingIncome } from '@/modules/offering/income/services';

import { type ErrorResponse } from '@/shared/interfaces';
import { type FilesProps } from '@/modules/offering/shared/interfaces';

interface Options {
  offeringIncomeCreationForm: UseFormReturn<OfferingIncomeFormData, any, OfferingIncomeFormData>;
  setIsInputDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setFiles: React.Dispatch<React.SetStateAction<FilesProps[]>>;
}

export const useOfferingIncomeCreationMutation = ({
  offeringIncomeCreationForm,
  setIsInputDisabled,
  setIsSubmitButtonDisabled,
  setFiles,
}: Options): UseMutationResult<
  OfferingIncomeResponse,
  ErrorResponse,
  OfferingIncomeFormData,
  unknown
> => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createOfferingIncome,
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
        offeringIncomeCreationForm.reset();
        setFiles([]);
      }, 1600);

      setTimeout(() => {
        navigate('/offerings/income');
      }, 2400);
    },
  });

  return mutation;
};
