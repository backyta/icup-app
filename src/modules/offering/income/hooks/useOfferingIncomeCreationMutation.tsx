/* eslint-disable @typescript-eslint/no-misused-promises */

import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { type UseFormReturn } from 'react-hook-form';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';

import { type OfferingIncomeResponse } from '@/modules/offering/income/interfaces/offering-income-response.interface';
import { type OfferingIncomeFormData } from '@/modules/offering/income/interfaces/offering-income-form-data.interface';

import {
  createOfferingIncome,
  generateReceiptByOfferingIncomeId,
  updateOfferingIncome,
} from '@/modules/offering/income/services/offering-income.service';

import {
  extractPath,
  extractPublicId,
} from '@/modules/offering/shared/helpers/extract-data-secure-url.helper';

import { type ErrorResponse } from '@/shared/interfaces/error-response.interface';

import { deleteImage, uploadImages } from '@/modules/offering/shared/services/images-files.service';
import { OfferingFileType } from '@/modules/offering/shared/enums/offering-file-type.enum';
import { type FilesProps } from '@/modules/offering/shared/interfaces/files-props.interface';
import { convertPdfBlobToImage } from '../helpers/convert-pdf-to-image';
import { MemberType } from '../enums/member-type.enum';

interface Options {
  imageUrls: string[];
  generateReceipt?: string;
  setFiles: React.Dispatch<React.SetStateAction<FilesProps[]>>;
  setIsInputDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsInputMemberDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteFileButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  offeringIncomeCreationForm: UseFormReturn<OfferingIncomeFormData, any, undefined>;
}

export const useOfferingIncomeCreationMutation = ({
  setFiles,
  setIsInputDisabled,
  setIsInputMemberDisabled,
  offeringIncomeCreationForm,
  setIsSubmitButtonDisabled,
  setIsDeleteFileButtonDisabled,
  imageUrls,
  generateReceipt,
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

        //! Execute destroy if form fails (upload and destroy images if throw error)
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
        }, 2000);
      }
    },
    onSuccess: async (data) => {
      toast.success('Registro creado exitosamente.', {
        position: 'top-center',
        className: 'justify-center',
      });

      setTimeout(() => {
        navigate('/offerings/income');
      }, 5000);

      setTimeout(() => {
        setFiles([]);
        offeringIncomeCreationForm.reset();
      }, 5100);

      if (generateReceipt) {
        //! OLD RECEIPT
        const oldReceiptResponse = await generateReceiptByOfferingIncomeId({
          id: data.id,
          generateReceipt: 'no',
        });

        const oldReceiptPdfUrl = URL.createObjectURL(oldReceiptResponse.data);
        const oldReceiptImage = await convertPdfBlobToImage(oldReceiptPdfUrl);

        let oldReceiptImages = [oldReceiptImage];

        const { imageUrls: oldReceiptImageUrls } = await uploadImages({
          files: oldReceiptImages as any,
          fileType: OfferingFileType.Income,
          offeringType: data.type,
          offeringSubType: data.subType ?? null,
        });

        await updateOfferingIncome({
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
            imageUrls: oldReceiptImageUrls,
          },
        });

        //* VALID RECEIPT
        const newReceiptResponse = await generateReceiptByOfferingIncomeId({
          id: data.id,
          generateReceipt,
        });

        const newReceiptPdfUrl = URL.createObjectURL(newReceiptResponse.data);
        const newReceiptImage = await convertPdfBlobToImage(newReceiptPdfUrl);

        let newReceiptImages = [newReceiptImage];

        const { imageUrls: newReceiptImageUrls } = await uploadImages({
          files: newReceiptImages as any,
          fileType: OfferingFileType.Income,
          offeringType: data.type,
          offeringSubType: data.subType ?? null,
        });

        await updateOfferingIncome({
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
            imageUrls: newReceiptImageUrls,
          },
        });

        await deleteImage({
          publicId: extractPublicId(oldReceiptImageUrls[0]),
          path: extractPath(oldReceiptImageUrls[0]),
          secureUrl: oldReceiptImageUrls[0],
          fileType: OfferingFileType.Income,
        });
      }
    },
  });

  return mutation;
};
