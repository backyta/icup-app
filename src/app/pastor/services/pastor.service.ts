/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';
import { type PastorResponse, type PastorFormData, type PastorQueryParams } from '@/app/pastor/interfaces';
import { type ChurchResponse } from '@/app/church/interfaces';
import { SearchType } from '@/shared/enums';

//* Create pastor
export const createPastor = async (formData:PastorFormData ): Promise<PastorResponse> => {
  try {
    const {data} = await icupApi.post<PastorResponse>('/pastors', formData)

    console.log(data);
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

//* Get all churches
export const getAllChurches = async (): Promise<ChurchResponse[]> => {
  try {
    const {data} = await icupApi<ChurchResponse[]>('/churches' , {
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

//* Get all churches (paginated)
export const getPastors = async ({limit, offset, all, order}: PastorQueryParams): Promise<PastorResponse[]> => {

 let result: PastorResponse[];

  try {
    if ( all !== undefined && !all) {
      const {data} = await icupApi<PastorResponse[]>('/pastors' , {
        params: {
          limit,
          offset,
          order,
        },
      });
      console.log(data);
      
      result = data;
    }else {
      const {data} = await icupApi<PastorResponse[]>('/pastors' , {
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

// TODO : HACER todas las consultas del backend y poner en common el helper de transformar o devolver la data minimizada
// ? Get churches by term (paginated)
export const getPastorsByTerm = async ({ 
  searchType, 
  inputTerm, 
  dateTerm, 
  selectTerm, 
  namesTerm,
  lastNamesTerm,
  limit, 
  offset, 
  all, 
  order
}: PastorQueryParams): Promise<PastorResponse[] | undefined> => {

 let result: PastorResponse[];

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
            const {data} = await icupApi<PastorResponse[]>(`/pastors/${inputTerm}` , {
          params: {
            limit,
            offset,
            order,
            'search-type': searchType
          },
        });
        
        result = data;
      }else {
        const {data} = await icupApi<PastorResponse[]>(`/pastors/${inputTerm}` , {
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
        const {data} = await icupApi<PastorResponse[]>(`/pastors/${dateTerm}` , {
          params: {
            limit,
            offset,
            order,
            'search-type': searchType
          },
        });
        
        result = data;
      }else {
        const {data} = await icupApi<PastorResponse[]>(`/pastors/${dateTerm}` , {
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
          const {data} = await icupApi<PastorResponse[]>(`/pastors/${selectTerm}` , {
            params: {
              limit,
              offset,
              order,
              'search-type': searchType
            },
          });
          
          result = data;
        }else {
          const {data} = await icupApi<PastorResponse[]>(`/pastors/${selectTerm}` , {
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
          const {data} = await icupApi<PastorResponse[]>(`/pastors/${namesTerm}` , {
            params: {
              limit,
              offset,
              order,
              'search-type': searchType
            },
          });
          
          result = data;
        }else {
          const {data} = await icupApi<PastorResponse[]>(`/pastors/${namesTerm}` , {
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

 //* Last Name 
  if (searchType === SearchType.LastName
      ) {
      try {
        if ( all !== undefined && !all) {
          const {data} = await icupApi<PastorResponse[]>(`/pastors/${lastNamesTerm}` , {
            params: {
              limit,
              offset,
              order,
              'search-type': searchType
            },
          });
          
          result = data;
        }else {
          const {data} = await icupApi<PastorResponse[]>(`/pastors/${lastNamesTerm}` , {
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

 //* Full Name
  if (searchType === SearchType.FullName
      ) {
      try {
        if ( all !== undefined && !all) {
          const {data} = await icupApi<PastorResponse[]>(`/pastors/${namesTerm}-${lastNamesTerm}` , {
            params: {
              limit,
              offset,
              order,
              'search-type': searchType
            },
          });
          
          result = data;
        }else {
          const {data} = await icupApi<PastorResponse[]>(`/pastors/${namesTerm}-${lastNamesTerm}` , {
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

// //* Update pastor by ID
export interface updatePastorOptions {
  id: string;
  formData: PastorFormData;
}

export const updatePastor = async ({id, formData}: updatePastorOptions ): Promise<PastorResponse> => {
  try {
    const {data} = await icupApi.patch<PastorResponse>(`/pastors/${id}`, formData)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

// //! Delete church by ID
// export const deleteChurch = async (id: string ): Promise<void> => {
//   try {
//     const {data} = await icupApi.delete(`/churches/${id}`)

//     console.log(data);
    
//     return data;
//   } catch (error) {
//     if (isAxiosError(error) && error.response) {
//       throw (error.response.data)
//     }
    
//     throw new Error('Ocurrió un error inesperado, hable con el administrador')
//   }
// }
