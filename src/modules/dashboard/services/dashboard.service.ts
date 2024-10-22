/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isAxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';

import { DashboardSearchType } from '@/modules/dashboard/enums';
import { type FamilyGroupResponse } from '@/modules/family-group/interfaces';

import { type LastSundaysOfferingsResponse, type DashboardQueryParams, type TopFamilyGroupsOfferingsResponse } from '@/modules/dashboard/interfaces';


// ? Get offerings income by term (paginated)
export const  getOfferingsForBarChartByTerm = async ({ 
  searchType, 
  church,
  date,
  limit, 
  offset, 
  order
}: DashboardQueryParams): Promise<LastSundaysOfferingsResponse[] | TopFamilyGroupsOfferingsResponse[] | undefined> => {

 //* Latest sunday offerings
 if (searchType === DashboardSearchType.LastSundaysOfferings
) {
    try {
    const {data} = await icupApi<LastSundaysOfferingsResponse[]>(`/offerings-income/${date}&${church}` , {
      params: {
        limit,
        offset,
        order,
        'search-type': searchType,
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

 //* Top family groups offerings
 if (searchType === DashboardSearchType.TopFamilyGroupsOfferings
) {
    try {
      const {data} = await icupApi<TopFamilyGroupsOfferingsResponse[]>(`/offerings-income/${date}&${church}` , {
        params: {
          limit,
          offset,
          order,
          'search-type': searchType,
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
}

// ? Get proportion family groups
export const getProportionFamilyGroups = async ({ 
  searchType, 
  church,
  order
}: DashboardQueryParams): Promise<FamilyGroupResponse[] | undefined> => {

 //* Most populated family groups
 if (searchType === DashboardSearchType.MostPopulatedFamilyGroups
) {
    try {
      const {data} = await icupApi<FamilyGroupResponse[]>(`/family-groups/${church}` , {
        params: {
          order,
          'search-type': searchType
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

 //* Less populated family groups
 if (searchType === DashboardSearchType.LessPopulatedFamilyGroups
) {
    try {
      const {data} = await icupApi<FamilyGroupResponse[]>(`/family-groups/${church}` , {
        params: {
          order,
          'search-type': searchType
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
}
