/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';

import { RecordOrder } from '@/shared/enums';

import { CopastorSearchType } from '@/modules/copastor/enums';
import { type CopastorResponse, type CopastorFormData, type CopastorQueryParams } from '@/modules/copastor/interfaces';


//* Create co-pastor
export const createCopastor = async (formData:CopastorFormData ): Promise<CopastorResponse> => {
  try {
    const {data} = await icupApi.post<CopastorResponse>('/copastors', formData)
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

//* Get simple co-pastors
export const getSimpleCopastors = async ({churchId, isSimpleQuery}: {churchId?: string; isSimpleQuery: boolean}): Promise<CopastorResponse[]> => {
  try {
    const {data} = await icupApi<CopastorResponse[]>('/copastors' , {
      params: {
        order: RecordOrder.Ascending,
        isSimpleQuery: isSimpleQuery.toString(),
        churchId
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

//* Get all co-pastors (paginated)
export const getCopastors = async ({limit, offset, all, order, churchId}: CopastorQueryParams): Promise<CopastorResponse[]> => {

 let result: CopastorResponse[];

  try {
    if (!all) {
      const {data} = await icupApi<CopastorResponse[]>('/copastors' , {
        params: {
          limit,
          offset,
          order,
          churchId,
        },
      });
      
      result = data;
    }else {
      const {data} = await icupApi<CopastorResponse[]>('/copastors' , {
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

// ? Get co-pastors by term (paginated)
export const getCopastorsByTerm = async ({ 
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
  churchId,
}: CopastorQueryParams): Promise<CopastorResponse[] | undefined> => {

 let result: CopastorResponse[];

 //* Origin country, department, province, district, urban sector, address
 if (searchType === CopastorSearchType.OriginCountry||
     searchType === CopastorSearchType.Department ||
     searchType === CopastorSearchType.Province ||
     searchType === CopastorSearchType.District ||
     searchType === CopastorSearchType.UrbanSector ||
     searchType === CopastorSearchType.Address
    ) {
    try {
        if (!all) {
            const {data} = await icupApi<CopastorResponse[]>(`/copastors/${inputTerm}` , {
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
        const {data} = await icupApi<CopastorResponse[]>(`/copastors/${inputTerm}` , {
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
  if (searchType === CopastorSearchType.BirthDate) {
    try {
      if (!all) {
        const {data} = await icupApi<CopastorResponse[]>(`/copastors/${dateTerm}` , {
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
        const {data} = await icupApi<CopastorResponse[]>(`/copastors/${dateTerm}` , {
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
  if (searchType === CopastorSearchType.RecordStatus ||
        searchType === CopastorSearchType.Gender ||
        searchType === CopastorSearchType.BirthMonth ||
        searchType === CopastorSearchType.MaritalStatus
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<CopastorResponse[]>(`/copastors/${selectTerm}` , {
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
          const {data} = await icupApi<CopastorResponse[]>(`/copastors/${selectTerm}` , {
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
  if (searchType === CopastorSearchType.FirstName
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<CopastorResponse[]>(`/copastors/${namesTerm}` , {
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
          const {data} = await icupApi<CopastorResponse[]>(`/copastors/${namesTerm}` , {
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
  if (searchType === CopastorSearchType.LastName
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<CopastorResponse[]>(`/copastors/${lastNamesTerm}` , {
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
          const {data} = await icupApi<CopastorResponse[]>(`/copastors/${lastNamesTerm}` , {
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
  if (searchType === CopastorSearchType.FullName
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<CopastorResponse[]>(`/copastors/${namesTerm}-${lastNamesTerm}` , {
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
          const {data} = await icupApi<CopastorResponse[]>(`/copastors/${namesTerm}-${lastNamesTerm}` , {
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

// //* Update co-pastor by ID
export interface UpdateCopastorOptions {
  id: string;
  formData: CopastorFormData;
}

export const updateCopastor = async ({id, formData}: UpdateCopastorOptions ): Promise<CopastorResponse> => {
  try {
    const {data} = await icupApi.patch<CopastorResponse>(`/copastors/${id}`, formData)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

// //! Delete co-pastor by ID
export const deleteCopastor = async (id: string ): Promise<void> => {
  try {
    const {data} = await icupApi.delete(`/copastors/${id}`)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado, hable con el administrador')
  }
}

// ? COPASTOR REPORTS
const openPdfInNewTab = (pdfBlob: Blob): void => {
  const pdfUrl = URL.createObjectURL(pdfBlob);
  const newTab = window.open(pdfUrl, '_blank');
  newTab?.focus();
}

export const getGeneralCopastorsReport = async ({limit, offset, order, churchId}: CopastorQueryParams): Promise<void> => {
   try {
    const res = await icupApi<Blob>('/reports/copastors' , {
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

export const getCopastorsReportByTerm = async ({   
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
  churchId,
}: CopastorQueryParams): Promise<void> => {
  let newTerm: string | undefined = '';
  
  const termMapping: Record<CopastorSearchType, string | undefined> = {
    [CopastorSearchType.FirstName]: namesTerm,
    [CopastorSearchType.LastName]: lastNamesTerm,
    [CopastorSearchType.FullName]: `${namesTerm}-${lastNamesTerm}`,
    [CopastorSearchType.BirthDate]: dateTerm,
    [CopastorSearchType.BirthMonth]: selectTerm,
    [CopastorSearchType.Gender]: selectTerm,
    [CopastorSearchType.MaritalStatus]: selectTerm,
    [CopastorSearchType.OriginCountry]: inputTerm,
    [CopastorSearchType.Department]: inputTerm,
    [CopastorSearchType.Province]: inputTerm,
    [CopastorSearchType.District]: inputTerm,
    [CopastorSearchType.UrbanSector]: inputTerm,
    [CopastorSearchType.Address]: inputTerm,
    [CopastorSearchType.RecordStatus]: selectTerm,
  };
  
  newTerm = termMapping[searchType as CopastorSearchType];

   try {
    const res = await icupApi<Blob>(`/reports/copastors/${newTerm}` , {
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