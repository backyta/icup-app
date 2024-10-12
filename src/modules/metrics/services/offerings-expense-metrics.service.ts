/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';
import { 
  type MetricQueryParams, 
  type OfferingExpensesProportionResponse,
  type OfferingExpenseChartResponse,
  type OfferingExpensesAdjustmentResponse,
} from '@/modules/metrics/interfaces';

// TODO : corregir e mensaje de inactive y active en los formularios (status)

//* Get proportion offerings expenses 
export const getOfferingsExpenseProportion = async ({ 
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
//* Operational offerings expenses
export const getOperationalOfferingExpenses = async ({ 
  searchType,
  church,
  month,
  year,
  order
}: MetricQueryParams): Promise<OfferingExpenseChartResponse[]> => {
  try {
    const {data} = await icupApi<OfferingExpenseChartResponse[]>(`/metrics/${church}&${month}&${year}`, {
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

//* Maintenance and repair offerings expenses
export const getMaintenanceAndRepairOfferingExpenses = async ({ 
  searchType,
  church,
  month,
  year,
  order
}: MetricQueryParams): Promise<OfferingExpenseChartResponse[]> => {
  try {
    const {data} = await icupApi<OfferingExpenseChartResponse[]>(`/metrics/${church}&${month}&${year}`, {
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

//* Decoration and repair offerings expenses
export const getDecorationOfferingExpenses = async ({ 
  searchType,
  church,
  month,
  year,
  order
}: MetricQueryParams): Promise<OfferingExpenseChartResponse[]> => {
  try {
    const {data} = await icupApi<OfferingExpenseChartResponse[]>(`/metrics/${church}&${month}&${year}`, {
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

//* Equipment and technology and repair offerings expenses
export const getEquipmentAndTechnologyOfferingExpenses = async ({ 
  searchType,
  church,
  month,
  year,
  order
}: MetricQueryParams): Promise<OfferingExpenseChartResponse[]> => {
  try {
    const {data} = await icupApi<OfferingExpenseChartResponse[]>(`/metrics/${church}&${month}&${year}`, {
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

//* Supplies offerings expenses
export const getSuppliesOfferingExpenses = async ({ 
  searchType,
  church,
  month,
  year,
  order
}: MetricQueryParams): Promise<OfferingExpenseChartResponse[]> => {
  try {
    const {data} = await icupApi<OfferingExpenseChartResponse[]>(`/metrics/${church}&${month}&${year}`, {
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

//* Planing events offerings expenses
export const getPlaningEventsOfferingExpenses = async ({ 
  searchType,
  church,
  month,
  year,
  order
}: MetricQueryParams): Promise<OfferingExpenseChartResponse[]> => {
  try {
    const {data} = await icupApi<OfferingExpenseChartResponse[]>(`/metrics/${church}&${month}&${year}`, {
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

//* Offering expenses adjustment
export const getOfferingExpensesAdjustment = async ({ 
  searchType,
  church,
  month,
  year,
  order
}: MetricQueryParams): Promise<OfferingExpensesAdjustmentResponse[]> => {
  try {
    const {data} = await icupApi<OfferingExpensesAdjustmentResponse[]>(`/metrics/${church}&${month}&${year}`, {
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


