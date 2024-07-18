/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';

import { type UserResponse, type UserFormData, type UserQueryParams } from '@/app/user/interfaces';

import { UserSearchType } from '@/app/user/enums';

//* Create user
export const createUser = async (formData:UserFormData ): Promise<UserResponse> => {
  try {
    const {data} = await icupApi.post<UserResponse>('/users', formData)
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

//* Get all users (paginated)
export const getUsers = async ({limit, offset, all, order}: UserQueryParams): Promise<UserResponse[]> => {

 let result: UserResponse[];

  try {
    if ( all !== undefined && !all) {
      const {data} = await icupApi<UserResponse[]>('/users' , {
        params: {
          limit,
          offset,
          order,
        },
      });

      result = data;
    }else {
      const {data} = await icupApi<UserResponse[]>('/users' , {
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

// ? Get users by term (paginated)
export const getUserByTerm = async ({ 
  searchType, 
  selectTerm, 
  namesTerm,
  lastNamesTerm,
  limit, 
  offset, 
  all, 
  order
}: UserQueryParams): Promise<UserResponse[] | undefined> => {

 let result: UserResponse[];

  // TODO : falta hacer el checkbox crear un tipo para este, esta como array

 //* Record status
  if (searchType === UserSearchType.RecordStatus) {
      try {
        if ( all !== undefined && !all) {
          const {data} = await icupApi<UserResponse[]>(`/users/${selectTerm}` , {
            params: {
              limit,
              offset,
              order,
              'search-type': searchType
            },
          });
          
          result = data;
        }else {
          const {data} = await icupApi<UserResponse[]>(`/users/${selectTerm}` , {
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
  if (searchType === UserSearchType.FirstName
  ) {
  try {
    if ( all !== undefined && !all) {
      const {data} = await icupApi<UserResponse[]>(`/users/${namesTerm}` , {
        params: {
          limit,
          offset,
          order,
          'search-type': searchType
        },
      });
      
      result = data;
    }else {
      const {data} = await icupApi<UserResponse[]>(`/users/${namesTerm}` , {
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
  if (searchType === UserSearchType.LastName
  ) {
  try {
    if ( all !== undefined && !all) {
      const {data} = await icupApi<UserResponse[]>(`/users/${lastNamesTerm}` , {
        params: {
          limit,
          offset,
          order,
          'search-type': searchType
        },
      });
      
      result = data;
    }else {
      const {data} = await icupApi<UserResponse[]>(`/users/${lastNamesTerm}` , {
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
  if (searchType === UserSearchType.FullName
  ) {
  try {
    if ( all !== undefined && !all) {
      const {data} = await icupApi<UserResponse[]>(`/users/${namesTerm}-${lastNamesTerm}` , {
        params: {
          limit,
          offset,
          order,
          'search-type': searchType
        },
      });
      
      result = data;
    }else {
      const {data} = await icupApi<UserResponse[]>(`/users/${namesTerm}-${lastNamesTerm}` , {
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

// //* Update user by ID
export interface updateUserOptions {
  id: string;
  formData: UserFormData;
}

export const updateUser = async ({id, formData}: updateUserOptions ): Promise<UserResponse> => {
  try {
    const {data} = await icupApi.patch<UserResponse>(`/users/${id}`, formData)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

// //! Delete user by ID
export const deleteUser = async (id: string ): Promise<void> => {
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
