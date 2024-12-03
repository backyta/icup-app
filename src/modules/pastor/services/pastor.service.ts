/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';

import { RecordOrder } from '@/shared/enums';

import { PastorSearchType } from '@/modules/pastor/enums';
import { type PastorResponse, type PastorFormData, type PastorQueryParams } from '@/modules/pastor/interfaces';


//* Create pastor
export const createPastor = async (formData:PastorFormData ): Promise<PastorResponse> => {
  try {
    const {data} = await icupApi.post<PastorResponse>('/pastors', formData)
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

//* Get simple pastors
export const getSimplePastors = async ({isSimpleQuery}: {isSimpleQuery: boolean}): Promise<PastorResponse[]> => {
  try {
    const {data} = await icupApi<PastorResponse[]>('/pastors' , {
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


//* Get all pastors (paginated)
export const getPastors = async ({limit, offset, all, order, churchId}: PastorQueryParams): Promise<PastorResponse[]> => {

 let result: PastorResponse[];

  try {
    if (!all) {
      const {data} = await icupApi<PastorResponse[]>('/pastors' , {
        params: {
          limit,
          offset,
          order,
          churchId
        },
      });
      
      result = data;
    }else {
      const {data} = await icupApi<PastorResponse[]>('/pastors' , {
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

// ? Get pastors by term (paginated)
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
  order,
  churchId
}: PastorQueryParams): Promise<PastorResponse[] | undefined> => {

 let result: PastorResponse[];

 //* Origin country, department, province, district, urban sector, address
 if (searchType === PastorSearchType.OriginCountry||
     searchType === PastorSearchType.Department ||
     searchType === PastorSearchType.Province ||
     searchType === PastorSearchType.District ||
     searchType === PastorSearchType.UrbanSector ||
     searchType === PastorSearchType.Address
    ) {
    try {
        if (!all) {
            const {data} = await icupApi<PastorResponse[]>(`/pastors/${inputTerm}` , {
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
        const {data} = await icupApi<PastorResponse[]>(`/pastors/${inputTerm}` , {
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
  if (searchType === PastorSearchType.BirthDate) {
    try {
      if (!all) {
        const {data} = await icupApi<PastorResponse[]>(`/pastors/${dateTerm}` , {
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
        const {data} = await icupApi<PastorResponse[]>(`/pastors/${dateTerm}` , {
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
  if (searchType === PastorSearchType.RecordStatus ||
        searchType === PastorSearchType.Gender ||
        searchType === PastorSearchType.BirthMonth ||
        searchType === PastorSearchType.MaritalStatus
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<PastorResponse[]>(`/pastors/${selectTerm}` , {
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
          const {data} = await icupApi<PastorResponse[]>(`/pastors/${selectTerm}` , {
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
  if (searchType === PastorSearchType.FirstName
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<PastorResponse[]>(`/pastors/${namesTerm}` , {
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
          const {data} = await icupApi<PastorResponse[]>(`/pastors/${namesTerm}` , {
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

 //* Last Name 
  if (searchType === PastorSearchType.LastName
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<PastorResponse[]>(`/pastors/${lastNamesTerm}` , {
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
          const {data} = await icupApi<PastorResponse[]>(`/pastors/${lastNamesTerm}` , {
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

 //* Full Name
  if (searchType === PastorSearchType.FullName
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<PastorResponse[]>(`/pastors/${namesTerm}-${lastNamesTerm}` , {
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
          const {data} = await icupApi<PastorResponse[]>(`/pastors/${namesTerm}-${lastNamesTerm}` , {
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

//* Update pastor by ID
export interface UpdatePastorOptions {
  id: string;
  formData: PastorFormData;
}

export const updatePastor = async ({id, formData}: UpdatePastorOptions ): Promise<PastorResponse> => {
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

//! Delete pastor by ID
export interface InactivatePastorOptions {
  id: string;
  inactivationCategory: string;
  inactivationReason: string;
}


export const inactivatePastor = async ({id, inactivationCategory, inactivationReason} : InactivatePastorOptions): Promise<void> => {
  try {
    const {data} = await icupApi.delete(`/pastors/${id}`, {
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

// ? PASTOR REPORTS
const openPdfInNewTab = (pdfBlob: Blob): void => {
  const pdfUrl = URL.createObjectURL(pdfBlob);
  const newTab = window.open(pdfUrl, '_blank');
  newTab?.focus();
}

export const getGeneralPastorsReport = async ({limit, offset, order, churchId}: PastorQueryParams): Promise<void> => {
   try {
    const res = await icupApi<Blob>('/reports/pastors' , {
      params: {
        limit,
        offset,
        order,
        churchId
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

export const getPastorsReportByTerm = async ({   
  searchType, 
  inputTerm, 
  dateTerm, 
  selectTerm, 
  namesTerm,
  lastNamesTerm,
  limit, 
  offset, 
  order,
  churchId
}: PastorQueryParams): Promise<void> => {
  let newTerm: string | undefined = '';
  
  const termMapping: Record<PastorSearchType, string | undefined> = {
    [PastorSearchType.FirstName]: namesTerm,
    [PastorSearchType.LastName]: lastNamesTerm,
    [PastorSearchType.FullName]: `${namesTerm}-${lastNamesTerm}`,
    [PastorSearchType.BirthDate]: dateTerm,
    [PastorSearchType.BirthMonth]: selectTerm,
    [PastorSearchType.Gender]: selectTerm,
    [PastorSearchType.MaritalStatus]: selectTerm,
    [PastorSearchType.OriginCountry]: inputTerm,
    [PastorSearchType.Department]: inputTerm,
    [PastorSearchType.Province]: inputTerm,
    [PastorSearchType.District]: inputTerm,
    [PastorSearchType.UrbanSector]: inputTerm,
    [PastorSearchType.Address]: inputTerm,
    [PastorSearchType.RecordStatus]: selectTerm,
  };
  
  newTerm = termMapping[searchType as PastorSearchType];

   try {
    const res = await icupApi<Blob>(`/reports/pastors/${newTerm}` , {
      params: {
        limit,
        offset,
        order,
        churchId,
        'search-type': searchType
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