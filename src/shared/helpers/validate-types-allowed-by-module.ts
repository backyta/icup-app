

import { SearchTypeNames, } from '@/shared/enums';
import { 
  SearchTypesCopastorModuleAllowed, 
  SearchTypesCopastorModuleAllowedOnDeletePage, 
  SearchTypesDiscipleModuleAllowed, 
  SearchTypeDisciplesModuleAllowedOnDeletePage, 
  SearchTypesFamilyHouseModuleAllowed, 
  SearchTypesFamilyHouseModuleAllowedOnDeletePage, 
  SearchTypesLeaderModuleAllowed, 
  SearchTypesLeaderModuleAllowedOnDeletePage, 
  SearchTypesOfferingIncomeModuleAllowed, 
  SearchTypesOfferingIncomeModuleAllowedOnDeleteAndUpdatePage, 
  SearchTypesPastorModuleAllowed, 
  SearchTypesPastorModuleAllowedOnDeletePage, 
  SearchTypesUserModuleAllowed, 
  SearchTypesUserModuleAllowedOnDeletePage,
  SearchTypesOfferingExpensesModuleAllowed,
  SearchTypesOfferingExpensesModuleAllowedOnDeleteAndUpdatePage
} from "@/shared/helpers";

interface DisabledSearchTypesResult {
  disabledSearchTypes: string[];
}

