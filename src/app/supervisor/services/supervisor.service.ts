/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';

import { type SupervisorResponse, type SupervisorFormData, type SupervisorQueryParams } from '@/app/supervisor/interfaces';

import { SearchType } from '@/shared/enums';
import { type CopastorResponse } from '@/app/copastor/interfaces';

//* Create co-pastor
export const createSupervisor = async (formData:SupervisorFormData ): Promise<SupervisorResponse> => {
  try {
    const {data} = await icupApi.post<SupervisorResponse>('/supervisors', formData)
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

//* Get all co-pastors
export const getAllCopastors = async (): Promise<CopastorResponse[]> => {
  try {
    const {data} = await icupApi<CopastorResponse[]>('/copastors' , {
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

//* Get all supervisors (paginated)
export const getSupervisors = async ({limit, offset, all, order}: SupervisorQueryParams): Promise<SupervisorResponse[]> => {

 let result: SupervisorResponse[];

  try {
    if ( all !== undefined && !all) {
      const {data} = await icupApi<SupervisorResponse[]>('/supervisors' , {
        params: {
          limit,
          offset,
          order,
        },
      });
      
      result = data;
    }else {
      const {data} = await icupApi<SupervisorResponse[]>('/supervisors' , {
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

// ? Get supervisors by term (paginated)
export const getSupervisorsByTerm = async ({ 
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
}: SupervisorQueryParams): Promise<SupervisorResponse[] | undefined> => {

 let result: SupervisorResponse[];

 //* Origin country, department, province, district, urban sector, address
 if (searchType === SearchType.OriginCountry||
     searchType === SearchType.Department ||
     searchType === SearchType.Province ||
     searchType === SearchType.District ||
     searchType === SearchType.UrbanSector ||
     searchType === SearchType.Address
    ) {
    try {
        if ( all !== undefined && !all) {
            const {data} = await icupApi<SupervisorResponse[]>(`/supervisors/${inputTerm}` , {
          params: {
            limit,
            offset,
            order,
            'search-type': searchType
          },
        });
        
        result = data;
      }else {
        const {data} = await icupApi<SupervisorResponse[]>(`/supervisors/${inputTerm}` , {
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
  if (searchType === SearchType.BirthDate) {
    try {
      if ( all !== undefined && !all) {
        const {data} = await icupApi<SupervisorResponse[]>(`/supervisors/${dateTerm}` , {
          params: {
            limit,
            offset,
            order,
            'search-type': searchType
          },
        });
        
        result = data;
      }else {
        const {data} = await icupApi<SupervisorResponse[]>(`/supervisors/${dateTerm}` , {
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
  if (searchType === SearchType.Status ||
        searchType === SearchType.Gender ||
        searchType === SearchType.BirthMonth ||
        searchType === SearchType.MaritalStatus
      ) {
      try {
        if ( all !== undefined && !all) {
          const {data} = await icupApi<SupervisorResponse[]>(`/supervisors/${selectTerm}` , {
            params: {
              limit,
              offset,
              order,
              'search-type': searchType
            },
          });
          
          result = data;
        }else {
          const {data} = await icupApi<SupervisorResponse[]>(`/supervisors/${selectTerm}` , {
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
  if (searchType === SearchType.FirstName
      ) {
      try {
        if ( all !== undefined && !all) {
          const {data} = await icupApi<SupervisorResponse[]>(`/supervisors/${namesTerm}` , {
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
          const {data} = await icupApi<SupervisorResponse[]>(`/supervisors/${namesTerm}` , {
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
  if (searchType === SearchType.LastName
      ) {
      try {
        if ( all !== undefined && !all) {
          const {data} = await icupApi<SupervisorResponse[]>(`/supervisors/${lastNamesTerm}` , {
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
          const {data} = await icupApi<SupervisorResponse[]>(`/supervisors/${lastNamesTerm}` , {
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
  if (searchType === SearchType.FullName
      ) {
      try {
        if ( all !== undefined && !all) {
          const {data} = await icupApi<SupervisorResponse[]>(`/supervisors/${namesTerm}-${lastNamesTerm}` , {
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
          const {data} = await icupApi<SupervisorResponse[]>(`/supervisors/${namesTerm}-${lastNamesTerm}` , {
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

// //* Update supervisor by ID
export interface updateSupervisorOptions {
  id: string;
  formData: SupervisorFormData;
}

export const updateSupervisor = async ({id, formData}: updateSupervisorOptions ): Promise<SupervisorResponse> => {
  try {
    const {data} = await icupApi.patch<SupervisorResponse>(`/supervisors/${id}`, formData)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

// //! Delete supervisor by ID
export const deleteSupervisor = async (id: string ): Promise<void> => {
  try {
    const {data} = await icupApi.delete(`/supervisors/${id}`)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado, hable con el administrador')
  }
}
