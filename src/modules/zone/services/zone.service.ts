/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';

import { RecordOrder } from '@/shared/enums/record-order.enum';
import { ZoneSearchType } from '@/modules/zone/enums/zone-search-type.enum';

import { type ZoneFormData} from '@/modules/zone/interfaces/zone-form-data.interface';
import { type ZoneResponse } from '@/modules/zone/interfaces/zone-response.interface';
import { type ZoneQueryParams } from '@/modules/zone/interfaces/zone-query-params.interface';
import {type ZoneSupervisorUpdateFormData } from '@/modules/zone/interfaces/zone-supervisor-update-form-data.interface';

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
export const getZonesByTerm = async ({ 
  searchType, 
  searchSubType,
  inputTerm, 
  selectTerm, 
  limit, 
  offset, 
  all, 
  order, 
  churchId,   
  firstNamesTerm,
  lastNamesTerm
}: ZoneQueryParams): Promise<ZoneResponse[] | undefined> => {

 let result: ZoneResponse[];

 //* Zone, country, department, province, district
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

 //* Record Status
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

 //* First Names
 if (searchType === ZoneSearchType.FirstNames
 ) {
 try {
   if (!all) {
     const {data} = await icupApi<ZoneResponse[]>(`/zones/${firstNamesTerm}` , {
       params: {
         limit,
         offset,
         order,
         churchId,
         'search-type': searchType,
         'search-sub-type': searchSubType
       },
     });

     result = data;
   }else {
     const {data} = await icupApi<ZoneResponse[]>(`/zones/${firstNamesTerm}` , {
       params: {
         order,
         churchId,
         'search-type': searchType,
         'search-sub-type': searchSubType
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

//* Last Names
if (searchType === ZoneSearchType.LastNames
 ) {
 try {
   if (!all) {
     const {data} = await icupApi<ZoneResponse[]>(`/zones/${lastNamesTerm}` , {
       params: {
         limit,
         offset,
         order,
         churchId,
         'search-type': searchType,
         'search-sub-type': searchSubType
       },
     });
     
     result = data;
   }else {
     const {data} = await icupApi<ZoneResponse[]>(`/zones/${lastNamesTerm}` , {
       params: {
         order,
         churchId,
         'search-type': searchType,
         'search-sub-type': searchSubType
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

//* Full Name
if (searchType === ZoneSearchType.FullNames
 ) {
 try {
   if (!all) {
     const {data} = await icupApi<ZoneResponse[]>(`/zones/${firstNamesTerm}-${lastNamesTerm}` , {
       params: {
         limit,
         offset,
         order,
         churchId,
         'search-type': searchType,
         'search-sub-type': searchSubType
       },
     });
     
     result = data;
   }else {
     const {data} = await icupApi<ZoneResponse[]>(`/zones/${firstNamesTerm}-${lastNamesTerm}` , {
       params: {
         order,
         churchId,
         'search-type': searchType,
         'search-sub-type': searchSubType
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

//! Inactivate  zone by ID
export interface InactivateZoneOptions {
  id: string;
  zoneInactivationCategory: string;
  zoneInactivationReason: string;
}

export const inactivateZone = async ({id, zoneInactivationCategory, zoneInactivationReason} : InactivateZoneOptions): Promise<void> => {
  try {
    const {data} = await icupApi.delete(`/zones/${id}`, {
      params: {
        zoneInactivationCategory,
        zoneInactivationReason,
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