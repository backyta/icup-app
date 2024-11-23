/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';
import { 
  type MetricQueryParams, 
  type OfferingExpenseChartResponse,
  type OfferingExpensesProportionResponse,
  type OfferingExpensesAdjustmentResponse,
} from '@/modules/metrics/interfaces';

//* Get proportion offering expenses 
export const getOfferingExpensesProportion = async ({ 
  searchType, 
  church,
  order
}: MetricQueryParams): Promise<OfferingExpensesProportionResponse> => {
  try {
    const {data} = await icupApi<OfferingExpensesProportionResponse>(`/metrics/${church}`, {
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
//* Operational offering expenses
export const getOperationalOfferingExpenses = async ({ 
  searchType,
  church,
  month,
  year,
  isSingleMonth,
  order
}: MetricQueryParams): Promise<OfferingExpenseChartResponse[]> => {
  try {
    const {data} = await icupApi<OfferingExpenseChartResponse[]>(`/metrics/${church}&${month}&${year}`, {
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

//* Maintenance and repair offering expenses
export const getMaintenanceAndRepairOfferingExpenses = async ({ 
  searchType,
  church,
  month,
  year,
  isSingleMonth,
  order
}: MetricQueryParams): Promise<OfferingExpenseChartResponse[]> => {
  try {
    const {data} = await icupApi<OfferingExpenseChartResponse[]>(`/metrics/${church}&${month}&${year}`, {
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

//* Decoration and repair offering expenses
export const getDecorationOfferingExpenses = async ({ 
  searchType,
  church,
  month,
  year,
  isSingleMonth,
  order
}: MetricQueryParams): Promise<OfferingExpenseChartResponse[]> => {
  try {
    const {data} = await icupApi<OfferingExpenseChartResponse[]>(`/metrics/${church}&${month}&${year}`, {
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

//* Equipment and technology and repair offering expenses
export const getEquipmentAndTechnologyOfferingExpenses = async ({ 
  searchType,
  church,
  month,
  year,
  isSingleMonth,
  order
}: MetricQueryParams): Promise<OfferingExpenseChartResponse[]> => {
  try {
    const {data} = await icupApi<OfferingExpenseChartResponse[]>(`/metrics/${church}&${month}&${year}`, {
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

//* Supplies offering expenses
export const getSuppliesOfferingExpenses = async ({ 
  searchType,
  church,
  month,
  year,
  isSingleMonth,
  order
}: MetricQueryParams): Promise<OfferingExpenseChartResponse[]> => {
  try {
    const {data} = await icupApi<OfferingExpenseChartResponse[]>(`/metrics/${church}&${month}&${year}`, {
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

//* Planing events offering expenses
export const getPlaningEventsOfferingExpenses = async ({ 
  searchType,
  church,
  month,
  year,
  isSingleMonth,
  order
}: MetricQueryParams): Promise<OfferingExpenseChartResponse[]> => {
  try {
    const {data} = await icupApi<OfferingExpenseChartResponse[]>(`/metrics/${church}&${month}&${year}`, {
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

//* Offering expenses adjustment
export const getOfferingExpensesAdjustment = async ({ 
  searchType,
  church,
  month,
  year,
  isSingleMonth,
  order
}: MetricQueryParams): Promise<OfferingExpensesAdjustmentResponse[]> => {
  try {
    const {data} = await icupApi<OfferingExpensesAdjustmentResponse[]>(`/metrics/${church}&${month}&${year}`, {
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

// ? OFFERING EXPENSE METRICS REPORTS
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

export const getOfferingExpenseMetricsReport = async ({
  year, 
  churchId, 
  startMonth,
  endMonth,
  types, 
  dialogClose,
}: MetricReportQueryParams): Promise<void> => {
  const joinedReportTypes = types.join('+');

  try {
    const res = await icupApi<Blob>('/reports/offering-expense-metrics' , {
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
