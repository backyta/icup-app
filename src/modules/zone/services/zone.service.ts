/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';

import { RecordOrder } from '@/shared/enums';
import { ZoneSearchType } from '@/modules/zone/enums';
import { type ZoneFormData, type ZoneResponse, type ZoneQueryParams, type ZoneSupervisorUpdateFormData } from '@/modules/zone/interfaces';

//* Create zone
export const createZone = async (formData:ZoneFormData ): Promise<ZoneResponse> => {
  try {
    const {data} = await icupApi.post<ZoneResponse>('/zones', formData)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

//* Get simple zones
export const getSimpleZones = async ({churchId, isSimpleQuery }:{churchId?: string; isSimpleQuery: boolean }): Promise<ZoneResponse[]> => {
  try {
    const {data} = await icupApi<ZoneResponse[]>('/zones' , {
      params: {
        order: RecordOrder.Ascending,
        isSimpleQuery: isSimpleQuery.toString(),
        churchId
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

//* Get zones (paginated)
export const getZones = async ({limit, offset, all, order, churchId}: ZoneQueryParams): Promise<ZoneResponse[]> => {

 let result: ZoneResponse[];

  try {
    if (!all) {
      const {data} = await icupApi<ZoneResponse[]>('/zones' , {
        params: {
          limit,
          offset,
          order,
          churchId,
        },
      });
      
      result = data;
    }else {
      const {data} = await icupApi<ZoneResponse[]>('/zones' , {
        params: {
          order,
          churchId,
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

// ? Get zones by term (paginated)
export const getZonesByTerm = async ({ searchType, inputTerm, selectTerm, limit, offset, all, order, churchId}: ZoneQueryParams): Promise<ZoneResponse[] | undefined> => {

 let result: ZoneResponse[];

 if (searchType === ZoneSearchType.ZoneName||
     searchType === ZoneSearchType.Country || 
     searchType === ZoneSearchType.Department || 
     searchType === ZoneSearchType.Province || 
     searchType === ZoneSearchType.District
    ) {
    try {
      if (!all) {
        const {data} = await icupApi<ZoneResponse[]>(`/zones/${inputTerm}` , {
          params: {
            limit,
            offset,
            order,
            churchId,
            'search-type': searchType
          },
        });
        
        result = data;
      }else {
        const {data} = await icupApi<ZoneResponse[]>(`/zones/${inputTerm}` , {
          params: {
            order,
            churchId,
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

 if (searchType === ZoneSearchType.RecordStatus) {
    try {
      if (!all) {
        const {data} = await icupApi<ZoneResponse[]>(`/zones/${selectTerm}` , {
          params: {
            limit,
            offset,
            order,
            churchId,
            'search-type': searchType
          },
        });
        
        result = data;
      }else {
        const {data} = await icupApi<ZoneResponse[]>(`/zones/${selectTerm}` , {
          params: {
            order,
            churchId,
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

//* Update zone by ID
export interface UpdateZoneOptions {
  id: string;
  formData: ZoneFormData | ZoneSupervisorUpdateFormData;
}

export const updateZone = async ({id, formData}: UpdateZoneOptions ): Promise<ZoneResponse> => {
  try {
    const {data} = await icupApi.patch<ZoneResponse>(`/zones/${id}`, formData)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

//! Delete zone by ID
export const deleteZone = async (id: string ): Promise<void> => {
  try {
    const {data} = await icupApi.delete(`/zones/${id}`)
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado, hable con el administrador')
  }
}

// ? ZONE REPORTS
const openPdfInNewTab = (pdfBlob: Blob): void => {
  const pdfUrl = URL.createObjectURL(pdfBlob);
  const newTab = window.open(pdfUrl, '_blank');
  newTab?.focus();
}

export const getGeneralZonesReport = async ({limit, offset, order, churchId}: ZoneQueryParams): Promise<void> => {
   try {
    const res = await icupApi<Blob>('/reports/zones' , {
      params: {
        limit,
        offset,
        order,
        churchId,
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

export const getZonesReportByTerm = async ({   
  searchType, 
  inputTerm, 
  selectTerm, 
  limit, 
  offset, 
  order,
  churchId,
}: ZoneQueryParams): Promise<void> => {
  let newTerm: string | undefined = '';
  
  const termMapping: Partial<Record<ZoneSearchType, string | undefined>> = {
    [ZoneSearchType.ZoneName]: inputTerm,
    [ZoneSearchType.Country]: inputTerm,
    [ZoneSearchType.Department]: inputTerm,
    [ZoneSearchType.Province]: inputTerm,
    [ZoneSearchType.District]: inputTerm,
    [ZoneSearchType.RecordStatus]: selectTerm,
  };
  
  newTerm = termMapping[searchType as ZoneSearchType];

   try {
    const res = await icupApi<Blob>(`/reports/zones/${newTerm}` , {
      params: {
        limit,
        offset,
        order,
        churchId,
        'search-type': searchType,
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