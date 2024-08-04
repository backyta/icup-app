/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';

import { type DiscipleResponse } from '@/app/disciple/interfaces';

import { OfferingIncomeSearchType } from '@/app/offering/income/enums';
import { type OfferingIncomeQueryParams, type OfferingIncomeFormData, type OfferingIncomeResponse } from '@/app/offering/income/interfaces';


//* Create offering income
export const createOfferingIncome = async (formData:OfferingIncomeFormData ): Promise<OfferingIncomeResponse> => {
  try {
    const {data} = await icupApi.post<OfferingIncomeResponse>('/offerings-income', formData)
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

//* Get all disciples
export const getAllDisciples = async (): Promise<DiscipleResponse[]> => {
  try {
    const {data} = await icupApi<DiscipleResponse[]>('/disciples' , {
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

//* Get all offerings income (paginated)
export const getOfferingsIncome = async ({limit, offset, all, order}: OfferingIncomeQueryParams): Promise<OfferingIncomeResponse[]> => {

 let result: OfferingIncomeResponse[];

  try {
    if (!all) {
      const {data} = await icupApi<OfferingIncomeResponse[]>('/offerings-income' , {
        params: {
          limit,
          offset,
          order,
        },
      });
      
      result = data;
    }else {
      const {data} = await icupApi<OfferingIncomeResponse[]>('/offerings-income' , {
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

// ? Get offerings income by term (paginated)
export const getOfferingsIncomeByTerm = async ({ 
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
}: OfferingIncomeQueryParams): Promise<OfferingIncomeResponse[] | undefined> => {

 let result: OfferingIncomeResponse[];

 //* Origin country, department, province, district, urban sector, address
 if (searchType === OfferingIncomeSearchType.ZoneName||
     searchType === OfferingIncomeSearchType.OriginCountry||
     searchType === OfferingIncomeSearchType.Department ||
     searchType === OfferingIncomeSearchType.Province ||
     searchType === OfferingIncomeSearchType.District ||
     searchType === OfferingIncomeSearchType.UrbanSector ||
     searchType === OfferingIncomeSearchType.Address
    ) {
    try {
        if (!all) {
            const {data} = await icupApi<OfferingIncomeResponse[]>(`/offerings-income/${inputTerm}` , {
          params: {
            limit,
            offset,
            order,
            'search-type': searchType
          },
        });
        
        result = data;
      }else {
        const {data} = await icupApi<OfferingIncomeResponse[]>(`/offerings-income/${inputTerm}` , {
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
  if (searchType === OfferingIncomeSearchType.BirthDate) {
    try {
      if (!all) {
        const {data} = await icupApi<OfferingIncomeResponse[]>(`/offerings-income/${dateTerm}` , {
          params: {
            limit,
            offset,
            order,
            'search-type': searchType
          },
        });
        
        result = data;
      }else {
        const {data} = await icupApi<OfferingIncomeResponse[]>(`/offerings-income/${dateTerm}` , {
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
  if (searchType === OfferingIncomeSearchType.RecordStatus ||
        searchType === OfferingIncomeSearchType.Gender ||
        searchType === OfferingIncomeSearchType.BirthMonth ||
        searchType === OfferingIncomeSearchType.MaritalStatus
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<OfferingIncomeResponse[]>(`/offerings-income/${selectTerm}` , {
            params: {
              limit,
              offset,
              order,
              'search-type': searchType
            },
          });
          
          result = data;
        }else {
          const {data} = await icupApi<OfferingIncomeResponse[]>(`/offerings-income/${selectTerm}` , {
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
  if (searchType === OfferingIncomeSearchType.FirstName
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<OfferingIncomeResponse[]>(`/offerings-income/${namesTerm}` , {
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
          const {data} = await icupApi<OfferingIncomeResponse[]>(`/offerings-income/${namesTerm}` , {
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
  if (searchType === OfferingIncomeSearchType.LastName
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<OfferingIncomeResponse[]>(`/offerings-income/${lastNamesTerm}` , {
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
          const {data} = await icupApi<OfferingIncomeResponse[]>(`/offerings-income/${lastNamesTerm}` , {
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
  if (searchType === OfferingIncomeSearchType.FullName
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<OfferingIncomeResponse[]>(`/offerings-income/${namesTerm}-${lastNamesTerm}` , {
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
          const {data} = await icupApi<OfferingIncomeResponse[]>(`/offerings-income/${namesTerm}-${lastNamesTerm}` , {
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

//* Update offering income by ID
export interface UpdateOfferingIncomeOptions {
  id: string;
  formData: OfferingIncomeFormData;
}

export const updateOfferingIncome = async ({id, formData}: UpdateOfferingIncomeOptions ): Promise<OfferingIncomeResponse> => {
  try {
    const {data} = await icupApi.patch<OfferingIncomeResponse>(`/offerings-income/${id}`, formData)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

//! Delete offering income by ID
export const deleteOfferingIncome = async (id: string ): Promise<void> => {
  try {
    const {data} = await icupApi.delete(`/offerings-income/${id}`)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado, hable con el administrador')
  }
}
