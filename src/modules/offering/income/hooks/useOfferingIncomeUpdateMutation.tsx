/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';

import { type OfferingIncomeResponse } from '@/modules/offering/income/interfaces/offering-income-response.interface';
import {
  generateReceiptByOfferingIncomeId,
  updateOfferingIncome,
  type UpdateOfferingIncomeOptions,
} from '@/modules/offering/income/services/offering-income.service';

import {
  extractPath,
  extractPublicId,
} from '@/modules/offering/shared/helpers/extract-data-secure-url.helper';
import { MemberType } from '@/modules/offering/income/enums/member-type.enum';
import { type ErrorResponse } from '@/shared/interfaces/error-response.interface';
import { OfferingFileType } from '@/modules/offering/shared/enums/offering-file-type.enum';
import { convertPdfBlobToImage } from '@/modules/offering/income/helpers/convert-pdf-to-image';
import { deleteImage, uploadImages } from '@/modules/offering/shared/services/images-files.service';

interface Options {
  dialogClose: () => void;
  scrollToTop: () => void;
  imageUrls: string[];
  setIsInputDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteFileButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useOfferingIncomeUpdateMutation = ({
  dialogClose,
  scrollToTop,
  imageUrls,
  setIsInputDisabled,
  setIsSubmitButtonDisabled,
  setIsDeleteFileButtonDisabled,
}: Options): UseMutationResult<
  OfferingIncomeResponse,
  ErrorResponse,
  UpdateOfferingIncomeOptions,
  unknown
> => {
  //* Hooks (external libraries)
  const navigate = useNavigate();

  //* QueryClient
  const queryClient = useQueryClient();

  //* Mutation
  const mutation = useMutation({
    mutationFn: updateOfferingIncome,
    onError: (error: ErrorResponse) => {
      if (error.message !== 'Unauthorized') {
        toast.error(error.message, {
          position: 'top-center',
          className: 'justify-center',
        });

        //! Execute destroy if the form fails
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
    onSuccess: async (data) => {
      const generateReceiptPromise = await generateReceiptByOfferingIncomeId({
        id: data.id,
        generateReceipt: 'no',
        generationType: 'update',
      });

      const receiptPdfUrl = URL.createObjectURL(generateReceiptPromise.data);

      const receiptImage = await convertPdfBlobToImage(receiptPdfUrl);

      const { imageUrls: receiptImageUrls } = await uploadImages({
        files: [receiptImage] as any,
        fileType: OfferingFileType.Income,
        offeringType: data.type,
        offeringSubType: data.subType ?? null,
      });

      await deleteImage({
        publicId: extractPublicId(data.imageUrls[0]),
        path: extractPath(data.imageUrls[0]),
        secureUrl: data.imageUrls[0],
        fileType: OfferingFileType.Income,
      });

      await Promise.all([
        updateOfferingIncome({
          id: data.id,
          formData: {
            type: data.type,
            subType: data.subType,
            category: data.category,
            shift: data.shift,
            amount: data.amount,
            currency: data.currency,
            date: data.date,
            comments: data.comments,
            memberType: data.memberType,
            zoneId: data.zone?.id ?? undefined,
            familyGroupId: data.familyGroup?.id ?? undefined,
            memberId:
              data.memberType === MemberType.Pastor
                ? data?.pastor?.id
                : data.memberType === MemberType.Copastor
                  ? data.copastor?.id
                  : data.memberType === MemberType.Supervisor
                    ? data.supervisor?.id
                    : data.memberType === MemberType.Preacher
                      ? data.preacher?.id
                      : data.disciple?.id,
            churchId: data?.church?.id!,
            externalDonorId: data?.externalDonor?.id,
            recordStatus: data.recordStatus,
            imageUrls: [...receiptImageUrls],
          },
        }),
      ]);

      toast.success('Cambios guardados correctamente.', {
        position: 'top-center',
        className: 'justify-center',
      });

      setTimeout(() => {
        scrollToTop();
      }, 150);

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['offering-income-by-term'] });
      }, 700);

      setTimeout(() => {
        dialogClose();
        setIsInputDisabled(false);
      }, 1500);
    },
  });

  return mutation;
};
