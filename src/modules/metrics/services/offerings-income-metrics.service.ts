/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';
import { 
  type MetricQueryParams, 
  type OfferingIncomeProportionResponse,
  type OfferingIncomeByFamilyGroupResponse,
  type OfferingIncomeBySundayServiceResponse, 
  type OfferingIncomeByFastingAndVigilResponse,
  type OfferingIncomeByYouthServiceResponse,
  type OfferingIncomeBySpecialOfferingResponse,
  type OfferingIncomeByUnitedServiceResponse,
  type OfferingIncomeByActivitiesResponse,
  type OfferingIncomeByIncomeAdjustmentResponse,
} from '@/modules/metrics/interfaces';


//* Get proportion offering income 
export const getOfferingIncomeProportion = async ({ 
  searchType, 
  church,
  order
}: MetricQueryParams): Promise<OfferingIncomeProportionResponse> => {
  try {
    const {data} = await icupApi<OfferingIncomeProportionResponse>(`/metrics/${church}`, {
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
//* Offering income by sunday service
export const getOfferingIncomeBySundayService = async ({ 
  searchType, 
  church,
  month,
  year,
  order
}: MetricQueryParams): Promise<OfferingIncomeBySundayServiceResponse[]> => {
  try {
    const {data} = await icupApi<OfferingIncomeBySundayServiceResponse[]>(`/metrics/${church}&${month}&${year}`, {
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

//* Offering income by family group
export const getOfferingIncomeByFamilyGroup = async ({ 
  searchType,
  zone,
  church,
  month,
  year,
  order
}: MetricQueryParams): Promise<OfferingIncomeByFamilyGroupResponse[]> => {
  try {
    const {data} = await icupApi<OfferingIncomeByFamilyGroupResponse[]>(`/metrics/${church}&${zone}&${month}&${year}`, {
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

//* Offering income by sunday school
export const getOfferingIncomeBySundaySchool = async ({ 
  searchType, 
  church,
  month,
  year,
  order
}: MetricQueryParams): Promise<OfferingIncomeBySundayServiceResponse[]> => {
  try {
    const {data} = await icupApi<OfferingIncomeBySundayServiceResponse[]>(`/metrics/${church}&${month}&${year}`, {
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

//* Offering income by fasting and vigil
export const getOfferingIncomeByFastingAndVigil = async ({ 
  searchType, 
  church,
  month,
  year,
  order
}: MetricQueryParams): Promise<OfferingIncomeByFastingAndVigilResponse[]> => {
  try {
    const {data} = await icupApi<OfferingIncomeByFastingAndVigilResponse[]>(`/metrics/${church}&${month}&${year}`, {
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

//* Offering income by youth service
export const getOfferingIncomeByYouthService = async ({ 
  searchType, 
  church,
  month,
  year,
  order
}: MetricQueryParams): Promise<OfferingIncomeByYouthServiceResponse[]> => {
  try {
    const {data} = await icupApi<OfferingIncomeByYouthServiceResponse[]>(`/metrics/${church}&${month}&${year}`, {
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

//* Offering income by special offering
export const getOfferingIncomeBySpecialOffering = async ({ 
  searchType, 
  church,
  month,
  year,
  order
}: MetricQueryParams): Promise<OfferingIncomeBySpecialOfferingResponse[]> => {
  try {
    const {data} = await icupApi<OfferingIncomeBySpecialOfferingResponse[]>(`/metrics/${church}&${month}&${year}`, {
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

//* Offering income by church ground
export const getOfferingIncomeByChurchGround = async ({ 
  searchType, 
  church,
  month,
  year,
  order
}: MetricQueryParams): Promise<OfferingIncomeBySpecialOfferingResponse[]> => {
  try {
    const {data} = await icupApi<OfferingIncomeBySpecialOfferingResponse[]>(`/metrics/${church}&${month}&${year}`, {
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

//* Offering income by united service
export const getOfferingIncomeByUnitedService = async ({ 
  searchType, 
  church,
  month,
  year,
  order
}: MetricQueryParams): Promise<OfferingIncomeByUnitedServiceResponse[]> => {
  try {
    const {data} = await icupApi<OfferingIncomeByUnitedServiceResponse[]>(`/metrics/${church}&${month}&${year}`, {
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

//* Offering income by activities
export const getOfferingIncomeByActivities = async ({ 
  searchType, 
  church,
  month,
  year,
  order
}: MetricQueryParams): Promise<OfferingIncomeByActivitiesResponse[]> => {
  try {
    const {data} = await icupApi<OfferingIncomeByActivitiesResponse[]>(`/metrics/${church}&${month}&${year}`, {
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

//* Offering income adjustment
export const getOfferingIncomeAdjustment = async ({ 
  searchType, 
  church,
  month,
  year,
  order
}: MetricQueryParams): Promise<OfferingIncomeByIncomeAdjustmentResponse[]> => {
  try {
    const {data} = await icupApi<OfferingIncomeByIncomeAdjustmentResponse[]>(`/metrics/${church}&${month}&${year}`, {
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