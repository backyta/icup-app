/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';

import { OfferingIncomeSearchType } from '@/modules/offering/income/enums/offering-income-search-type.enum';
import { OfferingIncomeSearchSubType } from '@/modules/offering/income/enums/offering-income-search-sub-type.enum';

import { type ExternalDonorResponse } from '@/modules/offering/income/interfaces/external-donor-response.interface';
import { type OfferingIncomeFormData } from '@/modules/offering/income/interfaces/offering-income-form-data.interface';
import { type OfferingIncomeResponse } from '@/modules/offering/income/interfaces/offering-income-response.interface';
import { type OfferingIncomeQueryParams } from '@/modules/offering/income/interfaces/offering-income-query-params.interface';

import { RecordOrder } from '@/shared/enums/record-order.enum';

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

//* Get all external donors (paginated)
export const getExternalDonors = async (): Promise<ExternalDonorResponse[]> => {
  
  try {
    const {data} = await icupApi<OfferingIncomeResponse[]>('/external-donor' , {
      params: {
      order: RecordOrder.Descending,
      },
    });
    
     return data;
   } catch (error) {
     if (isAxiosError(error) && error.response) {
       throw (error.response.data)
     }
     
     throw new Error('Ocurrió un error inesperado, hable con el administrador')
   }
 }

