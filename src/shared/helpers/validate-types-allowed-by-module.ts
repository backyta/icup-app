/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { TypesSearchNames, } from "@/shared/enums";
import { 
  TypesCopastorAllowed, 
  TypesCopastorAllowedOnDeletePage, 
  TypesDiscipleAllowed, 
  TypesDisciplesAllowedOnDeletePage, 
  TypesFamilyHouseAllowed, 
  TypesFamilyHouseAllowedOnDeletePage, 
  TypesLeaderAllowed, 
  TypesLeaderAllowedOnDeletePage, 
  TypesOfferingIncomeAllowed, 
  TypesOfferingIncomeAllowedOnDeleteAndUpdatePage, 
  TypesPastorAllowed, 
  TypesPastorAllowedOnDeletePage, 
  TypesUserAllowed, 
  TypesUserAllowedOnDeletePage,
  TypesOfferingExpensesAllowed,
  TypesOfferingExpensesAllowedOnDeleteAndUpdatePage} from "@/shared/helpers";


export const validateTypesAllowedByModule = (currentPath: string) => {
  
  //* Disabled Types by module
  const disabledDiscipleTypes = Object.values(TypesSearchNames).filter(value => !TypesDiscipleAllowed.includes(value) ) 
  const disabledDiscipleTypesOnDeletePage = Object.values(TypesSearchNames).filter(value => !TypesDisciplesAllowedOnDeletePage.includes(value) ) 

  const disabledPastorTypes = Object.values(TypesSearchNames).filter(value => !TypesPastorAllowed.includes(value) ) 
  const disabledPastorTypesOnDeletePage = Object.values(TypesSearchNames).filter(value => !TypesPastorAllowedOnDeletePage.includes(value) ) 

  const disabledCopastorTypes = Object.values(TypesSearchNames).filter(value => !TypesCopastorAllowed.includes(value) ) 
  const disabledCopastorTypesOnDeletePage = Object.values(TypesSearchNames).filter(value => !TypesCopastorAllowedOnDeletePage.includes(value) ) 

  const disabledLeaderTypes = Object.values(TypesSearchNames).filter(value => !TypesLeaderAllowed.includes(value) ) 
  const disabledLeaderTypesOnDeletePage = Object.values(TypesSearchNames).filter(value => !TypesLeaderAllowedOnDeletePage.includes(value) ) 

  const disabledFamilyHouseTypes = Object.values(TypesSearchNames).filter(value => !TypesFamilyHouseAllowed.includes(value) ) 
  const disabledFamilyHouseTypesOnDeletePage = Object.values(TypesSearchNames).filter(value => !TypesFamilyHouseAllowedOnDeletePage.includes(value) ) 

  const disabledOfferingIncomeTypes = Object.values(TypesSearchNames).filter(value => !TypesOfferingIncomeAllowed.includes(value) ) 
  const disabledOfferingIncomeTypesOnDeleteAndUpdatePage = Object.values(TypesSearchNames).filter(value => !TypesOfferingIncomeAllowedOnDeleteAndUpdatePage.includes(value) ) 

  const disabledOfferingExpensesTypes = Object.values(TypesSearchNames).filter(value => !TypesOfferingExpensesAllowed.includes(value) ) 
  const disabledOfferingExpensesTypesOnDeleteAndUpdatePage = Object.values(TypesSearchNames).filter(value => !TypesOfferingExpensesAllowedOnDeleteAndUpdatePage.includes(value) ) 

  const disabledUserTypes = Object.values(TypesSearchNames).filter(value => !TypesUserAllowed.includes(value) ) 
  const disabledUserTypesOnDeletePage = Object.values(TypesSearchNames).filter(value => !TypesUserAllowedOnDeletePage.includes(value) ) 
  
  //* Disciples
  if (currentPath === '/disciples/search-by-term-disciples' || currentPath === '/disciples/update-disciple') {
      return {
        disabledTypes : [
        ...disabledDiscipleTypes
      ]   
    }
  }

  if ( currentPath === '/disciples/delete-disciple') {
      return {
        disabledTypes : [
        ...disabledDiscipleTypesOnDeletePage
      ]   
    }
  }

  //* Pastors
  if (currentPath === '/pastors/search-by-term-pastors' || currentPath === '/pastors/update-pastor' ) {
    return {
        disabledTypes : [
          ...disabledPastorTypes
      ]
    }
  }

  if (currentPath === '/pastors/delete-pastor') {
    return {
        disabledTypes : [
          ...disabledPastorTypesOnDeletePage
      ]
    }
  }

  //* Co-pastors
  if (currentPath === '/copastors/search-by-term-copastors' || currentPath === '/copastors/update-copastor' ) {
    return { 
     disabledTypes : [
      ...disabledCopastorTypes
     ],
   }
  }

  if ( currentPath === '/copastors/delete-copastor') {
    return { 
     disabledTypes : [
      ...disabledCopastorTypesOnDeletePage
     ],
   }
  }

  //* Leaders
  if (currentPath === '/leaders/search-by-term-leaders' || currentPath === '/leaders/update-leader' ) {
    return {
      disabledTypes : [
        ...disabledLeaderTypes
      ],
    }
  }

  if ( currentPath === '/leaders/delete-leader') {
  return {
    disabledTypes : [
      ...disabledLeaderTypesOnDeletePage
    ],
  }
  }

  //* Family House
  if (currentPath === '/family-houses/search-by-term-family-houses' || currentPath === '/family-houses/update-family-house' ) {
    return {
      disabledTypes : [
        ...disabledFamilyHouseTypes
      ]
    }
  } 

  if ( currentPath === '/family-houses/delete-family-house') {
    return {
      disabledTypes : [
        ...disabledFamilyHouseTypesOnDeletePage
      ]
    }
  } 

  //* Offerings Income
  if (currentPath === '/offerings/income/search-by-term-offerings-income' ) {
    return {
      disabledTypes : [
        ...disabledOfferingIncomeTypes
      ],
    }
  }

  if ( currentPath === '/offerings/income/update-offering-income' || currentPath === '/offerings/income/delete-offering-income') {
    return {
      disabledTypes : [
        ...disabledOfferingIncomeTypesOnDeleteAndUpdatePage
      ],
    }
  }

  //* Offerings Expenses
  if (currentPath === '/offerings/expenses/search-by-term-offerings-expenses' ) {
    return {
      disabledTypes : [
        ...disabledOfferingExpensesTypes
      ],
    }
  }

  if ( currentPath === '/offerings/expenses/update-offering-expenses' || currentPath === '/offerings/expenses/delete-offering-expenses') {
    return {
      disabledTypes : [
        ...disabledOfferingExpensesTypesOnDeleteAndUpdatePage
      ],
    }
  }
  
  //* Users
  if (currentPath === '/users/search-by-term-users' || currentPath === '/users/update-user' ) {
    return {
      disabledTypes : [
        ...disabledUserTypes
      ],
    }
  }
  
  if (currentPath === '/users/delete-user') {
    return {
      disabledTypes : [
        ...disabledUserTypesOnDeletePage
      ],
    }
  }
}
