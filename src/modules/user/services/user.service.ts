/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';

import { UserSearchType } from '@/modules/user/enums';
import { type UserResponse, type UserFormData, type UserQueryParams, type UserPasswordUpdateFormData } from '@/modules/user/interfaces';

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
    if (!all) {
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
export const getUsersByTerm = async ({ 
  multiSelectTerm,
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

  //* Multi Select (roles)
  if (searchType === UserSearchType.Roles) {
    try {
      if (!all) {
        const {data} = await icupApi<UserResponse[]>(`/users/${multiSelectTerm}` , {
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

 //* Record status and gender
  if (searchType === UserSearchType.RecordStatus || searchType === UserSearchType.Gender) {
      try {
        if (!all) {
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
    if (!all) {
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
    if (!all) {
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
    if (!all) {
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
export interface UpdateUserOptions {
  id: string;
  formData: UserFormData | UserPasswordUpdateFormData;
}

export const updateUser = async ({id, formData}: UpdateUserOptions ): Promise<UserResponse> => {
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
    const {data} = await icupApi.delete(`/users/${id}`)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado, hable con el administrador')
  }
}
