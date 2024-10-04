/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';
import { 
  type MetricQueryParams,
  type FamilyGroupsByCodeResponse,
  type FamilyGroupsByZoneResponse,
  type FamilyGroupsProportionResponse,
  type FamilyGroupsFluctuationResponse,
  type FamilyGroupsByWorshipTimeResponse,
  type FamilyGroupsByRecordStatusResponse,
} from '@/modules/metrics/interfaces';

//* Get proportion family groups
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

// ? Search By Term
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

//* Get Family groups by zone
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

//* Get Family groups by worship time
export const  getFamilyGroupsByWorshipTime =  async ({ 
  searchType, 
  zone,
  church,
  allZones,
  order
}: MetricQueryParams): Promise<FamilyGroupsByWorshipTimeResponse> => {
  try {
    const {data} = await icupApi<FamilyGroupsByWorshipTimeResponse>(`/metrics/${church}&${zone}`, {
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


