/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';

import { RecordOrder } from '@/shared/enums';

import { PreacherSearchType } from '@/modules/preacher/enums';
import { type PreacherResponse, type PreacherFormData, type PreacherQueryParams } from '@/modules/preacher/interfaces';

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

//* Get simple preachers
export const getSimplePreachers = async ({isSimpleQuery}: {isSimpleQuery: boolean}): Promise<PreacherResponse[]> => {
  try {
    const {data} = await icupApi<PreacherResponse[]>('/preachers' , {
      params: {
        order: RecordOrder.Ascending,
        isSimpleQuery: isSimpleQuery.toString()
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

//* Get preachers by zone
export interface GetPreachersByZoneOptions {
  searchType: string;
  zoneId: string;
  isNullFamilyGroup: boolean;
}

export const getPreachersByZone = async ({
  searchType,
  zoneId,
  isNullFamilyGroup,
 }:GetPreachersByZoneOptions): Promise<PreacherResponse[]> => {
  try {
    const {data} = await icupApi<PreacherResponse[]>(`/preachers/${zoneId}` , {
      params: {
        order: RecordOrder.Ascending,
        'search-type': searchType,
        isNullFamilyGroup: isNullFamilyGroup.toString(),
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

//* Get preachers (paginated)
export const getPreachers = async ({limit, offset, all, order, churchId}: PreacherQueryParams): Promise<PreacherResponse[]> => {

 let result: PreacherResponse[];

  try {
    if (!all) {
      const {data} = await icupApi<PreacherResponse[]>('/preachers' , {
        params: {
          limit,
          offset,
          order,
          churchId,
        },
      });
      
      result = data;
    }else {
      const {data} = await icupApi<PreacherResponse[]>('/preachers' , {
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
  order,
  churchId
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
            churchId,
            'search-type': searchType
          },
        });
        
        result = data;
      }else {
        const {data} = await icupApi<PreacherResponse[]>(`/preachers/${inputTerm}` , {
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

 //* Date Birth
  if (searchType === PreacherSearchType.BirthDate) {
    try {
      if (!all) {
        const {data} = await icupApi<PreacherResponse[]>(`/preachers/${dateTerm}` , {
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
        const {data} = await icupApi<PreacherResponse[]>(`/preachers/${dateTerm}` , {
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
              churchId,
              'search-type': searchType
            },
          });
          
          result = data;
        }else {
          const {data} = await icupApi<PreacherResponse[]>(`/preachers/${selectTerm}` , {
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
              churchId,
              'search-type': searchType,
              'search-sub-type': searchSubType
            },
          });

          result = data;
        }else {
          const {data} = await icupApi<PreacherResponse[]>(`/preachers/${namesTerm}` , {
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
              churchId,
              'search-type': searchType,
              'search-sub-type': searchSubType
            },
          });
          
          result = data;
        }else {
          const {data} = await icupApi<PreacherResponse[]>(`/preachers/${lastNamesTerm}` , {
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
              churchId,
              'search-type': searchType,
              'search-sub-type': searchSubType
            },
          });
          
          result = data;
        }else {
          const {data} = await icupApi<PreacherResponse[]>(`/preachers/${namesTerm}-${lastNamesTerm}` , {
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
export interface InactivatePreacherOptions {
  id: string;
  inactivationCategory: string;
  inactivationReason: string;
}

export const inactivatePreacher = async ({id, inactivationCategory, inactivationReason} : InactivatePreacherOptions): Promise<void> => {
  try {
    const {data} = await icupApi.delete(`/preachers/${id}`, {
      params: {
        inactivationReason,
        inactivationCategory,
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


// ? PREACHER REPORTS
const openPdfInNewTab = (pdfBlob: Blob): void => {
  const pdfUrl = URL.createObjectURL(pdfBlob);
  const newTab = window.open(pdfUrl, '_blank');
  newTab?.focus();
}

export const getGeneralPreachersReport = async ({limit, offset, order, churchId}: PreacherQueryParams): Promise<void> => {
   try {
    const res = await icupApi<Blob>('/reports/preachers' , {
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

export const getPreachersReportByTerm = async ({   
  searchType, 
  searchSubType,
  inputTerm, 
  dateTerm, 
  selectTerm, 
  namesTerm,
  lastNamesTerm,
  limit, 
  offset, 
  order,
  churchId
}: PreacherQueryParams): Promise<void> => {
  let newTerm: string | undefined = '';
  
  const termMapping: Partial<Record<PreacherSearchType, string | undefined>> = {
    [PreacherSearchType.FirstName]: namesTerm,
    [PreacherSearchType.LastName]: lastNamesTerm,
    [PreacherSearchType.FullName]: `${namesTerm}-${lastNamesTerm}`,
    [PreacherSearchType.BirthDate]: dateTerm,
    [PreacherSearchType.BirthMonth]: selectTerm,
    [PreacherSearchType.Gender]: selectTerm,
    [PreacherSearchType.MaritalStatus]: selectTerm,
    [PreacherSearchType.OriginCountry]: inputTerm,
    [PreacherSearchType.ZoneName]: inputTerm,
    [PreacherSearchType.FamilyGroupCode]: inputTerm,
    [PreacherSearchType.FamilyGroupName]: inputTerm,
    [PreacherSearchType.Department]: inputTerm,
    [PreacherSearchType.Province]: inputTerm,
    [PreacherSearchType.District]: inputTerm,
    [PreacherSearchType.UrbanSector]: inputTerm,
    [PreacherSearchType.Address]: inputTerm,
    [PreacherSearchType.RecordStatus]: selectTerm,
  };
  
  newTerm = termMapping[searchType as PreacherSearchType];

   try {
    const res = await icupApi<Blob>(`/reports/preachers/${newTerm}` , {
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