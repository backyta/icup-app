/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';

import { type SupervisorResponse } from '@/app/supervisor/interfaces';

import { PreacherSearchType } from '@/app/preacher/enums';
import { type PreacherResponse, type PreacherFormData, type PreacherQueryParams } from '@/app/preacher/interfaces';

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
export interface GetAllSupervisorsByZoneOptions {
  isNull: string;
}

export const getAllSupervisors = async ({isNull}: GetAllSupervisorsByZoneOptions): Promise<SupervisorResponse[]> => {
  try {
    const {data} = await icupApi<SupervisorResponse[]>('/supervisors' , {
      params: {
        order: 'ASC',
        isNull
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
    if (!all) {
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

// ? Get preachers by term (paginated)
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
 if (searchType === PreacherSearchType.OriginCountry||
     searchType === PreacherSearchType.ZoneName ||
     searchType === PreacherSearchType.FamilyGroupCode ||
     searchType === PreacherSearchType.FamilyGroupName ||
     searchType === PreacherSearchType.Department ||
     searchType === PreacherSearchType.Province ||
     searchType === PreacherSearchType.District ||
     searchType === PreacherSearchType.UrbanSector ||
     searchType === PreacherSearchType.Address
    ) {
    try {
        if (!all) {
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
  if (searchType === PreacherSearchType.BirthDate) {
    try {
      if (!all) {
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
  if (searchType === PreacherSearchType.RecordStatus ||
        searchType === PreacherSearchType.Gender ||
        searchType === PreacherSearchType.BirthMonth ||
        searchType === PreacherSearchType.MaritalStatus
      ) {
      try {
        if (!all) {
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
  if (searchType === PreacherSearchType.FirstName
      ) {
      try {
        if (!all) {
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
  if (searchType === PreacherSearchType.LastName
      ) {
      try {
        if (!all) {
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
  if (searchType === PreacherSearchType.FullName
      ) {
      try {
        if (!all) {
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

//* Update preacher by ID
export interface UpdatePreacherOptions {
  id: string;
  formData: PreacherFormData;
}

export const updatePreacher = async ({id, formData}: UpdatePreacherOptions ): Promise<PreacherResponse> => {
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

//! Delete preacher by ID
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
