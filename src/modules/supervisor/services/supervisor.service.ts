/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';

import { RecordOrder } from '@/shared/enums';

import { SupervisorSearchType } from '@/modules/supervisor/enums';
import { type SupervisorResponse, type SupervisorFormData, type SupervisorQueryParams } from '@/modules/supervisor/interfaces';

//* Create Supervisor
export const createSupervisor = async (formData:SupervisorFormData ): Promise<SupervisorResponse> => {
  try {
    const {data} = await icupApi.post<SupervisorResponse>('/supervisors', formData)
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

//* Get simple supervisors
export interface GetSimpleSupervisorsOptions {
  isNullZone: boolean;
  isSimpleQuery: boolean;
}

export const getSimpleSupervisors = async ({isNullZone, isSimpleQuery}: GetSimpleSupervisorsOptions): Promise<SupervisorResponse[]> => {
  try {
    const {data} = await icupApi<SupervisorResponse[]>('/supervisors' , {
      params: {
        order: RecordOrder.Ascending,
        isNullZone: isNullZone.toString(),
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

//* Get supervisors (paginated)
export const getSupervisors = async ({limit, offset, all, order, churchId}: SupervisorQueryParams): Promise<SupervisorResponse[]> => {

 let result: SupervisorResponse[];

  try {
    if (!all) {
      const {data} = await icupApi<SupervisorResponse[]>('/supervisors' , {
        params: {
          limit,
          offset,
          order,
          churchId
        },
      });
      
      result = data;
    }else {
      const {data} = await icupApi<SupervisorResponse[]>('/supervisors' , {
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

//* Get supervisors by copastor
export interface GetSupervisorsByCopastorOptions {
  searchType: string;
  copastorId: string;
  isNullZone: boolean;
}

export const getSupervisorsByCopastor = async ({
  searchType,
  copastorId,
  isNullZone,
 }:GetSupervisorsByCopastorOptions): Promise<SupervisorResponse[]> => {
  try {
    const {data} = await icupApi<SupervisorResponse[]>(`/supervisors/${copastorId}` , {
      params: {
        order: RecordOrder.Ascending,
        'search-type': searchType,
        isNullZone: isNullZone.toString(),
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


// ? Get supervisors by term (paginated)
export const getSupervisorsByTerm = async ({ 
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
}: SupervisorQueryParams): Promise<SupervisorResponse[] | undefined> => {

 let result: SupervisorResponse[];

 //* Origin country, department, province, district, urban sector, address, zone
 if (searchType === SupervisorSearchType.OriginCountry||
     searchType === SupervisorSearchType.ZoneName ||
     searchType === SupervisorSearchType.Department ||
     searchType === SupervisorSearchType.Province ||
     searchType === SupervisorSearchType.District ||
     searchType === SupervisorSearchType.UrbanSector ||
     searchType === SupervisorSearchType.Address
    ) {
    try {
        if (!all) {
            const {data} = await icupApi<SupervisorResponse[]>(`/supervisors/${inputTerm}` , {
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
        const {data} = await icupApi<SupervisorResponse[]>(`/supervisors/${inputTerm}` , {
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
  if (searchType === SupervisorSearchType.BirthDate) {
    try {
      if (!all) {
        const {data} = await icupApi<SupervisorResponse[]>(`/supervisors/${dateTerm}` , {
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
        const {data} = await icupApi<SupervisorResponse[]>(`/supervisors/${dateTerm}` , {
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
  if (searchType === SupervisorSearchType.RecordStatus ||
        searchType === SupervisorSearchType.Gender ||
        searchType === SupervisorSearchType.BirthMonth ||
        searchType === SupervisorSearchType.MaritalStatus
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<SupervisorResponse[]>(`/supervisors/${selectTerm}` , {
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
          const {data} = await icupApi<SupervisorResponse[]>(`/supervisors/${selectTerm}` , {
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
  if (searchType === SupervisorSearchType.FirstName
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<SupervisorResponse[]>(`/supervisors/${namesTerm}` , {
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
          const {data} = await icupApi<SupervisorResponse[]>(`/supervisors/${namesTerm}` , {
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
  if (searchType === SupervisorSearchType.LastName
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<SupervisorResponse[]>(`/supervisors/${lastNamesTerm}` , {
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
          const {data} = await icupApi<SupervisorResponse[]>(`/supervisors/${lastNamesTerm}` , {
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
  if (searchType === SupervisorSearchType.FullName
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<SupervisorResponse[]>(`/supervisors/${namesTerm}-${lastNamesTerm}` , {
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
          const {data} = await icupApi<SupervisorResponse[]>(`/supervisors/${namesTerm}-${lastNamesTerm}` , {
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

//* Update supervisor by ID
export interface UpdateSupervisorOptions {
  id: string;
  formData: SupervisorFormData;
}

export const updateSupervisor = async ({id, formData}: UpdateSupervisorOptions ): Promise<SupervisorResponse> => {
  try {
    const {data} = await icupApi.patch<SupervisorResponse>(`/supervisors/${id}`, formData)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

//! Inactivate supervisor by ID
export interface InactivateSupervisorOptions {
  id: string;
  memberInactivationCategory: string;
  memberInactivationReason: string;
}

export const inactivateSupervisor = async ({id, memberInactivationCategory, memberInactivationReason} : InactivateSupervisorOptions): Promise<void> => {
  try {
    const {data} = await icupApi.delete(`/supervisors/${id}`, {
      params: {
        memberInactivationReason,
        memberInactivationCategory,
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

// ? SUPERVISOR REPORTS
const openPdfInNewTab = (pdfBlob: Blob): void => {
  const pdfUrl = URL.createObjectURL(pdfBlob);
  const newTab = window.open(pdfUrl, '_blank');
  newTab?.focus();
}

export const getGeneralSupervisorsReport = async ({limit, offset, order, churchId}: SupervisorQueryParams): Promise<void> => {
   try {
    const res = await icupApi<Blob>('/reports/supervisors' , {
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

export const getSupervisorsReportByTerm = async ({   
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
}: SupervisorQueryParams): Promise<void> => {
  let newTerm: string | undefined = '';
  
  const termMapping: Partial<Record<SupervisorSearchType, string | undefined>> = {
    [SupervisorSearchType.FirstName]: namesTerm,
    [SupervisorSearchType.LastName]: lastNamesTerm,
    [SupervisorSearchType.FullName]: `${namesTerm}-${lastNamesTerm}`,
    [SupervisorSearchType.BirthDate]: dateTerm,
    [SupervisorSearchType.BirthMonth]: selectTerm,
    [SupervisorSearchType.Gender]: selectTerm,
    [SupervisorSearchType.MaritalStatus]: selectTerm,
    [SupervisorSearchType.ZoneName]: inputTerm,
    [SupervisorSearchType.OriginCountry]: inputTerm,
    [SupervisorSearchType.Department]: inputTerm,
    [SupervisorSearchType.Province]: inputTerm,
    [SupervisorSearchType.District]: inputTerm,
    [SupervisorSearchType.UrbanSector]: inputTerm,
    [SupervisorSearchType.Address]: inputTerm,
    [SupervisorSearchType.RecordStatus]: selectTerm,
  };
  
  newTerm = termMapping[searchType as SupervisorSearchType];

   try {
    const res = await icupApi<Blob>(`/reports/supervisors/${newTerm}` , {
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