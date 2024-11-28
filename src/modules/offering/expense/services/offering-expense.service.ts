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
    const {data} = await icupApi.post<OfferingExpenseResponse>('/offering-expenses', formData)
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

//* Get all offerings expense (paginated)
export const getOfferingsExpenses = async ({limit, offset, all, order, churchId}: OfferingExpenseQueryParams): Promise<OfferingExpenseResponse[]> => {

 let result: OfferingExpenseResponse[];

  try {
    if (!all) {
      const {data} = await icupApi<OfferingExpenseResponse[]>('/offering-expenses' , {
        params: {
          limit,
          offset,
          order,
          churchId
        },
      });
      
      result = data;
    }else {
      const {data} = await icupApi<OfferingExpenseResponse[]>('/offering-expenses' , {
        params: {
          order,
          churchId
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
  order,
  churchId
}: OfferingExpenseQueryParams): Promise<OfferingExpenseResponse[] | undefined> => {
  let result: OfferingExpenseResponse[];

  //* Others types
  if (searchType !== OfferingExpenseSearchType.RecordStatus ) {
    try {
        if (!all) {
            const {data} = await icupApi<OfferingExpenseResponse[]>(`/offering-expenses/${dateTerm}` , {
          params: {
            limit,
            offset,
            order,
            churchId,
            'search-type': searchType,
            'search-sub-type': searchSubType
          },
        });
        
        result = data;
      }else {
        const {data} = await icupApi<OfferingExpenseResponse[]>(`/offering-expenses/${dateTerm}` , {
          params: {
            order,
            churchId,
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

//  //* Expense Adjustment
//   if (searchType === OfferingExpenseSearchType.ExpensesAdjustment) {
//     try {
//       if (!all) {
//         const {data} = await icupApi<OfferingExpenseResponse[]>(`/offering-expenses/${dateTerm}` , {
//           params: {
//             limit,
//             offset,
//             order,
//             churchId,
//             'search-type': searchType,
//           },
//         });
        
//         result = data;
//       }else {
//         const {data} = await icupApi<OfferingExpenseResponse[]>(`/offering-expenses/${selectTerm}&${dateTerm}` , {
//           params: {
//             order,
//             churchId,
//             'search-type': searchType,
//           },
//         });
        
//         result = data;
//       }
    
//       return result;
    
//     } catch (error) {
//       if (isAxiosError(error) && error.response) {
//         throw (error.response.data)
//       }
      
//       throw new Error('Ocurrió un error inesperado, hable con el administrador')
//     }
//   }

 //* Record Status
  if (searchType === OfferingExpenseSearchType.RecordStatus) {
      try {
        if (!all) {
          const {data} = await icupApi<OfferingExpenseResponse[]>(`/offering-expenses/${selectTerm}` , {
            params: {
              limit,
              offset,
              order,
              churchId,
              'search-type': searchType
            },
          });
          
          result = data;
        }else {
          const {data} = await icupApi<OfferingExpenseResponse[]>(`/offering-expenses/${selectTerm}` , {
            params: {
              order,
              churchId,
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
    const {data} = await icupApi.patch<OfferingExpenseResponse>(`/offering-expenses/${id}`, formData)

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
    const {data} = await icupApi.delete(`/offering-expenses/${id}`,{
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


// ? OFFERING EXPENSES REPORTS
const openPdfInNewTab = (pdfBlob: Blob): void => {
  const pdfUrl = URL.createObjectURL(pdfBlob);
  const newTab = window.open(pdfUrl, '_blank');
  newTab?.focus();
}

export const getGeneralOfferingExpensesReport = async ({limit, offset, order, churchId}: OfferingExpenseQueryParams): Promise<void> => {
   try {
    const res = await icupApi<Blob>('/reports/offering-expenses' , {
      params: {
        limit,
        offset,
        order,
        churchId,
      },
      headers: {
      'Content-Type': 'application/pdf',
      },
      responseType: 'blob',
    });
    
    openPdfInNewTab(res.data);
    
   } catch (error) {
     if (isAxiosError(error) && error.response) {
       throw (error.response.data)
     }
     
     throw new Error('Ocurrió un error inesperado, hable con el administrador')
   }
 }

export const getOfferingExpensesReportByTerm = async ({   
  searchType, 
  searchSubType,
  dateTerm, 
  selectTerm, 
  limit, 
  offset, 
  order,
  churchId
}: OfferingExpenseQueryParams): Promise<void> => {
  let newTerm: string | undefined = '';
  
  const termMapping: Record< OfferingExpenseSearchType, string | undefined> = {
    [OfferingExpenseSearchType.DecorationExpenses]: `${dateTerm}`,
    [OfferingExpenseSearchType.EquipmentAndTechnologyExpenses]: `${dateTerm}`,
    [OfferingExpenseSearchType.ExpensesAdjustment]: `${dateTerm}`,
    [OfferingExpenseSearchType.MaintenanceAndRepairExpenses]: `${dateTerm}`,
    [OfferingExpenseSearchType.OperationalExpenses]: `${dateTerm}`,
    [OfferingExpenseSearchType.PlaningEventsExpenses]: `${dateTerm}`,
    [OfferingExpenseSearchType.SuppliesExpenses]: `${dateTerm}`,
    [OfferingExpenseSearchType.RecordStatus]: selectTerm,
  };
  
  newTerm = termMapping[searchType as OfferingExpenseSearchType];

   try {
    const res = await icupApi<Blob>(`/reports/offering-expenses/${newTerm}` , {
      params: {
        limit,
        offset,
        order,
        churchId,
        'search-type': searchType,
        'search-sub-type': searchSubType
      },
      headers: {
      'Content-Type': 'application/pdf',
      },
      responseType: 'blob',
    });
    
    openPdfInNewTab(res.data);
    
   } catch (error) {
     if (isAxiosError(error) && error.response) {
       throw (error.response.data)
     }
     
     throw new Error('Ocurrió un error inesperado, hable con el administrador')
   }
 }