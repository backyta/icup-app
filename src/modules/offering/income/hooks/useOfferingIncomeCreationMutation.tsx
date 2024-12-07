/* eslint-disable @typescript-eslint/no-misused-promises */

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

import { deleteImage } from '@/modules/offering/shared/services';
import { OfferingFileType } from '@/modules/offering/shared/enums';
import { type FilesProps } from '@/modules/offering/shared/interfaces';
import { extractPath, extractPublicId } from '@/modules/offering/shared/helpers';

interface Options {
  setFiles: React.Dispatch<React.SetStateAction<FilesProps[]>>;
  setIsInputDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsInputMemberDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteFileButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  offeringIncomeCreationForm: UseFormReturn<OfferingIncomeFormData, any, OfferingIncomeFormData>;
  imageUrls: string[];
}

export const useOfferingIncomeCreationMutation = ({
  setFiles,
  setIsInputDisabled,
  setIsInputMemberDisabled,
  offeringIncomeCreationForm,
  setIsSubmitButtonDisabled,
  setIsDeleteFileButtonDisabled,
  imageUrls,
}: Options): UseMutationResult<
  OfferingIncomeResponse,
  ErrorResponse,
  OfferingIncomeFormData,
  unknown
> => {
  //* Hooks (external libraries)
  const navigate = useNavigate();

  //* Hooks
  const mutation = useMutation({
    mutationFn: createOfferingIncome,
    onError: (error: ErrorResponse) => {
      if (error.message !== 'Unauthorized') {
        toast.error(error.message, {
          position: 'top-center',
          className: 'justify-center',
        });

        //! Execute destroy if form fails
        imageUrls?.forEach(async (imageUrl) => {
          await deleteImage({
            publicId: extractPublicId(imageUrl),
            path: extractPath(imageUrl),
            secureUrl: imageUrl,
            fileType: OfferingFileType.Income,
          });
        });

        setTimeout(() => {
          setIsInputDisabled(false);
          setIsInputMemberDisabled(false);
          setIsSubmitButtonDisabled(false);
          setIsDeleteFileButtonDisabled(false);
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
    },
  });

  return mutation;
};
