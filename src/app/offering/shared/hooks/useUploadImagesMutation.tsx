/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { useMutation, type UseMutationResult } from '@tanstack/react-query';

import { uploadImages, type UploadImagesOptions } from '@/app/offering/shared/services';
import { type UploadImageResponse } from '@/app/offering/shared/interfaces';

export const useUploadImagesMutation = (): UseMutationResult<
  UploadImageResponse,
  Error,
  UploadImagesOptions,
  unknown
> => {
  const mutation = useMutation({
    mutationFn: uploadImages,
  });

  return mutation;
};
