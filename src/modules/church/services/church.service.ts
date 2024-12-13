/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';
import { RecordOrder } from '@/shared/enums/record-order.enum';

import { ChurchSearchType } from '@/modules/church/enums/church-search-type.enum';
import { type ChurchResponse } from '@/modules/church/interfaces/church-response.interface';
import { type ChurchFormData, } from '@/modules/church/interfaces/church-form-data.interface';
import { type ChurchQueryParams } from '@/modules/church/interfaces/church-query-params.interface';

//* Create church
export const createChurch = async (formData:ChurchFormData ): Promise<ChurchResponse> => {
  try {
    const {data} = await icupApi.post<ChurchResponse>('/churches', formData)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

//* Get main church
export const getMainChurch = async (): Promise<ChurchResponse[]> => {
  try {
    const {data} = await icupApi<ChurchResponse[]>('/churches/main-church' , {
      params: {
        limit: 1,
        offset: 0,
        order: RecordOrder.Ascending
      },
    }
    );
  
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado, hable con el administrador')
  }
}

//* Get simple churches
export const getSimpleChurches = async ({isSimpleQuery}: {isSimpleQuery: boolean}): Promise<ChurchResponse[]> => {
  try {
    const {data} = await icupApi<ChurchResponse[]>('/churches' , {
      params: {
        order: 'ASC',
        isSimpleQuery: isSimpleQuery.toString()
      },
    }
    );
  
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado, hable con el administrador')
  }
}

//* Get churches (paginated)
export const getChurches = async ({limit, offset, all, order}: ChurchQueryParams): Promise<ChurchResponse[]> => {

 let result: ChurchResponse[];

  try {
    if (!all) {
      const {data} = await icupApi<ChurchResponse[]>('/churches' , {
        params: {
          limit,
          offset,
          order,
        },
      });
      
      result = data;
    }else {
      const {data} = await icupApi<ChurchResponse[]>('/churches' , {
        params: {
          order,
        },
      });
      result = data;
    }

    return result;

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado, hable con el administrador')
  }
}

// ? Get churches by term (paginated)
export const getChurchesByTerm = async ({ searchType, inputTerm, dateTerm, selectTerm, limit, offset, all, order}: ChurchQueryParams): Promise<ChurchResponse[] | undefined> => {

 let result: ChurchResponse[];

 //* Others types
 if (searchType === ChurchSearchType.ChurchName||
     searchType === ChurchSearchType.Department || 
     searchType === ChurchSearchType.Province || 
     searchType === ChurchSearchType.District || 
     searchType === ChurchSearchType.UrbanSector || 
     searchType === ChurchSearchType.Address
    ) {
    try {
      if (!all) {
        const {data} = await icupApi<ChurchResponse[]>(`/churches/${inputTerm}` , {
          params: {
            limit,
            offset,
            order,
            'search-type': searchType
          },
        });
        
        result = data;
      }else {
        const {data} = await icupApi<ChurchResponse[]>(`/churches/${inputTerm}` , {
          params: {
            order,
            'search-type': searchType
          },
        });
        result = data;
      }
    
      return result;
    
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw (error.response.data)
      }
      
      throw new Error('Ocurrió un error inesperado, hable con el administrador')
    }
 }

 //* Founding date
 if (searchType === ChurchSearchType.FoundingDate) {
   try {
     if (!all) {
       const {data} = await icupApi<ChurchResponse[]>(`/churches/${dateTerm}` , {
         params: {
           limit,
           offset,
           order,
           'search-type': searchType
         },
       });
       
       result = data;
     }else {
       const {data} = await icupApi<ChurchResponse[]>(`/churches/${dateTerm}` , {
         params: {
           order,
           'search-type': searchType
         },
       });
       result = data;
     }
  
     return result;
  
   } catch (error) {
     if (isAxiosError(error) && error.response) {
       throw (error.response.data)
     }
     
     throw new Error('Ocurrió un error inesperado, hable con el administrador')
   }
 }

 //* Record Status
 if (searchType === ChurchSearchType.RecordStatus) {
    try {
      if (!all) {
        const {data} = await icupApi<ChurchResponse[]>(`/churches/${selectTerm}` , {
          params: {
            limit,
            offset,
            order,
            'search-type': searchType
          },
        });

        result = data;
      }else {
        const {data} = await icupApi<ChurchResponse[]>(`/churches/${selectTerm}` , {
          params: {
            order,
            'search-type': searchType
          },
        });
        result = data;
      }
    
      return result;
    
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw (error.response.data)
      }
      
      throw new Error('Ocurrió un error inesperado, hable con el administrador')
    }
 }
}

//* Update church by ID
export interface UpdateChurchOptions {
  id: string;
  formData: ChurchFormData;
}

export const updateChurch = async ({id, formData}: UpdateChurchOptions ): Promise<ChurchResponse> => {
  try {
    const {data} = await icupApi.patch<ChurchResponse>(`/churches/${id}`, formData)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

//! Inactivate church by ID
export interface InactivateChurchOptions {
  id: string;
  churchInactivationCategory: string;
  churchInactivationReason: string;
}

export const inactivateChurch = async ({id, churchInactivationCategory, churchInactivationReason} : InactivateChurchOptions): Promise<void> => {
  try {
    const {data} = await icupApi.delete(`/churches/${id}`, {
      params: {
        churchInactivationCategory,
        churchInactivationReason,
      },
    })
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado, hable con el administrador')
  }
}


// ? CHURCH REPORTS
const openPdfInNewTab = (pdfBlob: Blob): void => {
  const pdfUrl = URL.createObjectURL(pdfBlob);
  const newTab = window.open(pdfUrl, '_blank');
  newTab?.focus();
}

export const getGeneralChurchesReport = async ({limit, offset, order}: ChurchQueryParams): Promise<void> => {
   try {
    const res = await icupApi<Blob>('/reports/churches' , {
      params: {
        limit,
        offset,
        order,
      },
      headers: {
      'Content-Type': 'application/pdf',
      },
      responseType: 'blob',
    });
    
    openPdfInNewTab(res.data);
    
   } catch (error) {
     if (isAxiosError(error) && error.response) {
       throw (error.response.data)
     }
     
     throw new Error('Ocurrió un error inesperado, hable con el administrador')
   }
 }

export const getChurchesReportByTerm = async ({ searchType, inputTerm, dateTerm, selectTerm, limit, offset, order}: ChurchQueryParams): Promise<void> => {

  let newTerm: string | undefined = '';
  
  const termMapping: Record<ChurchSearchType, string | undefined> = {
    [ChurchSearchType.ChurchName]: inputTerm,
    [ChurchSearchType.Department]: inputTerm,
    [ChurchSearchType.Province]: inputTerm,
    [ChurchSearchType.District]: inputTerm,
    [ChurchSearchType.UrbanSector]: inputTerm,
    [ChurchSearchType.Address]: inputTerm,
    [ChurchSearchType.FoundingDate]: dateTerm,
    [ChurchSearchType.RecordStatus]: selectTerm,
  };
  
  newTerm = termMapping[searchType as ChurchSearchType];

   try {
    const res = await icupApi<Blob>(`/reports/churches/${newTerm}` , {
      params: {
        limit,
        offset,
        order,
        'search-type': searchType
      },
      headers: {
      'Content-Type': 'application/pdf',
      },
      responseType: 'blob',
    });
    
    openPdfInNewTab(res.data);
    
   } catch (error) {
     if (isAxiosError(error) && error.response) {
       throw (error.response.data)
     }
     
     throw new Error('Ocurrió un error inesperado, hable con el administrador')
   }
 }
 


