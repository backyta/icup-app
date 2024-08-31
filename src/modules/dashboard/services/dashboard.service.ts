/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';

import { DashboardSearchType } from '@/modules/dashboard/enums';
import { type OfferingIncomeResponse } from '@/modules/offering/income/interfaces';
import { type DashboardQueryParams } from '@/modules/dashboard/interface';
import { type FamilyGroupResponse } from '@/modules/family-group/interfaces';


// ? Get offerings income by term (paginated)
export const getOfferingsForBarChartByTerm = async ({ 
  searchType, 
  selectTerm,
  dateTerm,  
  limit, 
  offset, 
  all, 
  order
}: DashboardQueryParams): Promise<OfferingIncomeResponse[] | undefined> => {

 let result: OfferingIncomeResponse[];

 //* Latest sunday offerings
 if (searchType === DashboardSearchType.LatestSundayOfferings
) {
    try {
        if (!all) {
            const {data} = await icupApi<OfferingIncomeResponse[]>(`/offerings-income/${dateTerm}&${selectTerm}` , {
          params: {
            limit,
            offset,
            order,
            'search-type': searchType,
          },
        });

        result = data;
      }else {
        const {data} = await icupApi<OfferingIncomeResponse[]>(`/offerings-income/${dateTerm}&${selectTerm}` , {
          params: {
            order,
            'search-type': searchType,
          },
        });
        result = data;
      }
    
      return result;
    
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw (error.response.data)
      }
      
      throw new Error('Ocurrió un error inesperado, hable con el administrador')
    }
 }

 //* Top family groups offerings
 if (searchType === DashboardSearchType.TopFamilyGroupOfferings
) {
    try {
        if (!all) {
            const {data} = await icupApi<OfferingIncomeResponse[]>(`/offerings-income/${dateTerm}&${selectTerm}` , {
          params: {
            limit,
            offset,
            order,
            'search-type': searchType,
          },
        });

        result = data;
      }else {
        const {data} = await icupApi<OfferingIncomeResponse[]>(`/offerings-income/${dateTerm}&${selectTerm}` , {
          params: {
            order,
            'search-type': searchType,
          },
        });
        
        result = data;
      }
      
      
      return result;
    
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw (error.response.data)
      }
      
      throw new Error('Ocurrió un error inesperado, hable con el administrador')
    }
 }
}

// ? Get proportion family groups
export const getProportionFamilyGroups = async ({ 
  searchType, 
  selectTerm,
  limit, 
  offset, 
  all, 
  order
}: DashboardQueryParams): Promise<FamilyGroupResponse[] | undefined> => {
 let result: FamilyGroupResponse[];

 //* Most populated family groups
 if (searchType === DashboardSearchType.MostPopulatedFamilyGroups
) {
    try {
      if (!all) {
        const {data} = await icupApi<FamilyGroupResponse[]>(`/family-groups/${selectTerm}` , {
          params: {
            limit,
            offset,
            order,
            'search-type': searchType
          },
        });
        
        result = data;
      }else {
        const {data} = await icupApi<FamilyGroupResponse[]>(`/family-groups/${selectTerm}` , {
          params: {
            order,
            'search-type': searchType
          },
        });

        result = data;
      }

      return result;

    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw (error.response.data)
      }
      
      throw new Error('Ocurrió un error inesperado, hable con el administrador')
    }
  }

 //* Less populated family groups
 if (searchType === DashboardSearchType.LessPopulatedFamilyGroups
) {
    try {
      if (!all) {
        const {data} = await icupApi<FamilyGroupResponse[]>(`/family-groups/${selectTerm}` , {
          params: {
            limit,
            offset,
            order,
            'search-type': searchType
          },
        });
        
        result = data;
      }else {
        const {data} = await icupApi<FamilyGroupResponse[]>(`/family-groups/${selectTerm}` , {
          params: {
            order,
            'search-type': searchType
          },
        });

        result = data;
      }

      return result;

    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw (error.response.data)
      }
      
      throw new Error('Ocurrió un error inesperado, hable con el administrador')
    }
  }
}