//* Get all offering income (paginated)
export const getOfferingsIncome = async ({limit, offset, all, order, churchId}: OfferingIncomeQueryParams): Promise<OfferingIncomeResponse[]> => {
 let result: OfferingIncomeResponse[];

  try {
    if (!all) {
      const {data} = await icupApi<OfferingIncomeResponse[]>('/offering-income' , {
        params: {
          limit,
          offset,
          order,
          churchId,
        },
      });
      
      result = data;
    }else {
      const {data} = await icupApi<OfferingIncomeResponse[]>('/offering-income' , {
        params: {
          order,
          churchId,
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
  firstNamesTerm,
  lastNamesTerm,
  limit, 
  offset, 
  all, 
  order,
  churchId
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
          : searchSubType === OfferingIncomeSearchSubType.OfferingByShiftDate
          ? `${selectTerm}&${dateTerm}`
          : searchSubType === OfferingIncomeSearchSubType.OfferingByContributorFirstNames
          ? `${selectTerm}&${firstNamesTerm}`
          : searchSubType === OfferingIncomeSearchSubType.OfferingByContributorLastNames
            ? `${selectTerm}&${lastNamesTerm}`
            : `${selectTerm}&${firstNamesTerm}-${lastNamesTerm}`

    try {
        if (!all) {
            const {data} = await icupApi<OfferingIncomeResponse[]>(`/offering-income/${term}` , {
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
        const {data} = await icupApi<OfferingIncomeResponse[]>(`/offering-income/${term}` , {
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

 //* Family group
  if (searchType === OfferingIncomeSearchType.FamilyGroup) {
    const term = searchSubType === OfferingIncomeSearchSubType.OfferingByDate
      ? dateTerm
      : searchSubType === OfferingIncomeSearchSubType.OfferingByGroupCode || searchSubType === OfferingIncomeSearchSubType.OfferingByZone
        ? inputTerm
        : searchSubType === OfferingIncomeSearchSubType.OfferingByGroupCodeDate || searchSubType === OfferingIncomeSearchSubType.OfferingByZoneDate
          ? `${inputTerm}&${dateTerm}`
            : searchSubType === OfferingIncomeSearchSubType.OfferingByPreacherFirstNames
            ? firstNamesTerm
            : searchSubType === OfferingIncomeSearchSubType.OfferingByPreacherLastNames
              ? lastNamesTerm
              : `${firstNamesTerm}-${lastNamesTerm}`

    try {
      if (!all) {
        const {data} = await icupApi<OfferingIncomeResponse[]>(`/offering-income/${term}` , {
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
        const {data} = await icupApi<OfferingIncomeResponse[]>(`/offering-income/${term}` , {
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

 //* Zonal fasting and vigil
  if (searchType === OfferingIncomeSearchType.ZonalFasting || searchType === OfferingIncomeSearchType.ZonalVigil ) {
    const term = searchSubType === OfferingIncomeSearchSubType.OfferingByDate
      ? dateTerm
      : searchSubType === OfferingIncomeSearchSubType.OfferingByZone
        ? inputTerm
        : searchSubType === OfferingIncomeSearchSubType.OfferingByZoneDate
          ? `${inputTerm}&${dateTerm}`
            : searchSubType === OfferingIncomeSearchSubType.OfferingBySupervisorFirstNames
            ? firstNamesTerm
            : searchSubType === OfferingIncomeSearchSubType.OfferingBySupervisorLastNames
              ? lastNamesTerm
              : `${firstNamesTerm}-${lastNamesTerm}`
              
    try {
      if (!all) {
        const {data} = await icupApi<OfferingIncomeResponse[]>(`/offering-income/${term}` , {
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
        const {data} = await icupApi<OfferingIncomeResponse[]>(`/offering-income/${term}` , {
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

 //* Special, ground church, youth service
  if (searchType === OfferingIncomeSearchType.Special 
      || searchType === OfferingIncomeSearchType.ChurchGround  
      || searchType === OfferingIncomeSearchType.YouthService) {
    const term = searchSubType === OfferingIncomeSearchSubType.OfferingByDate
      ? dateTerm
        : searchSubType === OfferingIncomeSearchSubType.OfferingByContributorFirstNames
        ? `${selectTerm}&${firstNamesTerm}`
        : searchSubType === OfferingIncomeSearchSubType.OfferingByContributorLastNames
          ? `${selectTerm}&${lastNamesTerm}`
          : `${selectTerm}&${firstNamesTerm}-${lastNamesTerm}`
          
    try {
      if (!all) {
        const {data} = await icupApi<OfferingIncomeResponse[]>(`/offering-income/${term}` , {
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
        const {data} = await icupApi<OfferingIncomeResponse[]>(`/offering-income/${term}` , {
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

 //* General Vigil, general fasting, united service, activities, adjustment income
  if (searchType === OfferingIncomeSearchType.GeneralFasting || 
    searchType === OfferingIncomeSearchType.GeneralVigil || 
    searchType === OfferingIncomeSearchType.UnitedService  || 
    searchType === OfferingIncomeSearchType.Activities || 
    searchType === OfferingIncomeSearchType.IncomeAdjustment ) {  

      const term = searchSubType === OfferingIncomeSearchSubType.OfferingByDate
      ? dateTerm
        : `${selectTerm}&${dateTerm}`
    try {
      if (!all) {
        const {data} = await icupApi<OfferingIncomeResponse[]>(`/offering-income/${term}` , {
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
        const {data} = await icupApi<OfferingIncomeResponse[]>(`/offering-income/${term}` , {
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

 //* Record Status
  if (searchType === OfferingIncomeSearchType.RecordStatus) {
      try {
        if (!all) {
          const {data} = await icupApi<OfferingIncomeResponse[]>(`/offering-income/${selectTerm}` , {
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
          const {data} = await icupApi<OfferingIncomeResponse[]>(`/offering-income/${selectTerm}` , {
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

//! Inactivate offering income by ID
export interface InactivateOfferingIncomeOptions {
  id: string;
  offeringInactivationReason: string;
  exchangeRate?: string;
  exchangeCurrencyTypes?: string;
}

export const inactivateOfferingIncome = async ({id, offeringInactivationReason, exchangeRate, exchangeCurrencyTypes}: InactivateOfferingIncomeOptions ): Promise<void> => {
  try {
    const {data} = await icupApi.delete(`/offering-income/${id}`,{
      params: {
        exchangeRate,
        exchangeCurrencyTypes,
        offeringInactivationReason,
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

export const getGeneralOfferingIncomeReport = async ({limit, offset, order, churchId}: OfferingIncomeQueryParams): Promise<void> => {
   try {
    const res = await icupApi<Blob>('/reports/offering-income' , {
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

export const getOfferingIncomeReportByTerm = async ({   
  searchType, 
  searchSubType,
  inputTerm, 
  dateTerm, 
  selectTerm, 
  firstNamesTerm,
  lastNamesTerm,
  limit, 
  offset, 
  order,
  churchId
}: OfferingIncomeQueryParams): Promise<void> => {
  let newTerm: string | undefined = '';
  
  const termMapping: Partial<Record<OfferingIncomeSearchSubType | OfferingIncomeSearchType, string | undefined>> = {
    [OfferingIncomeSearchSubType.OfferingByDate]: dateTerm,
    [OfferingIncomeSearchSubType.OfferingByShift]: selectTerm,
    [OfferingIncomeSearchSubType.OfferingByShiftDate]: `${selectTerm}&${dateTerm}`,
    [OfferingIncomeSearchSubType.OfferingByZone]: inputTerm,
    [OfferingIncomeSearchSubType.OfferingByZoneDate]: `${inputTerm}&${dateTerm}`,
    [OfferingIncomeSearchSubType.OfferingByGroupCode]: inputTerm,
    [OfferingIncomeSearchSubType.OfferingByGroupCodeDate]: `${inputTerm}&${dateTerm}`,
    [OfferingIncomeSearchSubType.OfferingByPreacherFirstNames]: firstNamesTerm,
    [OfferingIncomeSearchSubType.OfferingByPreacherLastNames]: lastNamesTerm,
    [OfferingIncomeSearchSubType.OfferingByPreacherFullNames]: `${firstNamesTerm}-${lastNamesTerm}`,
    [OfferingIncomeSearchSubType.OfferingBySupervisorFirstNames]: firstNamesTerm,
    [OfferingIncomeSearchSubType.OfferingBySupervisorLastNames]: lastNamesTerm,
    [OfferingIncomeSearchSubType.OfferingBySupervisorFullNames]: `${firstNamesTerm}-${lastNamesTerm}`,
    [OfferingIncomeSearchSubType.OfferingByContributorFirstNames]: `${selectTerm}&${firstNamesTerm}`,
    [OfferingIncomeSearchSubType.OfferingByContributorLastNames]: `${selectTerm}&${lastNamesTerm}`,
    [OfferingIncomeSearchSubType.OfferingByContributorFullNames]: `${selectTerm}&${firstNamesTerm}-${lastNamesTerm}`,
    [OfferingIncomeSearchType.RecordStatus]: selectTerm,
  };
  
  newTerm = termMapping[searchSubType as OfferingIncomeSearchSubType] ?? termMapping[searchType as OfferingIncomeSearchType];

   try {
    const res = await icupApi<Blob>(`/reports/offering-income/${newTerm}` , {
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