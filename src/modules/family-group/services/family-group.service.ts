/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';

import { type FamilyGroupResponse , type FamilyGroupFormData, type FamilyGroupQueryParams, type FamilyGroupPreacherUpdateFormData } from '@/modules/family-group/interfaces';

import { type ZoneResponse } from '@/modules/zone/interfaces';

import { FamilyGroupSearchType } from '@/modules/family-group/enums';
import { type PreacherResponse } from '@/modules/preacher/interfaces';

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

//* Get all zones
export const getAllZones = async (): Promise<ZoneResponse[]> => {
  try {
    const {data} = await icupApi<ZoneResponse[]>('/zones' , {
      params: {
        order: 'ASC'
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

//* Get all preachers
export const getAllPreachers = async (): Promise<PreacherResponse[]> => {
  try {
    const {data} = await icupApi<PreacherResponse[]>('/preachers' , {
      params: {
        order: 'ASC'
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
  isNull: string;
}

export const getAllPreachersByZone = async ({
  searchType,
  zoneId,
  isNull,
 }:GetPreachersByZoneOptions): Promise<PreacherResponse[]> => {
  try {
    const {data} = await icupApi<PreacherResponse[]>(`/preachers/${zoneId}` , {
      params: {
        order: 'ASC',
        'search-type': searchType,
        isNull,
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


//* Get all family groups (paginated)
export const getFamilyGroups = async ({limit, offset, all, order}: FamilyGroupQueryParams): Promise<FamilyGroupResponse[]> => {

 let result: FamilyGroupResponse[];

  try {
    if (!all) {
      const {data} = await icupApi<FamilyGroupResponse[]>('/family-groups' , {
        params: {
          limit,
          offset,
          order,
        },
      });
      
      result = data;
    }else {
      const {data} = await icupApi<FamilyGroupResponse[]>('/family-groups' , {
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

// ? Get family groups by term (paginated)
export const getFamilyGroupsByTerm = async ({ 
  searchType, 
  searchSubType, 
  inputTerm, 
  selectTerm, 
  namesTerm,
  lastNamesTerm,
  limit, 
  offset, 
  all, 
  order
}: FamilyGroupQueryParams): Promise<FamilyGroupResponse[] | undefined> => {

 let result: FamilyGroupResponse[];

 //* Origin department, province, district, urban sector, address
 if (searchType === FamilyGroupSearchType.ZoneName ||
     searchType === FamilyGroupSearchType.FamilyGroupCode ||
     searchType === FamilyGroupSearchType.FamilyGroupName ||
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
            'search-type': searchType
          },
        });
        
        result = data;
      }else {
        const {data} = await icupApi<FamilyGroupResponse[]>(`/family-groups/${inputTerm}` , {
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

 //* Status
  if (searchType === FamilyGroupSearchType.RecordStatus ) {
      try {
        if (!all) {
          const {data} = await icupApi<FamilyGroupResponse[]>(`/family-groups/${selectTerm}` , {
            params: {
              limit,
              offset,
              order,
              'search-type': searchType
            },
          });
          
          result = data;
        }else {
          const {data} = await icupApi<FamilyGroupResponse[]>(`/family-groups/${selectTerm}` , {
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

 //* First Name
  if (searchType === FamilyGroupSearchType.FirstName
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<FamilyGroupResponse[]>(`/family-groups/${namesTerm}` , {
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
          const {data} = await icupApi<FamilyGroupResponse[]>(`/family-groups/${namesTerm}` , {
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

 //* Last Name 
  if (searchType === FamilyGroupSearchType.LastName
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<FamilyGroupResponse[]>(`/family-groups/${lastNamesTerm}` , {
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
          const {data} = await icupApi<FamilyGroupResponse[]>(`/family-groups/${lastNamesTerm}` , {
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

 //* Full Name
  if (searchType === FamilyGroupSearchType.FullName
      ) {
      try {
        if (!all) {
          const {data} = await icupApi<FamilyGroupResponse[]>(`/family-groups/${namesTerm}-${lastNamesTerm}` , {
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
          const {data} = await icupApi<FamilyGroupResponse[]>(`/family-groups/${namesTerm}-${lastNamesTerm}` , {
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

// //! Delete family group by ID
export const deleteFamilyGroup = async (id: string ): Promise<void> => {
  try {
    const {data} = await icupApi.delete(`/family-groups/${id}`)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado, hable con el administrador')
  }
}
