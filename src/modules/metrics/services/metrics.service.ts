/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';
import { 
  type MetricQueryParams, 
  type MembersByRoleAndGenderResponse, 
  type AllMembersCountResponse, 
  type MembersByCategoryResponse, 
  type MembersFluctuationResponse,
  type MembersByBirthMonthResponse, 
  type MembersByRecordStatusResponse,
  type MembersByMaritalStatusResponse, 
  type MembersByZoneAndGenderResponse,
  type MembersByDistrictAndGenderResponse, 
  type MembersByCategoryAndGenderResponse, 
} from '@/modules/metrics/interfaces';


//* Get count all members
export const  getMembersProportion = async (): Promise<AllMembersCountResponse> => {

  try {
    const {data} = await icupApi<AllMembersCountResponse>('/metrics');
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (error.response.data)
    }
    
    throw new Error('Ocurrió un error inesperado, hable con el administrador')
  }
}


// ? Search By Term
//* Get Fluctuation Members by year
export const  getFluctuationMembersByYear = async ({ 
  searchType, 
  year,
}: MetricQueryParams): Promise<MembersFluctuationResponse> => {
  try {
    const {data} = await icupApi<MembersFluctuationResponse>(`/metrics/${year}`, {
      params: {
        'search-type': searchType,
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

//* Get members by birth month
export const  getMembersByBirthMonth = async ({ 
  searchType, 
  year,
}: MetricQueryParams): Promise<MembersByBirthMonthResponse> => {
  try {
    const {data} = await icupApi<MembersByBirthMonthResponse>(`/metrics/${year}`, {
      params: {
        'search-type': searchType,
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

//* Get members by category
export const  getMembersByCategory = async ({ 
  searchType, 
  year,
}: MetricQueryParams): Promise<MembersByCategoryResponse> => {
  try {
    const {data} = await icupApi<MembersByCategoryResponse>(`/metrics/${year}`, {
      params: {
        'search-type': searchType,
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

//* Get members by category and gender
export const  getMembersByCategoryAndGender = async ({ 
  searchType, 
  year,
}: MetricQueryParams): Promise<MembersByCategoryAndGenderResponse> => {
  try {
    const {data} = await icupApi<MembersByCategoryAndGenderResponse>(`/metrics/${year}`, {
      params: {
        'search-type': searchType,
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

//* Get members by role
export const  getMembersByRole = async ({ 
  searchType, 
  year,
}: MetricQueryParams): Promise<MembersByRoleAndGenderResponse> => {
  try {
    const {data} = await icupApi<MembersByRoleAndGenderResponse>(`/metrics/${year}`, {
      params: {
        'search-type': searchType,
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

//* Get members by marital status
export const  getMembersByMaritalStatus = async ({ 
  searchType, 
  year,
}: MetricQueryParams): Promise<MembersByMaritalStatusResponse> => {
  try {
    const {data} = await icupApi<MembersByMaritalStatusResponse>(`/metrics/${year}`, {
      params: {
        'search-type': searchType,
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

//* Get members by zone and gender
export const  getMembersByZoneAndGender = async ({ 
  searchType, 
  copastor,
  allZones,
}: MetricQueryParams): Promise<MembersByZoneAndGenderResponse> => {
  try {
    const {data} = await icupApi<MembersByZoneAndGenderResponse>(`/metrics/${copastor}`, {
      params: {
        'search-type': searchType,
        allZones: allZones?.toString()
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

//* Get preacher by zone and gender
export const  getPreachersByZoneAndGender = async ({ 
  searchType, 
  copastor,
  allZones,
}: MetricQueryParams): Promise<MembersByZoneAndGenderResponse> => {
  try {
    const {data} = await icupApi<MembersByZoneAndGenderResponse>(`/metrics/${copastor}`, {
      params: {
        'search-type': searchType,
        allZones: allZones?.toString()
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

// TODO : eliminar los query params innecesarios

//* Get members by district and gender
export const  getMembersByDistrictAndGender = async ({ 
  searchType, 
  district,
}: MetricQueryParams): Promise<MembersByDistrictAndGenderResponse> => {
  try {
    const {data} = await icupApi<MembersByDistrictAndGenderResponse>(`/metrics/${district}`, {
      params: {
        'search-type': searchType,
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

//* Get Members by record status
export const  getMembersByRecordStatus = async ({ 
  searchType, 
  year,
}: MetricQueryParams): Promise<MembersByRecordStatusResponse> => {
  try {
    const {data} = await icupApi<MembersByRecordStatusResponse>(`/metrics/${year}`, {
      params: {
        'search-type': searchType,
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