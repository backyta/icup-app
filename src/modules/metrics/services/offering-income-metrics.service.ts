/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';
import { 
  type MetricQueryParams, 
  type OfferingIncomeProportionResponse,
  type OfferingIncomeByActivitiesResponse,
  type OfferingIncomeByFamilyGroupResponse,
  type OfferingIncomeByYouthServiceResponse,
  type OfferingIncomeBySundaySchoolResponse,
  type OfferingIncomeBySundayServiceResponse, 
  type OfferingIncomeByUnitedServiceResponse,
  type OfferingIncomeByFastingAndVigilResponse,
  type OfferingIncomeBySpecialOfferingResponse,
  type OfferingIncomeByIncomeAdjustmentResponse,
  type OfferingIncomeByChurchGroundOfferingResponse,
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
  isSingleMonth,
  year,
  order
}: MetricQueryParams): Promise<OfferingIncomeBySundayServiceResponse[]> => {
  try {
    const {data} = await icupApi<OfferingIncomeBySundayServiceResponse[]>(`/metrics/${church}&${month}&${year}`, {
      params: {
        'search-type': searchType,
        isSingleMonth: isSingleMonth?.toString(),
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
  isSingleMonth,
  year,
  order
}: MetricQueryParams): Promise<OfferingIncomeByFamilyGroupResponse[]> => {
  try {
    const {data} = await icupApi<OfferingIncomeByFamilyGroupResponse[]>(`/metrics/${church}&${zone}&${month}&${year}`, {
      params: {
        'search-type': searchType,
        isSingleMonth: isSingleMonth?.toString(),
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
  isSingleMonth,
  year,
  order
}: MetricQueryParams): Promise<OfferingIncomeBySundaySchoolResponse[]> => {
  try {
    const {data} = await icupApi<OfferingIncomeBySundaySchoolResponse[]>(`/metrics/${church}&${month}&${year}`, {
      params: {
        'search-type': searchType,
        isSingleMonth: isSingleMonth?.toString(),
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
  isSingleMonth,
  year,
  order
}: MetricQueryParams): Promise<OfferingIncomeByFastingAndVigilResponse[]> => {
  try {
    const {data} = await icupApi<OfferingIncomeByFastingAndVigilResponse[]>(`/metrics/${church}&${month}&${year}`, {
      params: {
        'search-type': searchType,
        isSingleMonth: isSingleMonth?.toString(),
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
  isSingleMonth,
  year,
  order
}: MetricQueryParams): Promise<OfferingIncomeByYouthServiceResponse[]> => {
  try {
    const {data} = await icupApi<OfferingIncomeByYouthServiceResponse[]>(`/metrics/${church}&${month}&${year}`, {
      params: {
        'search-type': searchType,
        isSingleMonth: isSingleMonth?.toString(),
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
  isSingleMonth,
  year,
  order
}: MetricQueryParams): Promise<OfferingIncomeBySpecialOfferingResponse[]> => {
  try {
    const {data} = await icupApi<OfferingIncomeBySpecialOfferingResponse[]>(`/metrics/${church}&${month}&${year}`, {
      params: {
        'search-type': searchType,
        isSingleMonth: isSingleMonth?.toString(),
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
  isSingleMonth,
  year,
  order
}: MetricQueryParams): Promise<OfferingIncomeByChurchGroundOfferingResponse[]> => {
  try {
    const {data} = await icupApi<OfferingIncomeByChurchGroundOfferingResponse[]>(`/metrics/${church}&${month}&${year}`, {
      params: {
        'search-type': searchType,
        isSingleMonth: isSingleMonth?.toString(),
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
  isSingleMonth,
  year,
  order
}: MetricQueryParams): Promise<OfferingIncomeByUnitedServiceResponse[]> => {
  try {
    const {data} = await icupApi<OfferingIncomeByUnitedServiceResponse[]>(`/metrics/${church}&${month}&${year}`, {
      params: {
        'search-type': searchType,
        isSingleMonth: isSingleMonth?.toString(),
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
  isSingleMonth,
  year,
  order
}: MetricQueryParams): Promise<OfferingIncomeByActivitiesResponse[]> => {
  try {
    const {data} = await icupApi<OfferingIncomeByActivitiesResponse[]>(`/metrics/${church}&${month}&${year}`, {
      params: {
        'search-type': searchType,
        isSingleMonth: isSingleMonth?.toString(),
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
  isSingleMonth,
  year,
  order
}: MetricQueryParams): Promise<OfferingIncomeByIncomeAdjustmentResponse[]> => {
  try {
    const {data} = await icupApi<OfferingIncomeByIncomeAdjustmentResponse[]>(`/metrics/${church}&${month}&${year}`, {
      params: {
        'search-type': searchType,
        isSingleMonth: isSingleMonth?.toString(),
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

// ? OFFERING INCOME METRICS REPORTS
const openPdfInNewTab = (pdfBlob: Blob): void => {
  const pdfUrl = URL.createObjectURL(pdfBlob);
  const newTab = window.open(pdfUrl, '_blank');
  newTab?.focus();
}

interface MetricReportQueryParams {
  year: string;
  startMonth: string;
  endMonth: string;
  churchId: string; 
  types: string[];
  dialogClose: () => void;
}

export const getOfferingIncomeMetricsReport = async ({
  year, 
  churchId, 
  startMonth,
  endMonth,
  types, 
  dialogClose,
}: MetricReportQueryParams): Promise<void> => {
  const joinedReportTypes = types.join('+');

  try {
    const res = await icupApi<Blob>('/reports/offering-income-metrics' , {
      params: {
        churchId,
        year,
        startMonth,
        endMonth,
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