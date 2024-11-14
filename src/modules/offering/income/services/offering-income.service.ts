/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';

import { 
  OfferingIncomeSearchType,
  OfferingIncomeSearchSubType, 
} from '@/modules/offering/income/enums';
import { 
  type OfferingIncomeResponse,
  type OfferingIncomeFormData, 
  type OfferingIncomeQueryParams, 
} from '@/modules/offering/income/interfaces';

//* Create offering income
export const createOfferingIncome = async (formData:OfferingIncomeFormData ): Promise<OfferingIncomeResponse> => {
  try {
    const {data} = await icupApi.post<OfferingIncomeResponse>('/offering-income', formData)
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

//* Get all offering income (paginated)
export const getOfferingsIncome = async ({limit, offset, all, order}: OfferingIncomeQueryParams): Promise<OfferingIncomeResponse[]> => {

 let result: OfferingIncomeResponse[];

  try {
    if (!all) {
      const {data} = await icupApi<OfferingIncomeResponse[]>('/offering-income' , {
        params: {
          limit,
          offset,
          order,
        },
      });
      
      result = data;
    }else {
      const {data} = await icupApi<OfferingIncomeResponse[]>('/offering-income' , {
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

// ? Get offering income by term (paginated)
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

 //* Sunday Service, Sunday School
 if (searchType === OfferingIncomeSearchType.SundayService||
     searchType === OfferingIncomeSearchType.SundaySchool
    ) {
      const term = searchSubType === OfferingIncomeSearchSubType.OfferingByShift
        ? selectTerm 
        : searchSubType === OfferingIncomeSearchSubType.OfferingByDate
          ? dateTerm
        : searchSubType === OfferingIncomeSearchSubType.OfferingByChurch
          ? selectTerm
          : searchSubType === OfferingIncomeSearchSubType.OfferingByChurchDate
          ?`${selectTerm}&${dateTerm}`
          : `${selectTerm}&${dateTerm}`

    try {
        if (!all) {
            const {data} = await icupApi<OfferingIncomeResponse[]>(`/offering-income/${term}` , {
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
        const {data} = await icupApi<OfferingIncomeResponse[]>(`/offering-income/${term}` , {
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

 //* Family group
  if (searchType === OfferingIncomeSearchType.FamilyGroup) {
    const term = searchSubType === OfferingIncomeSearchSubType.OfferingByDate
      ? dateTerm
      : searchSubType === OfferingIncomeSearchSubType.OfferingByGroupCode || searchSubType === OfferingIncomeSearchSubType.OfferingByZone
        ? inputTerm
        : searchSubType === OfferingIncomeSearchSubType.OfferingByGroupCodeDate || searchSubType === OfferingIncomeSearchSubType.OfferingByZoneDate
          ? `${inputTerm}&${dateTerm}`
            : searchSubType === OfferingIncomeSearchSubType.OfferingByPreacherNames
            ? namesTerm
            : searchSubType === OfferingIncomeSearchSubType.OfferingByPreacherLastNames
              ? lastNamesTerm
              : `${namesTerm}-${lastNamesTerm}`

    try {
      if (!all) {
        const {data} = await icupApi<OfferingIncomeResponse[]>(`/offering-income/${term}` , {
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
        const {data} = await icupApi<OfferingIncomeResponse[]>(`/offering-income/${term}` , {
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

 //* Zonal fasting and vigil
  if (searchType === OfferingIncomeSearchType.ZonalFasting || searchType === OfferingIncomeSearchType.ZonalVigil ) {
    const term = searchSubType === OfferingIncomeSearchSubType.OfferingByDate
      ? dateTerm
      : searchSubType === OfferingIncomeSearchSubType.OfferingByZone
        ? inputTerm
        : searchSubType === OfferingIncomeSearchSubType.OfferingByZoneDate
          ? `${inputTerm}&${dateTerm}`
            : searchSubType === OfferingIncomeSearchSubType.OfferingByChurchDate
            ? `${selectTerm}&${dateTerm}`
            : searchSubType === OfferingIncomeSearchSubType.OfferingBySupervisorNames
            ? namesTerm
            : searchSubType === OfferingIncomeSearchSubType.OfferingBySupervisorLastNames
              ? lastNamesTerm
              : `${namesTerm}-${lastNamesTerm}`
              
    try {
      if (!all) {
        const {data} = await icupApi<OfferingIncomeResponse[]>(`/offering-income/${term}` , {
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
        const {data} = await icupApi<OfferingIncomeResponse[]>(`/offering-income/${term}` , {
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

 //* Special and ground church
  if (searchType === OfferingIncomeSearchType.Special || searchType === OfferingIncomeSearchType.ChurchGround ) {
    const term = searchSubType === OfferingIncomeSearchSubType.OfferingByDate
      ? dateTerm
        : searchSubType === OfferingIncomeSearchSubType.OfferingByContributorNames
        ? `${selectTerm}&${namesTerm}`
        : searchSubType === OfferingIncomeSearchSubType.OfferingByContributorLastNames
          ? `${selectTerm}&${lastNamesTerm}`
          : `${selectTerm}&${namesTerm}-${lastNamesTerm}`
          
    try {
      if (!all) {
        const {data} = await icupApi<OfferingIncomeResponse[]>(`/offering-income/${term}` , {
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
        const {data} = await icupApi<OfferingIncomeResponse[]>(`/offering-income/${term}` , {
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

 //* General Vigil, general fasting, youth service, united service, activities, adjustment income
  if (searchType === OfferingIncomeSearchType.GeneralFasting || 
    searchType === OfferingIncomeSearchType.GeneralVigil || 
    searchType === OfferingIncomeSearchType.YouthService || 
    searchType === OfferingIncomeSearchType.UnitedService  || 
    searchType === OfferingIncomeSearchType.Activities || 
    searchType === OfferingIncomeSearchType.IncomeAdjustment ) {  

      const term = searchSubType === OfferingIncomeSearchSubType.OfferingByDate
      ? dateTerm
      : searchSubType === OfferingIncomeSearchSubType.OfferingByChurch
      ? selectTerm
        : `${selectTerm}&${dateTerm}`
    try {
      if (!all) {
        const {data} = await icupApi<OfferingIncomeResponse[]>(`/offering-income/${term}` , {
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
        const {data} = await icupApi<OfferingIncomeResponse[]>(`/offering-income/${term}` , {
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

 //* Record Status
  if (searchType === OfferingIncomeSearchType.RecordStatus) {
      try {
        if (!all) {
          const {data} = await icupApi<OfferingIncomeResponse[]>(`/offering-income/${selectTerm}` , {
            params: {
              limit,
              offset,
              order,
              'search-type': searchType
            },
          });
          
          result = data;
        }else {
          const {data} = await icupApi<OfferingIncomeResponse[]>(`/offering-income/${selectTerm}` , {
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

//* Update offering income by ID
export interface UpdateOfferingIncomeOptions {
  id: string;
  formData: OfferingIncomeFormData;
}

export const updateOfferingIncome = async ({id, formData}: UpdateOfferingIncomeOptions ): Promise<OfferingIncomeResponse> => {
  try {
    const {data} = await icupApi.patch<OfferingIncomeResponse>(`/offering-income/${id}`, formData)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

//! Delete offering income by ID
export interface DeleteOfferingIncomeOptions {
  id: string;
  reasonEliminationType: string;
  exchangeRate?: string;
  exchangeCurrencyType?: string;
}

export const deleteOfferingIncome = async ({id, reasonEliminationType, exchangeRate, exchangeCurrencyType}: DeleteOfferingIncomeOptions ): Promise<void> => {
  try {
    const {data} = await icupApi.delete(`/offering-income/${id}`,{
      params: {
        reasonEliminationType,
        exchangeRate,
        exchangeCurrencyType
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


// ? OFFERING INCOME REPORTS
const openPdfInNewTab = (pdfBlob: Blob): void => {
  const pdfUrl = URL.createObjectURL(pdfBlob);
  const newTab = window.open(pdfUrl, '_blank');
  newTab?.focus();
}

export const getGeneralOfferingIncomeReport = async ({limit, offset, order}: OfferingIncomeQueryParams): Promise<void> => {
   try {
    const res = await icupApi<Blob>('/reports/offering-income' , {
      params: {
        limit,
        offset,
        order,
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

export const getOfferingIncomeReportByTerm = async ({   
  searchType, 
  searchSubType,
  inputTerm, 
  dateTerm, 
  selectTerm, 
  namesTerm,
  lastNamesTerm,
  limit, 
  offset, 
  order
}: OfferingIncomeQueryParams): Promise<void> => {
  let newTerm: string | undefined = '';
  
  const termMapping: Partial<Record<OfferingIncomeSearchSubType | OfferingIncomeSearchType, string | undefined>> = {
    [OfferingIncomeSearchSubType.OfferingByDate]: dateTerm,
    [OfferingIncomeSearchSubType.OfferingByChurch]: selectTerm,
    [OfferingIncomeSearchSubType.OfferingByChurchDate]: `${selectTerm}&${dateTerm}`,
    [OfferingIncomeSearchSubType.OfferingByShift]: selectTerm,
    [OfferingIncomeSearchSubType.OfferingByShiftDate]: `${selectTerm}&${dateTerm}`,
    [OfferingIncomeSearchSubType.OfferingByZone]: inputTerm,
    [OfferingIncomeSearchSubType.OfferingByZoneDate]: `${inputTerm}&${dateTerm}`,
    [OfferingIncomeSearchSubType.OfferingByGroupCode]: inputTerm,
    [OfferingIncomeSearchSubType.OfferingByGroupCodeDate]: `${inputTerm}&${dateTerm}`,
    [OfferingIncomeSearchSubType.OfferingByPreacherNames]: namesTerm,
    [OfferingIncomeSearchSubType.OfferingByPreacherLastNames]: lastNamesTerm,
    [OfferingIncomeSearchSubType.OfferingByPreacherFullName]: `${namesTerm}-${lastNamesTerm}`,
    [OfferingIncomeSearchSubType.OfferingBySupervisorNames]: namesTerm,
    [OfferingIncomeSearchSubType.OfferingBySupervisorLastNames]: lastNamesTerm,
    [OfferingIncomeSearchSubType.OfferingBySupervisorFullName]: `${namesTerm}-${lastNamesTerm}`,
    [OfferingIncomeSearchSubType.OfferingByContributorNames]: `${selectTerm}&${namesTerm}`,
    [OfferingIncomeSearchSubType.OfferingByContributorLastNames]: `${selectTerm}&${lastNamesTerm}`,
    [OfferingIncomeSearchSubType.OfferingByContributorFullName]: `${selectTerm}&${namesTerm}-${lastNamesTerm}`,
    [OfferingIncomeSearchType.RecordStatus]: selectTerm,
  };
  
  newTerm = termMapping[searchSubType as OfferingIncomeSearchSubType] ?? termMapping[searchType as OfferingIncomeSearchType];

   try {
    const res = await icupApi<Blob>(`/reports/offering-income/${newTerm}` , {
      params: {
        limit,
        offset,
        order,
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