export const validateTypesAllowedByModule = (currentPath: string): DisabledSearchTypesResult | undefined => {
  
  //* Disabled Types by module
  const disabledDiscipleModuleSearchTypes = Object.values(SearchTypeNames).filter(value => !SearchTypesDiscipleModuleAllowed.includes(value) ) 
  const disabledDiscipleModuleSearchTypesOnDeletePage = Object.values(SearchTypeNames).filter(value => !SearchTypeDisciplesModuleAllowedOnDeletePage.includes(value) ) 

  const disabledPastorModuleSearchTypes = Object.values(SearchTypeNames).filter(value => !SearchTypesPastorModuleAllowed.includes(value) ) 
  const disabledPastorModuleSearchTypesOnDeletePage = Object.values(SearchTypeNames).filter(value => !SearchTypesPastorModuleAllowedOnDeletePage.includes(value) ) 

  const disabledCopastorModuleSearchTypes = Object.values(SearchTypeNames).filter(value => !SearchTypesCopastorModuleAllowed.includes(value) ) 
  const disabledCopastorTypesOnDeletePage = Object.values(SearchTypeNames).filter(value => !SearchTypesCopastorModuleAllowedOnDeletePage.includes(value) ) 

  const disabledLeaderModuleSearchTypes = Object.values(SearchTypeNames).filter(value => !SearchTypesLeaderModuleAllowed.includes(value) ) 
  const disabledLeaderModuleSearchTypesOnDeletePage = Object.values(SearchTypeNames).filter(value => !SearchTypesLeaderModuleAllowedOnDeletePage.includes(value) ) 

  const disabledFamilyHouseModuleSearchTypes = Object.values(SearchTypeNames).filter(value => !SearchTypesFamilyHouseModuleAllowed.includes(value) ) 
  const disabledFamilyHouseModuleSearchTypesOnDeletePage = Object.values(SearchTypeNames).filter(value => !SearchTypesFamilyHouseModuleAllowedOnDeletePage.includes(value) ) 

  const disabledOfferingIncomeModuleSearchTypes = Object.values(SearchTypeNames).filter(value => !SearchTypesOfferingIncomeModuleAllowed.includes(value) ) 
  const disabledOfferingIncomeModuleSearchTypesOnDeleteAndUpdatePage = Object.values(SearchTypeNames).filter(value => !SearchTypesOfferingIncomeModuleAllowedOnDeleteAndUpdatePage.includes(value) ) 

  const disabledOfferingExpensesModuleSearchTypes = Object.values(SearchTypeNames).filter(value => !SearchTypesOfferingExpensesModuleAllowed.includes(value) ) 
  const disabledOfferingExpensesModuleSearchTypesOnDeleteAndUpdatePage = Object.values(SearchTypeNames).filter(value => !SearchTypesOfferingExpensesModuleAllowedOnDeleteAndUpdatePage.includes(value) ) 

  const disabledUserModuleSearchTypes = Object.values(SearchTypeNames).filter(value => !SearchTypesUserModuleAllowed.includes(value) ) 
  const disabledUserModuleSearchTypesOnDeletePage = Object.values(SearchTypeNames).filter(value => !SearchTypesUserModuleAllowedOnDeletePage.includes(value) ) 
  
  //* Disciples
  if (currentPath === '/disciples/search-by-term-disciples' || currentPath === '/disciples/update-disciple') {
      return {
        disabledSearchTypes : [
        ...disabledDiscipleModuleSearchTypes
      ]   
    }
  }

  if ( currentPath === '/disciples/delete-disciple') {
      return {
        disabledSearchTypes : [
        ...disabledDiscipleModuleSearchTypesOnDeletePage
      ]   
    }
  }

  //* Pastors
  if (currentPath === '/pastors/search-by-term-pastors' || currentPath === '/pastors/update-pastor' ) {
    return {
        disabledSearchTypes : [
          ...disabledPastorModuleSearchTypes
      ]
    }
  }

  if (currentPath === '/pastors/delete-pastor') {
    return {
        disabledSearchTypes : [
          ...disabledPastorModuleSearchTypesOnDeletePage
      ]
    }
  }

  //* Co-pastors
  if (currentPath === '/copastors/search-by-term-copastors' || currentPath === '/copastors/update-copastor' ) {
    return { 
     disabledSearchTypes : [
      ...disabledCopastorModuleSearchTypes
     ],
   }
  }

  if ( currentPath === '/copastors/delete-copastor') {
    return { 
     disabledSearchTypes : [
      ...disabledCopastorTypesOnDeletePage
     ],
   }
  }

  //* Leaders
  if (currentPath === '/leaders/search-by-term-leaders' || currentPath === '/leaders/update-leader' ) {
    return {
      disabledSearchTypes : [
        ...disabledLeaderModuleSearchTypes
      ],
    }
  }

  if ( currentPath === '/leaders/delete-leader') {
  return {
    disabledSearchTypes : [
      ...disabledLeaderModuleSearchTypesOnDeletePage
    ],
  }
  }

  //* Family House
  if (currentPath === '/family-houses/search-by-term-family-houses' || currentPath === '/family-houses/update-family-house' ) {
    return {
      disabledSearchTypes : [
        ...disabledFamilyHouseModuleSearchTypes
      ]
    }
  } 

  if ( currentPath === '/family-houses/delete-family-house') {
    return {
      disabledSearchTypes : [
        ...disabledFamilyHouseModuleSearchTypesOnDeletePage
      ]
    }
  } 

  //* Offerings Income
  if (currentPath === '/offerings/income/search-by-term-offerings-income' ) {
    return {
      disabledSearchTypes : [
        ...disabledOfferingIncomeModuleSearchTypes
      ],
    }
  }

  if ( currentPath === '/offerings/income/update-offering-income' || currentPath === '/offerings/income/delete-offering-income') {
    return {
      disabledSearchTypes : [
        ...disabledOfferingIncomeModuleSearchTypesOnDeleteAndUpdatePage
      ],
    }
  }

  //* Offerings Expenses
  if (currentPath === '/offerings/expenses/search-by-term-offerings-expenses' ) {
    return {
      disabledSearchTypes : [
        ...disabledOfferingExpensesModuleSearchTypes
      ],
    }
  }

  if ( currentPath === '/offerings/expenses/update-offering-expenses' || currentPath === '/offerings/expenses/delete-offering-expenses') {
    return {
      disabledSearchTypes : [
        ...disabledOfferingExpensesModuleSearchTypesOnDeleteAndUpdatePage
      ],
    }
  }
  
  //* Users
  if (currentPath === '/users/search-by-term-users' || currentPath === '/users/update-user' ) {
    return {
      disabledSearchTypes : [
        ...disabledUserModuleSearchTypes
      ],
    }
  }
  
  if (currentPath === '/users/delete-user') {
    return {
      disabledSearchTypes : [
        ...disabledUserModuleSearchTypesOnDeletePage
      ],
    }
  }
}
