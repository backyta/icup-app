/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';

import { type MetricQueryParams } from '@/modules/metrics/interfaces/shared/metric-query-params.interface';

import { type FamilyGroupsByCodeResponse } from '@/modules/metrics/interfaces/family-group-metrics/family-groups-by-code-response.interface';
import { type FamilyGroupsByZoneResponse } from '@/modules/metrics/interfaces/family-group-metrics/family-groups-by-zone-response.interface';
import { type FamilyGroupsProportionResponse } from '@/modules/metrics/interfaces/family-group-metrics/family-groups-proportion-response.interface';
import { type FamilyGroupsFluctuationResponse } from '@/modules/metrics/interfaces/family-group-metrics/family-groups-fluctuation-response.interface';
import { type FamilyGroupsByServiceTimeResponse } from '@/modules/metrics/interfaces/family-group-metrics/family-groups-by-service-time-response.interface';
import { type FamilyGroupsByRecordStatusResponse } from '@/modules/metrics/interfaces/family-group-metrics/family-groups-by-record-status-response.interface';

// ? GET PROPORTION BY FAMILY GROUP
export const  getFamilyGroupsProportion = async ({ 
  searchType, 
  church,
  order
}: MetricQueryParams): Promise<FamilyGroupsProportionResponse> => {
  try {
    const {data} = await icupApi<FamilyGroupsProportionResponse>(`/metrics/${church}`, {
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

// ? SEARCH BY TERM
//* Get Fluctuation Members by year
export const  getFluctuationFamilyGroupsByYear = async ({ 
  searchType, 
  year,
  church,
  order
}: MetricQueryParams): Promise<FamilyGroupsFluctuationResponse[]> => {
  try {
    const {data} = await icupApi<FamilyGroupsFluctuationResponse[]>(`/metrics/${church}&${year}`, {
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

//* Get Family groups by code
export const  getFamilyGroupsByCode = async ({ 
  searchType, 
  allFamilyGroups,
  zone,
  church,
  order
}: MetricQueryParams): Promise<FamilyGroupsByCodeResponse> => {
  try {
    const {data} = await icupApi<FamilyGroupsByCodeResponse>(`/metrics/${church}&${zone}`, {
      params: {
        'search-type': searchType,
        allFamilyGroups: allFamilyGroups?.toString(),
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

//* Get Family groups by zone
export const  getFamilyGroupsByZone = async ({ 
  searchType, 
  allZones,
  copastor,
  church,
  order
}: MetricQueryParams): Promise<FamilyGroupsByZoneResponse> => {
  try {
    const {data} = await icupApi<FamilyGroupsByZoneResponse>(`/metrics/${church}&${copastor}`, {
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

//* Get Family groups by district
export const  getFamilyGroupsByDistrict = async ({ 
  searchType, 
  district,
  church,
  order
}: MetricQueryParams): Promise<FamilyGroupsByZoneResponse> => {
  try {
    const {data} = await icupApi<FamilyGroupsByZoneResponse>(`/metrics/${church}&${district}`, {
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

//* Get Family groups by service time
export const  getFamilyGroupsByServiceTime =  async ({ 
  searchType, 
  zone,
  church,
  allZones,
  order
}: MetricQueryParams): Promise<FamilyGroupsByServiceTimeResponse> => {
  try {
    const {data} = await icupApi<FamilyGroupsByServiceTimeResponse>(`/metrics/${church}&${zone}`, {
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

//* Get Family groups by record status
export const  getFamilyGroupsByRecordStatus =  async ({ 
  searchType, 
  zone,
  church,
  allZones,
  order
}: MetricQueryParams): Promise<FamilyGroupsByRecordStatusResponse> => {
  try {
    const {data} = await icupApi<FamilyGroupsByRecordStatusResponse>(`/metrics/${church}&${zone}`, {
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

// ? FAMILY GROUP METRICS REPORTS
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

export const getFamilyGroupMetricsReport = async ({
  year, 
  churchId, 
  types, 
  dialogClose,
}: MetricReportQueryParams): Promise<boolean> => {
  const joinedReportTypes = types.join('+');

  try {
    const res = await icupApi<Blob>('/reports/family-group-metrics' , {
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

    return true;
   } catch (error) {
     if (isAxiosError(error) && error.response) {
       throw (error.response.data)
     }
     
     throw new Error('Ocurrió un error inesperado, hable con el administrador')
   }
 }


