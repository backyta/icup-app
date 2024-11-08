/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';
import { 
  type MetricQueryParams, 
  type IncomeAndExpensesComparativeResponse,
  type ComparativeOfferingIncomeByTypeResponse,
  type GeneralComparativeOfferingIncomeResponse,
  type ComparativeOfferingExpensesByTypeResponse,
  type GeneralComparativeOfferingExpensesResponse,
  type ComparativeOfferingExpensesBySubTypeResponse,
  type OfferingExpensesAndOfferingIncomeComparativeProportionResponse,
} from '@/modules/metrics/interfaces';

//* Get proportion offering comparative 
export const getOfferingComparativeProportion = async ({ 
  searchType, 
  church,
  order
}: MetricQueryParams): Promise<OfferingExpensesAndOfferingIncomeComparativeProportionResponse> => {
  try {
    const {data} = await icupApi<OfferingExpensesAndOfferingIncomeComparativeProportionResponse>(`/metrics/${church}`, {
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
//* Income and Expenses comparative
export const getIncomeAndExpensesComparativeByYear = async ({ 
  searchType,
  church,
  currency,
  year,
  order
}: MetricQueryParams): Promise<IncomeAndExpensesComparativeResponse[]> => {
  try {
    const {data} = await icupApi<IncomeAndExpensesComparativeResponse[]>(`/metrics/${church}&${currency}&${year}`, {
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

//* General comparative offering Income
export const getGeneralComparativeOfferingIncome = async ({ 
  searchType,
  church,
  startMonth,
  endMonth,
  year,
  order
}: MetricQueryParams): Promise<GeneralComparativeOfferingIncomeResponse[]> => {
  try {
    const {data} = await icupApi<GeneralComparativeOfferingIncomeResponse[]>(`/metrics/${church}&${startMonth}&${endMonth}&${year}`, {
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

//* Comparative offering income by type
export const getComparativeOfferingIncomeByType = async ({ 
  searchType,
  church,
  type,
  year,
  order
}: MetricQueryParams): Promise<ComparativeOfferingIncomeByTypeResponse[]> => {
  try {
    const {data} = await icupApi<ComparativeOfferingIncomeByTypeResponse[]>(`/metrics/${church}&${type}&${year}`, {
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

//* General comparative offering expenses
export const getGeneralComparativeOfferingExpenses = async ({ 
  searchType,
  church,
  startMonth,
  endMonth,
  year,
  order
}: MetricQueryParams): Promise<GeneralComparativeOfferingExpensesResponse[]> => {
  try {
    const {data} = await icupApi<GeneralComparativeOfferingExpensesResponse[]>(`/metrics/${church}&${startMonth}&${endMonth}&${year}`, {
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

//* Comparative offering expenses by type
export const getComparativeOfferingExpensesByType = async ({ 
  searchType,
  church,
  type,
  year,
  order
}: MetricQueryParams): Promise<ComparativeOfferingExpensesByTypeResponse[]> => {
  try {
    const {data} = await icupApi<ComparativeOfferingExpensesByTypeResponse[]>(`/metrics/${church}&${type}&${year}`, {
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

//* Comparative offering expenses by sub-type
export const getComparativeOfferingExpensesBySubType = async ({ 
  searchType,
  type,
  church,
  startMonth,
  endMonth,
  year,
  order
}: MetricQueryParams): Promise<ComparativeOfferingExpensesBySubTypeResponse[]> => {
  try {
    const {data} = await icupApi<ComparativeOfferingExpensesBySubTypeResponse[]>(`/metrics/${church}&${type}&${startMonth}&${endMonth}&${year}`, {
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