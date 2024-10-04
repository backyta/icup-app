/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';
import { 
  type MetricQueryParams, 
  type OfferingsIncomeProportionResponse,
  type OfferingsIncomeByFamilyGroupResponse,
  type OfferingsIncomeBySundayServiceResponse, 
  type OfferingsIncomeByFastingAndVigilResponse,
} from '@/modules/metrics/interfaces';


//* Get proportion members
export const  getOfferingsIncomeProportion = async ({ 
  searchType, 
  church,
  order
}: MetricQueryParams): Promise<OfferingsIncomeProportionResponse> => {
  try {
    const {data} = await icupApi<OfferingsIncomeProportionResponse>(`/metrics/${church}`, {
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
//* Offerings income by sunday service
export const  getOfferingsIncomeBySundayService = async ({ 
  searchType, 
  church,
  month,
  year,
  order
}: MetricQueryParams): Promise<OfferingsIncomeBySundayServiceResponse[]> => {
  try {
    const {data} = await icupApi<OfferingsIncomeBySundayServiceResponse[]>(`/metrics/${church}&${month}&${year}`, {
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

//* Offerings income by family group
export const  getOfferingsIncomeByFamilyGroup = async ({ 
  searchType,
  zone,
  church,
  month,
  year,
  order
}: MetricQueryParams): Promise<OfferingsIncomeByFamilyGroupResponse[]> => {
  try {
    const {data} = await icupApi<OfferingsIncomeByFamilyGroupResponse[]>(`/metrics/${church}&${zone}&${month}&${year}`, {
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

//* Offerings income by sunday school
export const  getOfferingsIncomeBySundaySchool = async ({ 
  searchType, 
  church,
  month,
  year,
  order
}: MetricQueryParams): Promise<OfferingsIncomeBySundayServiceResponse[]> => {
  try {
    const {data} = await icupApi<OfferingsIncomeBySundayServiceResponse[]>(`/metrics/${church}&${month}&${year}`, {
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

//* Offerings income by sunday school
export const  getOfferingsIncomeByFastingAndVigil = async ({ 
  searchType, 
  church,
  month,
  year,
  order
}: MetricQueryParams): Promise<OfferingsIncomeByFastingAndVigilResponse[]> => {
  try {
    const {data} = await icupApi<OfferingsIncomeByFastingAndVigilResponse[]>(`/metrics/${church}&${month}&${year}`, {
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



