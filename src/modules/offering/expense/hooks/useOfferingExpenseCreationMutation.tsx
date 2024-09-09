import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { type UseFormReturn } from 'react-hook-form';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';

import {
  type OfferingExpenseResponse,
  type OfferingExpenseFormData,
} from '@/modules/offering/expense/interfaces';
import { createOfferingExpense } from '@/modules/offering/expense/services';

import { type ErrorResponse } from '@/shared/interfaces';
import { type FilesProps } from '@/modules/offering/shared/interfaces';

interface Options {
  setFiles: React.Dispatch<React.SetStateAction<FilesProps[]>>;
  setIsInputDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  offeringExpenseCreationForm: UseFormReturn<OfferingExpenseFormData, any, OfferingExpenseFormData>;
}

export const useOfferingExpenseCreationMutation = ({
  setFiles,
  setIsInputDisabled,
  offeringExpenseCreationForm,
  setIsSubmitButtonDisabled,
}: Options): UseMutationResult<
  OfferingExpenseResponse,
  ErrorResponse,
  OfferingExpenseFormData,
  unknown
> => {
  //* Hooks (external libraries)
  const navigate = useNavigate();

  //* Mutation
  const mutation = useMutation({
    mutationFn: createOfferingExpense,
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
        offeringExpenseCreationForm.reset();
        setFiles([]);
      }, 1600);

      setTimeout(() => {
        navigate('/offerings/expenses');
      }, 2200);
    },
  });

  return mutation;
};
