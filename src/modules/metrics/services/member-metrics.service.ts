/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';
import { 
  type MetricQueryParams, 
  type MembersProportionResponse, 
  type MembersByCategoryResponse, 
  type MembersFluctuationResponse,
  type MembersByBirthMonthResponse, 
  type MembersByRecordStatusResponse,
  type MembersByMaritalStatusResponse, 
  type MembersByZoneAndGenderResponse,
  type MembersByRoleAndGenderResponse, 
  type MembersByDistrictAndGenderResponse, 
  type MembersByCategoryAndGenderResponse, 
} from '@/modules/metrics/interfaces';

//* Get proportion members
export const  getMembersProportion = async ({ 
  searchType, 
  church,
  order
}: MetricQueryParams): Promise<MembersProportionResponse> => {
  try {
    const {data} = await icupApi<MembersProportionResponse>(`/metrics/${church}`, {
      params: {
        'search-type': searchType,
        order
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

// ? Search By Term
//* Get Fluctuation Members by year
export const  getFluctuationMembersByYear = async ({ 
  searchType, 
  year,
  order,
  church
}: MetricQueryParams): Promise<MembersFluctuationResponse[]> => {
  try {
    const {data} = await icupApi<MembersFluctuationResponse[]>(`/metrics/${church}&${year}`, {
      params: {
        'search-type': searchType,
        order
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
  church,
  order
}: MetricQueryParams): Promise<MembersByBirthMonthResponse[]> => {
  try {
    const {data} = await icupApi<MembersByBirthMonthResponse[]>(`/metrics/${church}`, {
      params: {
        'search-type': searchType,
        order
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
  church,
  order
}: MetricQueryParams): Promise<MembersByCategoryResponse> => {
  try {
    const {data} = await icupApi<MembersByCategoryResponse>(`/metrics/${church}`, {
      params: {
        'search-type': searchType,
        order
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
  church,
  order
}: MetricQueryParams): Promise<MembersByCategoryAndGenderResponse> => {
  try {
    const {data} = await icupApi<MembersByCategoryAndGenderResponse>(`/metrics/${church}`, {
      params: {
        'search-type': searchType,
        order
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
  church,
  order
}: MetricQueryParams): Promise<MembersByRoleAndGenderResponse> => {
  try {
    const {data} = await icupApi<MembersByRoleAndGenderResponse>(`/metrics/${church}`, {
      params: {
        'search-type': searchType,
        order
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
  church,
  order
}: MetricQueryParams): Promise<MembersByMaritalStatusResponse> => {
  try {
    const {data} = await icupApi<MembersByMaritalStatusResponse>(`/metrics/${church}`, {
      params: {
        'search-type': searchType,
        order
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
  church,
  copastor,
  allZones,
  order
}: MetricQueryParams): Promise<MembersByZoneAndGenderResponse> => {
  try {
    const {data} = await icupApi<MembersByZoneAndGenderResponse>(`/metrics/${church}&${copastor}`, {
      params: {
        'search-type': searchType,
        allZones: allZones?.toString(),
        order
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
  church,
  copastor,
  allZones,
  order
}: MetricQueryParams): Promise<MembersByZoneAndGenderResponse> => {
  try {
    const {data} = await icupApi<MembersByZoneAndGenderResponse>(`/metrics/${church}&${copastor}`, {
      params: {
        'search-type': searchType,
        allZones: allZones?.toString(),
        order
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

//* Get members by district and gender
export const  getMembersByDistrictAndGender = async ({ 
  searchType, 
  church,
  district,
  order
}: MetricQueryParams): Promise<MembersByDistrictAndGenderResponse> => {
  try {
    const {data} = await icupApi<MembersByDistrictAndGenderResponse>(`/metrics/${church}&${district}`, {
      params: {
        'search-type': searchType,
        order
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
  church,
  order
}: MetricQueryParams): Promise<MembersByRecordStatusResponse> => {
  try {
    const {data} = await icupApi<MembersByRecordStatusResponse>(`/metrics/${church}`, {
      params: {
        'search-type': searchType,
        order
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

// ? MEMBER METRICS REPORTS
const openPdfInNewTab = (pdfBlob: Blob): void => {
  const pdfUrl = URL.createObjectURL(pdfBlob);
  const newTab = window.open(pdfUrl, '_blank');
  newTab?.focus();
}

interface MetricReportQueryParams {
  year: string;
  churchId: string; 
  types: string[];
  dialogClose: () => void;
}

export const getMemberMetricsReport = async ({
  year, 
  churchId, 
  types, 
  dialogClose,
}: MetricReportQueryParams): Promise<void> => {
  const joinedReportTypes = types.join('+');

  try {
    const res = await icupApi<Blob>('/reports/member-metrics' , {
      params: {
        churchId,
        year,
        types: joinedReportTypes,
      },
      headers: {
        'Content-Type': 'application/pdf',
      },
      responseType: 'blob',
    });
    
    openPdfInNewTab(res.data);
    dialogClose();
   } catch (error) {
     if (isAxiosError(error) && error.response) {
       throw (error.response.data)
     }
     
     throw new Error('Ocurrió un error inesperado, hable con el administrador')
   }
 }