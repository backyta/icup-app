

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
  SearchTypesOfferingExpensesModuleAllowedOnDeleteAndUpdatePage,
  SearchTypesChurchModuleAllowed,
  SearchTypeChurchModuleAllowedOnDeletePage,
  SearchTypesSupervisorModuleAllowedOnDeletePage,
  SearchTypesSupervisorModuleAllowed,
  SearchTypesPreacherModuleAllowed,
  SearchTypesPreacherModuleAllowedOnDeletePage
} from "@/shared/helpers";

interface DisabledSearchTypesResult {
  disabledSearchTypes: string[];
}

export const validateTypesAllowedByModule = (currentPath: string): DisabledSearchTypesResult | undefined => {
  
  //* Disabled Types by module
  const disabledChurchModuleSearchTypes = Object.values(SearchTypeNames).filter(value => !SearchTypesChurchModuleAllowed.includes(value) ) 
  const disabledChurchModuleSearchTypesOnDeletePage = Object.values(SearchTypeNames).filter(value => !SearchTypeChurchModuleAllowedOnDeletePage.includes(value) ) 

  const disabledDiscipleModuleSearchTypes = Object.values(SearchTypeNames).filter(value => !SearchTypesDiscipleModuleAllowed.includes(value) ) 
  const disabledDiscipleModuleSearchTypesOnDeletePage = Object.values(SearchTypeNames).filter(value => !SearchTypeDisciplesModuleAllowedOnDeletePage.includes(value) ) 

  const disabledPastorModuleSearchTypes = Object.values(SearchTypeNames).filter(value => !SearchTypesPastorModuleAllowed.includes(value) ) 
  const disabledPastorModuleSearchTypesOnDeletePage = Object.values(SearchTypeNames).filter(value => !SearchTypesPastorModuleAllowedOnDeletePage.includes(value) ) 

  const disabledCopastorModuleSearchTypes = Object.values(SearchTypeNames).filter(value => !SearchTypesCopastorModuleAllowed.includes(value) ) 
  const disabledCopastorModuleSearchTypesOnDeletePage = Object.values(SearchTypeNames).filter(value => !SearchTypesCopastorModuleAllowedOnDeletePage.includes(value) ) 

  const disabledSupervisorModuleSearchTypes = Object.values(SearchTypeNames).filter(value => !SearchTypesSupervisorModuleAllowed.includes(value) ) 
  const disabledSupervisorModuleSearchTypesOnDeletePage = Object.values(SearchTypeNames).filter(value => !SearchTypesSupervisorModuleAllowedOnDeletePage.includes(value) ) 

  const disabledPreacherModuleSearchTypes = Object.values(SearchTypeNames).filter(value => !SearchTypesPreacherModuleAllowed.includes(value) ) 
  const disabledPreacherModuleSearchTypesOnDeletePage = Object.values(SearchTypeNames).filter(value => !SearchTypesPreacherModuleAllowedOnDeletePage.includes(value) ) 

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
  
  //* Churches
  if (currentPath === '/churches/search-by-term-churches' || currentPath === '/churches/update-church') {
    return {
      disabledSearchTypes : [
      ...disabledChurchModuleSearchTypes
    ]   
  }
}

if ( currentPath === '/churches/delete-church') {
    return {
      disabledSearchTypes : [
      ...disabledChurchModuleSearchTypesOnDeletePage
    ]   
  }
}

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
      ...disabledCopastorModuleSearchTypesOnDeletePage
     ],
   }
  }

  //* Supervisors
  if (currentPath === '/supervisors/search-by-term-supervisors' || currentPath === '/supervisors/update-supervisor' ) {
    return {
      disabledSearchTypes : [
        ...disabledSupervisorModuleSearchTypes
      ],
    }
  }

  if ( currentPath === '/supervisors/delete-supervisor') {
  return {
    disabledSearchTypes : [
      ...disabledSupervisorModuleSearchTypesOnDeletePage
    ],
  }
  }

  //* Preachers
  if (currentPath === '/preachers/search-by-term-preacher' || currentPath === '/preachers/update-preacher' ) {
    return {
      disabledSearchTypes : [
        ...disabledPreacherModuleSearchTypes
      ],
    }
  }

  if ( currentPath === '/preachers/delete-preacher') {
  return {
    disabledSearchTypes : [
      ...disabledPreacherModuleSearchTypesOnDeletePage
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
