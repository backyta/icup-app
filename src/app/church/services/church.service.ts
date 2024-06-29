/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';
import { icupApi } from '@/api/icupApi';
import { type ChurchFormData, type ChurchResponse, type QueryParams } from '@/app/church/interfaces';
import { SearchType } from '@/shared/enums';

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
        order: 'ASC'
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

//* Get all churches (paginated)
export const getChurches = async ({limit, offset, all, order}: QueryParams): Promise<ChurchResponse[]> => {

 let result: ChurchResponse[];

  try {
    if ( all !== undefined && !all) {
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
export const getChurchesByTerm = async ({ searchType, inputTerm, dateTerm, selectTerm, limit, offset, all, order}: QueryParams): Promise<ChurchResponse[] | undefined> => {

 let result: ChurchResponse[];

 if (searchType === SearchType.ChurchName||
     searchType === SearchType.Department || 
     searchType === SearchType.Province || 
     searchType === SearchType.District || 
     searchType === SearchType.UrbanSector || 
     searchType === SearchType.Address
    ) {
    try {
      if ( all !== undefined && !all) {
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

 if (searchType === SearchType.FoundingDate) {
   try {
     if ( all !== undefined && !all) {
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

 if (searchType === SearchType.Status) {
    try {
      if ( all !== undefined && !all) {
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
export interface updateChurchOptions {
  id: string;
  formData: ChurchFormData;
}

export const updateChurch = async ({id, formData}: updateChurchOptions ): Promise<ChurchResponse> => {
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

//! Delete church by ID
export const deleteChurch = async (id: string ): Promise<void> => {
  try {
    const {data} = await icupApi.delete(`/churches/${id}`)

    console.log(data);
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado, hable con el administrador')
  }
}
