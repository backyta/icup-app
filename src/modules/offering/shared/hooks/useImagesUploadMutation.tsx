/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { useMutation, type UseMutationResult } from '@tanstack/react-query';

import { type UploadImageResponse } from '@/modules/offering/shared/interfaces';

import { uploadImages, type UploadImagesOptions } from '@/modules/offering/shared/services';

export const useImagesUploadMutation = (): UseMutationResult<
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
