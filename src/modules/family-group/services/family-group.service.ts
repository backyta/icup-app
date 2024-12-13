/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';

import { RecordOrder } from '@/shared/enums/record-order.enum';

import { FamilyGroupSearchType } from '@/modules/family-group/enums/family-group-search-type.enum';

import { type FamilyGroupResponse } from '@/modules/family-group/interfaces/family-group-response.interface';
import { type FamilyGroupFormData } from '@/modules/family-group/interfaces/family-group-form-data.interface';
import { type FamilyGroupQueryParams } from '@/modules/family-group/interfaces/family-group-query-params.interface';
import { type FamilyGroupPreacherUpdateFormData } from '@/modules/family-group/interfaces/family-group-preacher-update-form-data.interface';

//* Create family-group
export const createFamilyGroup = async (formData:FamilyGroupFormData ): Promise<FamilyGroupResponse> => {
  try {
    const {data} = await icupApi.post<FamilyGroupResponse>('/family-groups', formData)
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

//* Get simple family-groups
export const getSimpleFamilyGroups = async ({isSimpleQuery, churchId}:{isSimpleQuery: boolean; churchId?: string}): Promise<FamilyGroupResponse[]> => {
  try {
    const {data} = await icupApi<FamilyGroupResponse[]>('/family-groups' , {
      params: {
        order: RecordOrder.Ascending,
        churchId,
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

//* Get family groups (paginated)
export const getFamilyGroups = async ({limit, offset, all, order, churchId}: FamilyGroupQueryParams): Promise<FamilyGroupResponse[]> => {

 let result: FamilyGroupResponse[];

  try {
    if (!all) {
      const {data} = await icupApi<FamilyGroupResponse[]>('/family-groups' , {
        params: {
          limit,
          offset,
          order,
          churchId,
        },
      });
      
      result = data;
    }else {
      const {data} = await icupApi<FamilyGroupResponse[]>('/family-groups' , {
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

// ? Get family groups by term (paginated)
export const getFamilyGroupsByTerm = async ({ 
  searchType, 
  searchSubType, 
  inputTerm, 
  selectTerm, 
  firstNamesTerm,
  lastNamesTerm,
  limit, 
  offset, 
  all, 
  order,
  churchId
}: FamilyGroupQueryParams): Promise<FamilyGroupResponse[] | undefined> => {

 let result: FamilyGroupResponse[];

 //* Origin department, province, district, urban sector, address
 if (searchType === FamilyGroupSearchType.ZoneName ||
     searchType === FamilyGroupSearchType.FamilyGroupCode ||
     searchType === FamilyGroupSearchType.FamilyGroupName ||
     searchType === FamilyGroupSearchType.Country ||
     searchType === FamilyGroupSearchType.Department ||
     searchType === FamilyGroupSearchType.Province ||
     searchType === FamilyGroupSearchType.District ||
     searchType === FamilyGroupSearchType.UrbanSector ||
     searchType === FamilyGroupSearchType.Address
    ) {
    try {
        if (!all) {
            const {data} = await icupApi<FamilyGroupResponse[]>(`/family-groups/${inputTerm}` , {
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
        const {data} = await icupApi<FamilyGroupResponse[]>(`/family-groups/${inputTerm}` , {
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

 //* Status
  if (searchType === FamilyGroupSearchType.RecordStatus ) {
      try {
        if (!all) {
          const {data} = await icupApi<FamilyGroupResponse[]>(`/family-groups/${selectTerm}` , {
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
          const {data} = await icupApi<FamilyGroupResponse[]>(`/family-groups/${selectTerm}` , {
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
  if (searchType === FamilyGroupSearchType.FirstNames
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<FamilyGroupResponse[]>(`/family-groups/${firstNamesTerm}` , {
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
          const {data} = await icupApi<FamilyGroupResponse[]>(`/family-groups/${firstNamesTerm}` , {
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
  if (searchType === FamilyGroupSearchType.LastNames
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<FamilyGroupResponse[]>(`/family-groups/${lastNamesTerm}` , {
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
          const {data} = await icupApi<FamilyGroupResponse[]>(`/family-groups/${lastNamesTerm}` , {
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
  if (searchType === FamilyGroupSearchType.FullNames
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<FamilyGroupResponse[]>(`/family-groups/${firstNamesTerm}-${lastNamesTerm}` , {
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
          const {data} = await icupApi<FamilyGroupResponse[]>(`/family-groups/${firstNamesTerm}-${lastNamesTerm}` , {
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

//* Update family group by ID
export interface UpdateFamilyGroupOptions {
  id: string;
  formData: FamilyGroupFormData | FamilyGroupPreacherUpdateFormData;
}

export const updateFamilyGroup = async ({id, formData}: UpdateFamilyGroupOptions ): Promise<FamilyGroupResponse> => {
  try {
    const {data} = await icupApi.patch<FamilyGroupResponse>(`/family-groups/${id}`, formData)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado')
  }
}

// //! Inactivate family group by ID
export interface InactivateFamilyGroupOptions {
  id: string;
  familyGroupInactivationCategory: string;
  familyGroupInactivationReason: string;
}

export const inactivateFamilyGroup = async ({id, familyGroupInactivationCategory, familyGroupInactivationReason}: InactivateFamilyGroupOptions): Promise<void> => {
  try {
    const {data} = await icupApi.delete(`/family-groups/${id}`, {
      params: {
        familyGroupInactivationCategory,
        familyGroupInactivationReason,
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

// ? FAMILY GROUP REPORTS
const openPdfInNewTab = (pdfBlob: Blob): void => {
  const pdfUrl = URL.createObjectURL(pdfBlob);
  const newTab = window.open(pdfUrl, '_blank');
  newTab?.focus();
}

export const getGeneralFamilyGroupsReport = async ({limit, offset, order, churchId}: FamilyGroupQueryParams): Promise<void> => {
   try {
    const res = await icupApi<Blob>('/reports/family-groups' , {
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

export const getFamilyGroupsReportByTerm = async ({
  searchType,
  searchSubType,
  firstNamesTerm,
  lastNamesTerm,
  inputTerm, 
  selectTerm, 
  limit, 
  offset, 
  order,
  churchId
}: FamilyGroupQueryParams): Promise<void> => {
  let newTerm: string | undefined = '';
  
  const termMapping: Partial<Record<FamilyGroupSearchType, string | undefined>> = {
    [FamilyGroupSearchType.FirstNames]: firstNamesTerm,
    [FamilyGroupSearchType.LastNames]: lastNamesTerm,
    [FamilyGroupSearchType.FullNames]: `${firstNamesTerm}-${lastNamesTerm}`,
    [FamilyGroupSearchType.ZoneName]: inputTerm,
    [FamilyGroupSearchType.FamilyGroupCode]: inputTerm,
    [FamilyGroupSearchType.FamilyGroupName]: inputTerm,
    [FamilyGroupSearchType.Department]: inputTerm,
    [FamilyGroupSearchType.Province]: inputTerm,
    [FamilyGroupSearchType.District]: inputTerm,
    [FamilyGroupSearchType.UrbanSector]: inputTerm,
    [FamilyGroupSearchType.Address]: inputTerm,
    [FamilyGroupSearchType.RecordStatus]: selectTerm,
  };
  
  newTerm = termMapping[searchType as FamilyGroupSearchType];

   try {
    const res = await icupApi<Blob>(`/reports/family-groups/${newTerm}` , {
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