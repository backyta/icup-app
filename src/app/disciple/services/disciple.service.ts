/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';

import { type FamilyGroupResponse } from '@/app/family-group/interfaces';

import { DiscipleSearchType } from '@/app/disciple/enums';
import { type DiscipleResponse, type DiscipleFormData, type DiscipleQueryParams } from '@/app/disciple/interfaces';

// TODO : revisar la zona que no esta en los sevicios de los demas modulos
//* Create disciple
export const createDisciple = async (formData:DiscipleFormData ): Promise<DiscipleResponse> => {
  try {
    const {data} = await icupApi.post<DiscipleResponse>('/disciples', formData)
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

//* Get all family-groups
export const getAllFamilyGroups = async (): Promise<FamilyGroupResponse[]> => {
  try {
    const {data} = await icupApi<FamilyGroupResponse[]>('/family-groups' , {
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

//* Get all disciples (paginated)
export const getDisciples = async ({limit, offset, all, order}: DiscipleQueryParams): Promise<DiscipleResponse[]> => {

 let result: DiscipleResponse[];

  try {
    if (!all) {
      const {data} = await icupApi<DiscipleResponse[]>('/disciples' , {
        params: {
          limit,
          offset,
          order,
        },
      });
      
      result = data;
    }else {
      const {data} = await icupApi<DiscipleResponse[]>('/disciples' , {
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

// ? Get disciples by term (paginated)
export const getDisciplesByTerm = async ({ 
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
}: DiscipleQueryParams): Promise<DiscipleResponse[] | undefined> => {

 let result: DiscipleResponse[];

 //* Origin country, department, province, district, urban sector, address
 if (searchType === DiscipleSearchType.ZoneName||
     searchType === DiscipleSearchType.OriginCountry||
     searchType === DiscipleSearchType.Department ||
     searchType === DiscipleSearchType.Province ||
     searchType === DiscipleSearchType.District ||
     searchType === DiscipleSearchType.UrbanSector ||
     searchType === DiscipleSearchType.Address
    ) {
    try {
        if (!all) {
            const {data} = await icupApi<DiscipleResponse[]>(`/disciples/${inputTerm}` , {
          params: {
            limit,
            offset,
            order,
            'search-type': searchType
          },
        });
        
        result = data;
      }else {
        const {data} = await icupApi<DiscipleResponse[]>(`/disciples/${inputTerm}` , {
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
  if (searchType === DiscipleSearchType.BirthDate) {
    try {
      if (!all) {
        const {data} = await icupApi<DiscipleResponse[]>(`/disciples/${dateTerm}` , {
          params: {
            limit,
            offset,
            order,
            'search-type': searchType
          },
        });
        
        result = data;
      }else {
        const {data} = await icupApi<DiscipleResponse[]>(`/disciples/${dateTerm}` , {
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
  if (searchType === DiscipleSearchType.RecordStatus ||
        searchType === DiscipleSearchType.Gender ||
        searchType === DiscipleSearchType.BirthMonth ||
        searchType === DiscipleSearchType.MaritalStatus
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<DiscipleResponse[]>(`/disciples/${selectTerm}` , {
            params: {
              limit,
              offset,
              order,
              'search-type': searchType
            },
          });
          
          result = data;
        }else {
          const {data} = await icupApi<DiscipleResponse[]>(`/disciples/${selectTerm}` , {
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
  if (searchType === DiscipleSearchType.FirstName
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<DiscipleResponse[]>(`/disciples/${namesTerm}` , {
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
          const {data} = await icupApi<DiscipleResponse[]>(`/disciples/${namesTerm}` , {
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
  if (searchType === DiscipleSearchType.LastName
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<DiscipleResponse[]>(`/disciples/${lastNamesTerm}` , {
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
          const {data} = await icupApi<DiscipleResponse[]>(`/disciples/${lastNamesTerm}` , {
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
  if (searchType === DiscipleSearchType.FullName
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<DiscipleResponse[]>(`/disciples/${namesTerm}-${lastNamesTerm}` , {
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
          const {data} = await icupApi<DiscipleResponse[]>(`/disciples/${namesTerm}-${lastNamesTerm}` , {
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

// //* Update disciple by ID
export interface updateDiscipleOptions {
  id: string;
  formData: DiscipleFormData;
}

export const updateDisciple = async ({id, formData}: updateDiscipleOptions ): Promise<DiscipleResponse> => {
  try {
    const {data} = await icupApi.patch<DiscipleResponse>(`/disciples/${id}`, formData)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

// //! Delete disciple by ID
export const deleteDisciple = async (id: string ): Promise<void> => {
  try {
    const {data} = await icupApi.delete(`/disciples/${id}`)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado, hable con el administrador')
  }
}
