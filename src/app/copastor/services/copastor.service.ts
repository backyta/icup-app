/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';

import { type PastorResponse } from '@/app/pastor/interfaces';

import { CopastorSearchType } from '@/app/copastor/enums';
import { type CopastorResponse, type CopastorFormData, type CopastorQueryParams } from '@/app/copastor/interfaces';


//* Create co-pastor
export const createCopastor = async (formData:CopastorFormData ): Promise<CopastorResponse> => {
  try {
    const {data} = await icupApi.post<CopastorResponse>('/copastors', formData)
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

//* Get all pastors
export const getAllPastors = async (): Promise<PastorResponse[]> => {
  try {
    const {data} = await icupApi<PastorResponse[]>('/pastors' , {
      params: {
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

//* Get all co-pastors (paginated)
export const getCopastors = async ({limit, offset, all, order}: CopastorQueryParams): Promise<CopastorResponse[]> => {

 let result: CopastorResponse[];

  try {
    if (!all) {
      const {data} = await icupApi<CopastorResponse[]>('/copastors' , {
        params: {
          limit,
          offset,
          order,
        },
      });
      
      result = data;
    }else {
      const {data} = await icupApi<CopastorResponse[]>('/copastors' , {
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

// ? Get co-pastors by term (paginated)
export const getCopastorsByTerm = async ({ 
  searchType, 
  searchSubType, 
  inputTerm, 
  dateTerm, 
  selectTerm, 
  namesTerm,
  lastNamesTerm,
  limit, 
  offset, 
  all, 
  order
}: CopastorQueryParams): Promise<CopastorResponse[] | undefined> => {

 let result: CopastorResponse[];

 //* Origin country, department, province, district, urban sector, address
 if (searchType === CopastorSearchType.OriginCountry||
     searchType === CopastorSearchType.Department ||
     searchType === CopastorSearchType.Province ||
     searchType === CopastorSearchType.District ||
     searchType === CopastorSearchType.UrbanSector ||
     searchType === CopastorSearchType.Address
    ) {
    try {
        if (!all) {
            const {data} = await icupApi<CopastorResponse[]>(`/copastors/${inputTerm}` , {
          params: {
            limit,
            offset,
            order,
            'search-type': searchType
          },
        });
        
        result = data;
      }else {
        const {data} = await icupApi<CopastorResponse[]>(`/copastors/${inputTerm}` , {
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

 //* Date Birth
  if (searchType === CopastorSearchType.BirthDate) {
    try {
      if (!all) {
        const {data} = await icupApi<CopastorResponse[]>(`/copastors/${dateTerm}` , {
          params: {
            limit,
            offset,
            order,
            'search-type': searchType
          },
        });
        
        result = data;
      }else {
        const {data} = await icupApi<CopastorResponse[]>(`/copastors/${dateTerm}` , {
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

 //* Status, Gender, Month Birth
  if (searchType === CopastorSearchType.RecordStatus ||
        searchType === CopastorSearchType.Gender ||
        searchType === CopastorSearchType.BirthMonth ||
        searchType === CopastorSearchType.MaritalStatus
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<CopastorResponse[]>(`/copastors/${selectTerm}` , {
            params: {
              limit,
              offset,
              order,
              'search-type': searchType
            },
          });
          
          result = data;
        }else {
          const {data} = await icupApi<CopastorResponse[]>(`/copastors/${selectTerm}` , {
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

 //* First Name
  if (searchType === CopastorSearchType.FirstName
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<CopastorResponse[]>(`/copastors/${namesTerm}` , {
            params: {
              limit,
              offset,
              order,
              'search-type': searchType,
              'search-sub-type': searchSubType
            },
          });

          result = data;
        }else {
          const {data} = await icupApi<CopastorResponse[]>(`/copastors/${namesTerm}` , {
            params: {
              order,
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

 //* Last Name 
  if (searchType === CopastorSearchType.LastName
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<CopastorResponse[]>(`/copastors/${lastNamesTerm}` , {
            params: {
              limit,
              offset,
              order,
              'search-type': searchType,
              'search-sub-type': searchSubType
            },
          });
          
          result = data;
        }else {
          const {data} = await icupApi<CopastorResponse[]>(`/copastors/${lastNamesTerm}` , {
            params: {
              order,
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
  if (searchType === CopastorSearchType.FullName
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<CopastorResponse[]>(`/copastors/${namesTerm}-${lastNamesTerm}` , {
            params: {
              limit,
              offset,
              order,
              'search-type': searchType,
              'search-sub-type': searchSubType
            },
          });
          
          result = data;
        }else {
          const {data} = await icupApi<CopastorResponse[]>(`/copastors/${namesTerm}-${lastNamesTerm}` , {
            params: {
              order,
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

// //* Update co-pastor by ID
export interface updateCopastorOptions {
  id: string;
  formData: CopastorFormData;
}

export const updateCopastor = async ({id, formData}: updateCopastorOptions ): Promise<CopastorResponse> => {
  try {
    const {data} = await icupApi.patch<CopastorResponse>(`/copastors/${id}`, formData)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

// //! Delete co-pastor by ID
export const deleteCopastor = async (id: string ): Promise<void> => {
  try {
    const {data} = await icupApi.delete(`/copastors/${id}`)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado, hable con el administrador')
  }
}
