/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';

import { type SupervisorResponse } from '@/app/supervisor/interfaces';
import { type PreacherResponse, type PreacherFormData, type PreacherQueryParams } from '@/app/preacher/interfaces';

import { SearchTypePreacher } from '@/app/preacher/enums';


//* Create Preacher
export const createPreacher = async (formData:PreacherFormData ): Promise<PreacherResponse> => {
  try {
    const {data} = await icupApi.post<PreacherResponse>('/preachers', formData)
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

//* Get all supervisors
export const getAllSupervisors = async (): Promise<SupervisorResponse[]> => {
  try {
    const {data} = await icupApi<SupervisorResponse[]>('/supervisors' , {
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

//* Get all preachers (paginated)
export const getPreachers = async ({limit, offset, all, order}: PreacherQueryParams): Promise<PreacherResponse[]> => {

 let result: PreacherResponse[];

  try {
    if ( all !== undefined && !all) {
      const {data} = await icupApi<PreacherResponse[]>('/preachers' , {
        params: {
          limit,
          offset,
          order,
        },
      });
      
      result = data;
    }else {
      const {data} = await icupApi<PreacherResponse[]>('/preachers' , {
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
export const getPreachersByTerm = async ({ 
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
}: PreacherQueryParams): Promise<PreacherResponse[] | undefined> => {

 let result: PreacherResponse[];

 //* Origin country, department, province, district, urban sector, address, zone
 if (searchType === SearchTypePreacher.OriginCountry||
     searchType === SearchTypePreacher.Zone ||
     searchType === SearchTypePreacher.FamilyGroupCode ||
     searchType === SearchTypePreacher.FamilyGroupName ||
     searchType === SearchTypePreacher.Department ||
     searchType === SearchTypePreacher.Province ||
     searchType === SearchTypePreacher.District ||
     searchType === SearchTypePreacher.UrbanSector ||
     searchType === SearchTypePreacher.Address
    ) {
    try {
        if ( all !== undefined && !all) {
            const {data} = await icupApi<PreacherResponse[]>(`/preachers/${inputTerm}` , {
          params: {
            limit,
            offset,
            order,
            'search-type': searchType
          },
        });
        
        result = data;
      }else {
        const {data} = await icupApi<PreacherResponse[]>(`/preachers/${inputTerm}` , {
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
  if (searchType === SearchTypePreacher.BirthDate) {
    try {
      if ( all !== undefined && !all) {
        const {data} = await icupApi<PreacherResponse[]>(`/preachers/${dateTerm}` , {
          params: {
            limit,
            offset,
            order,
            'search-type': searchType
          },
        });
        
        result = data;
      }else {
        const {data} = await icupApi<PreacherResponse[]>(`/preachers/${dateTerm}` , {
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
  if (searchType === SearchTypePreacher.Status ||
        searchType === SearchTypePreacher.Gender ||
        searchType === SearchTypePreacher.BirthMonth ||
        searchType === SearchTypePreacher.MaritalStatus
      ) {
      try {
        if ( all !== undefined && !all) {
          const {data} = await icupApi<PreacherResponse[]>(`/preachers/${selectTerm}` , {
            params: {
              limit,
              offset,
              order,
              'search-type': searchType
            },
          });
          
          result = data;
        }else {
          const {data} = await icupApi<PreacherResponse[]>(`/preachers/${selectTerm}` , {
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
  if (searchType === SearchTypePreacher.FirstName
      ) {
      try {
        if ( all !== undefined && !all) {
          const {data} = await icupApi<PreacherResponse[]>(`/preachers/${namesTerm}` , {
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
          const {data} = await icupApi<PreacherResponse[]>(`/preachers/${namesTerm}` , {
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
  if (searchType === SearchTypePreacher.LastName
      ) {
      try {
        if ( all !== undefined && !all) {
          const {data} = await icupApi<PreacherResponse[]>(`/preachers/${lastNamesTerm}` , {
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
          const {data} = await icupApi<PreacherResponse[]>(`/preachers/${lastNamesTerm}` , {
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
  if (searchType === SearchTypePreacher.FullName
      ) {
      try {
        if ( all !== undefined && !all) {
          const {data} = await icupApi<PreacherResponse[]>(`/preachers/${namesTerm}-${lastNamesTerm}` , {
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
          const {data} = await icupApi<PreacherResponse[]>(`/preachers/${namesTerm}-${lastNamesTerm}` , {
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

// //* Update preacher by ID
export interface updatePreacherOptions {
  id: string;
  formData: PreacherFormData;
}

export const updatePreacher = async ({id, formData}: updatePreacherOptions ): Promise<PreacherResponse> => {
  console.log(formData);
  
  try {
    const {data} = await icupApi.patch<PreacherResponse>(`/preachers/${id}`, formData)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

// //! Delete preacher by ID
export const deletePreacher = async (id: string ): Promise<void> => {
  try {
    const {data} = await icupApi.delete(`/preachers/${id}`)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado, hable con el administrador')
  }
}
