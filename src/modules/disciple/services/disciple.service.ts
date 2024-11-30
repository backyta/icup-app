/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';

import { RecordOrder } from '@/shared/enums';

import { DiscipleSearchType } from '@/modules/disciple/enums';
import { type DiscipleResponse, type DiscipleFormData, type DiscipleQueryParams } from '@/modules/disciple/interfaces';


//* Create disciple
export const createDisciple = async (formData:DiscipleFormData ): Promise<DiscipleResponse> => {
  try {
    const {data} = await icupApi.post<DiscipleResponse>('/disciples', formData)
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

//* Get simple disciples
export const getSimpleDisciples = async ({isSimpleQuery}:{isSimpleQuery: true}): Promise<DiscipleResponse[]> => {
  try {
    const {data} = await icupApi<DiscipleResponse[]>('/disciples' , {
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

//* Get disciples (paginated)
export const getDisciples = async ({limit, offset, all, order, churchId}: DiscipleQueryParams): Promise<DiscipleResponse[]> => {
  
 let result: DiscipleResponse[];

  try {
    if (!all) {
      const {data} = await icupApi<DiscipleResponse[]>('/disciples' , {
        params: {
          limit,
          offset,
          order,
          churchId,
        },
      });
      
      result = data;
    }else {
      const {data} = await icupApi<DiscipleResponse[]>('/disciples' , {
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

// ? Get disciples by term (paginated)
export const getDisciplesByTerm = async ({ 
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
}: DiscipleQueryParams): Promise<DiscipleResponse[] | undefined> => {

 let result: DiscipleResponse[];

 //* Origin country, department, province, district, urban sector, address
 if (searchType === DiscipleSearchType.ZoneName||
     searchType === DiscipleSearchType.FamilyGroupCode ||
     searchType === DiscipleSearchType.FamilyGroupName ||
     searchType === DiscipleSearchType.OriginCountry||
     searchType === DiscipleSearchType.Department ||
     searchType === DiscipleSearchType.Province ||
     searchType === DiscipleSearchType.District ||
     searchType === DiscipleSearchType.UrbanSector ||
     searchType === DiscipleSearchType.Address
    ) {
    try {
        if (!all) {
            const {data} = await icupApi<DiscipleResponse[]>(`/disciples/${inputTerm}` , {
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
        const {data} = await icupApi<DiscipleResponse[]>(`/disciples/${inputTerm}` , {
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
  if (searchType === DiscipleSearchType.BirthDate) {
    try {
      if (!all) {
        const {data} = await icupApi<DiscipleResponse[]>(`/disciples/${dateTerm}` , {
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
        const {data} = await icupApi<DiscipleResponse[]>(`/disciples/${dateTerm}` , {
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
  if (searchType === DiscipleSearchType.RecordStatus ||
        searchType === DiscipleSearchType.Gender ||
        searchType === DiscipleSearchType.BirthMonth ||
        searchType === DiscipleSearchType.MaritalStatus
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<DiscipleResponse[]>(`/disciples/${selectTerm}` , {
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
          const {data} = await icupApi<DiscipleResponse[]>(`/disciples/${selectTerm}` , {
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
  if (searchType === DiscipleSearchType.FirstName
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<DiscipleResponse[]>(`/disciples/${namesTerm}` , {
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
          const {data} = await icupApi<DiscipleResponse[]>(`/disciples/${namesTerm}` , {
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
  if (searchType === DiscipleSearchType.LastName
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<DiscipleResponse[]>(`/disciples/${lastNamesTerm}` , {
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
          const {data} = await icupApi<DiscipleResponse[]>(`/disciples/${lastNamesTerm}` , {
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
  if (searchType === DiscipleSearchType.FullName
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<DiscipleResponse[]>(`/disciples/${namesTerm}-${lastNamesTerm}` , {
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
          const {data} = await icupApi<DiscipleResponse[]>(`/disciples/${namesTerm}-${lastNamesTerm}` , {
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

// //* Update disciple by ID
export interface UpdateDiscipleOptions {
  id: string;
  formData: DiscipleFormData;
}

export const updateDisciple = async ({id, formData}: UpdateDiscipleOptions ): Promise<DiscipleResponse> => {
  try {
    const {data} = await icupApi.patch<DiscipleResponse>(`/disciples/${id}`, formData)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

// //! Delete disciple by ID
export const deleteDisciple = async (id: string ): Promise<void> => {
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

// ? DISCIPLE REPORTS
const openPdfInNewTab = (pdfBlob: Blob): void => {
  const pdfUrl = URL.createObjectURL(pdfBlob);
  const newTab = window.open(pdfUrl, '_blank');
  newTab?.focus();
}

export const getGeneralDisciplesReport = async ({limit, offset, order, churchId}: DiscipleQueryParams): Promise<void> => {
   try {
    const res = await icupApi<Blob>('/reports/disciples' , {
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

export const getDisciplesReportByTerm = async ({   
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
}: DiscipleQueryParams): Promise<void> => {
  let newTerm: string | undefined = '';
  
  const termMapping: Record<DiscipleSearchType, string | undefined> = {
    [DiscipleSearchType.FirstName]: namesTerm,
    [DiscipleSearchType.LastName]: lastNamesTerm,
    [DiscipleSearchType.FullName]: `${namesTerm}-${lastNamesTerm}`,
    [DiscipleSearchType.BirthDate]: dateTerm,
    [DiscipleSearchType.BirthMonth]: selectTerm,
    [DiscipleSearchType.Gender]: selectTerm,
    [DiscipleSearchType.MaritalStatus]: selectTerm,
    [DiscipleSearchType.OriginCountry]: inputTerm,
    [DiscipleSearchType.ZoneName]: inputTerm,
    [DiscipleSearchType.FamilyGroupCode]: inputTerm,
    [DiscipleSearchType.FamilyGroupName]: inputTerm,
    [DiscipleSearchType.Department]: inputTerm,
    [DiscipleSearchType.Province]: inputTerm,
    [DiscipleSearchType.District]: inputTerm,
    [DiscipleSearchType.UrbanSector]: inputTerm,
    [DiscipleSearchType.Address]: inputTerm,
    [DiscipleSearchType.RecordStatus]: selectTerm,
  };
  
  newTerm = termMapping[searchType as DiscipleSearchType];

   try {
    const res = await icupApi<Blob>(`/reports/disciples/${newTerm}` , {
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