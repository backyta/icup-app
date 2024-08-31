/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';
import { icupApi } from '@/api/icupApi';

import { type UploadImageResponse } from '@/modules/offering/shared/interfaces';

//* Upload Images
export interface UploadImagesOptions{
  files: File[],
  action: 'income' | 'expenses',
  type: string,
  subType?: string | undefined | null,
}

export const uploadImages = async ({files, action, type, subType}:UploadImagesOptions): Promise<UploadImageResponse> => {
  try {
    const newFormData = new FormData();

    files.forEach((file) => {
      newFormData.append('files', file);
    });

    const {data} = await icupApi.post<UploadImageResponse>('/files/upload', newFormData ,{
      params: {
        action,
        type,
        subType: !subType ? null : subType 
      },
    })
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

//! Delete Image
export interface DeleteImageOptions{
  publicId: string,
  path: string,
  secureUrl: string,
}

export const deleteImage = async ({publicId, path, secureUrl}: DeleteImageOptions): Promise<void> => {
  try {
    const {data} = await icupApi.delete(`/files/${publicId}`,{
      params: {
        path,
        secureUrl
      },
    })
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}



