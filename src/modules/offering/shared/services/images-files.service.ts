/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';
import { icupApi } from '@/api/icupApi';

import { type OfferingFileType } from '@/modules/offering/shared/enums';
import { type UploadImageResponse } from '@/modules/offering/shared/interfaces';

//* Upload Images
export interface UploadImagesOptions{
  files: File[],
  fileType: OfferingFileType,
  type: string,
  subType?: string | undefined | null,
}

export const uploadImages = async ({files, fileType, type, subType}:UploadImagesOptions): Promise<UploadImageResponse> => {
  try {
    const newFormData = new FormData();

    files.forEach((file) => {
      newFormData.append('files', file);
    });

    console.log(files);
    

    const {data} = await icupApi.post<UploadImageResponse>('/files/upload', newFormData ,{
      params: {
        fileType,
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
  fileType: OfferingFileType,
}

export const deleteImage = async ({publicId, path, secureUrl, fileType}: DeleteImageOptions): Promise<void> => {
  try {
    const {data} = await icupApi.delete(`/files/${publicId}`,{
      params: {
        path,
        secureUrl,
        fileType
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



