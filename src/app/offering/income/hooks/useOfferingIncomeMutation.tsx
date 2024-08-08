import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { type UseFormReturn } from 'react-hook-form';

import {
  type OfferingIncomeResponse,
  type OfferingIncomeFormData,
} from '@/app/offering/income/interfaces';
import { createOfferingIncome } from '@/app/offering/income/services';

import { type ErrorResponse } from '@/shared/interfaces';
import { type FilesProps } from '@/app/offering/shared/interfaces';

interface Options {
  offeringIncomeCreateForm: UseFormReturn<OfferingIncomeFormData, any, OfferingIncomeFormData>;
  setIsInputDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setFiles: React.Dispatch<React.SetStateAction<FilesProps[]>>;
}

export const useOfferingIncomeMutation = ({
  offeringIncomeCreateForm,
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
  //* Mutation
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
        offeringIncomeCreateForm.reset();
        setFiles([]);
      }, 1600);

      setTimeout(() => {
        navigate('/offerings/income');
      }, 2600);
    },
  });

  return mutation;
};
