/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';

import { 
  type OfferingExpenseResponse,
  type OfferingExpenseFormData,
  type OfferingExpenseQueryParams,
} from '@/modules/offering/expense/interfaces';
import { OfferingExpenseSearchType } from '@/modules/offering/expense/enums';

//* Create offering expense
export const createOfferingExpense = async (formData:OfferingExpenseFormData ): Promise<OfferingExpenseResponse> => {
  try {
    const {data} = await icupApi.post<OfferingExpenseResponse>('/offerings-expenses', formData)
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

//* Get all offerings expense (paginated)
export const getOfferingsExpenses = async ({limit, offset, all, order}: OfferingExpenseQueryParams): Promise<OfferingExpenseResponse[]> => {

 let result: OfferingExpenseResponse[];

  try {
    if (!all) {
      const {data} = await icupApi<OfferingExpenseResponse[]>('/offerings-expenses' , {
        params: {
          limit,
          offset,
          order,
        },
      });
      
      result = data;
    }else {
      const {data} = await icupApi<OfferingExpenseResponse[]>('/offerings-expenses' , {
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

// ? Get offerings expense by term (paginated)
export const getOfferingsExpensesByTerm = async ({ 
  searchType, 
  searchSubType, 
  dateTerm, 
  selectTerm, 
  limit, 
  offset, 
  all, 
  order
}: OfferingExpenseQueryParams): Promise<OfferingExpenseResponse[] | undefined> => {
  let result: OfferingExpenseResponse[];

  //* Others types
  if (searchType !== OfferingExpenseSearchType.ExpenseAdjustment && searchType !== OfferingExpenseSearchType.RecordStatus ) {
    try {
        if (!all) {
            const {data} = await icupApi<OfferingExpenseResponse[]>(`/offerings-expenses/${selectTerm}&${dateTerm}` , {
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
        const {data} = await icupApi<OfferingExpenseResponse[]>(`/offerings-expenses/${selectTerm}&${dateTerm}` , {
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

 //* Expense Adjustment
  if (searchType === OfferingExpenseSearchType.ExpenseAdjustment) {
    try {
      if (!all) {
        const {data} = await icupApi<OfferingExpenseResponse[]>(`/offerings-expenses/${selectTerm}&${dateTerm}` , {
          params: {
            limit,
            offset,
            order,
            'search-type': searchType,
          },
        });
        
        result = data;
      }else {
        const {data} = await icupApi<OfferingExpenseResponse[]>(`/offerings-expenses/${selectTerm}&${dateTerm}` , {
          params: {
            order,
            'search-type': searchType,
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

 //* Record Status
  if (searchType === OfferingExpenseSearchType.RecordStatus) {
      try {
        if (!all) {
          const {data} = await icupApi<OfferingExpenseResponse[]>(`/offerings-expenses/${selectTerm}` , {
            params: {
              limit,
              offset,
              order,
              'search-type': searchType
            },
          });
          
          result = data;
        }else {
          const {data} = await icupApi<OfferingExpenseResponse[]>(`/offerings-expenses/${selectTerm}` , {
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

//* Update offering expense by ID
export interface UpdateOfferingExpenseOptions {
  id: string;
  formData: OfferingExpenseFormData;
}

export const updateOfferingExpense = async ({id, formData}: UpdateOfferingExpenseOptions ): Promise<OfferingExpenseResponse> => {
  try {
    const {data} = await icupApi.patch<OfferingExpenseResponse>(`/offerings-expenses/${id}`, formData)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

//! Delete offering expense by ID
export interface DeleteOfferingExpenseOptions {
  id: string;
  reasonEliminationType: string;
}

export const deleteOfferingExpense = async ({id, reasonEliminationType}: DeleteOfferingExpenseOptions ): Promise<void> => {
  try {
    const {data} = await icupApi.delete(`/offerings-expenses/${id}`,{
      params: {
        reasonEliminationType,
      },
    })

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado, hable con el administrador')
  }
}
