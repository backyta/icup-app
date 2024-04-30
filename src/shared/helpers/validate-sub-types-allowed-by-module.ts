/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { SubTypesSearchNames, TypesSearch, type SubTypesSearch } from "@/shared/enums";
import { 
  SubTypesOfferingIncomeActivitiesAllowed,
  SubtypesFullNameCopastorAllowed,
  SubtypesLastNamesCopastorAllowed,
  SubtypesNamesCopastorAllowed,
  SubtypesFullNameDiscipleAllowed,
  SubtypesLastNamesDiscipleAllowed,
  SubtypesNamesDiscipleAllowed,
  SubtypesOfferingIncomeFamilyHouseAllowed,
  SubtypesFullNameFamilyHouseAllowed,
  SubtypesLastNamesFamilyHouseAllowed,
  SubtypesNamesFamilyHouseAllowed,
  SubtypesOfferingIncomeFastingAndVigilGeneralAllowed,
  SubtypesOfferingIncomeFastingAndVigilZonalAllowed,
  SubTypesOfferingIncomeGroundChurchAllowed,
  SubtypesFullNameLeaderAllowed,
  SubtypesLastNamesLeaderAllowed,
  SubtypesNamesLeaderAllowed,
  SubtypesFullNamePastorAllowed,
  SubtypesLastNamesPastorAllowed,
  SubtypesNamesPastorAllowed,
  SubtypesOfferingIncomeSundayWorshipAllowed,
  SubtypesTitheAllowed,
  SubtypesFullNameUserAllowed,
  SubtypesLastNamesUserAllowed,
  SubtypesNamesUserAllowed,
  SubTypesOfferingIncomeYoungWorshipAllowed,
  SubTypesOfferingExpensesOperationalAllowed,
  SubTypesOfferingExpensesMaintenanceAndRepairAllowed,
  SubTypesOfferingExpensesDecorationAllowed,
  SubTypesOfferingExpensesEquipmentAndTechnologyAllowed,
  SubTypesOfferingExpensesSuppliesAllowed,
  SubTypesOfferingExpensesActivitiesAndEventsAllowed,
  } from "@/shared/helpers";



export const validateSubTypesAllowedByModule = (currentPath: string, type: string ) => {

  //* Disabled Sub-types by module
  //* Disciple
  const disabledDiscipleNamesSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubtypesNamesDiscipleAllowed.includes(value as SubTypesSearch) ) 
  const disabledDiscipleLastNamesSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubtypesLastNamesDiscipleAllowed.includes(value as SubTypesSearch) ) 
  const disabledDiscipleFullNameSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubtypesFullNameDiscipleAllowed.includes(value as SubTypesSearch) ) 

  
  if ((currentPath === '/disciples/search-by-term-disciples' || 
        currentPath === '/disciples/update-disciple' || 
        currentPath === '/disciples/delete-disciple') && 
      type === TypesSearch.FirstName) {
    return {
      disabledSubTypes : [
        ...disabledDiscipleNamesSubTypes,
      ],
    }
  }

  if ((currentPath === '/disciples/search-by-term-disciples' || 
        currentPath === '/disciples/update-disciple' || 
        currentPath === '/disciples/delete-disciple') && 
      type === TypesSearch.LastName) {
    return {
      disabledSubTypes : [
        ...disabledDiscipleLastNamesSubTypes
      ],
    }
  }

  if ((currentPath === '/disciples/search-by-term-disciples' || 
        currentPath === '/disciples/update-disciple' || 
        currentPath === '/disciples/delete-disciple') && 
      type === TypesSearch.FullName) {
    return {
      disabledSubTypes : [
        ...disabledDiscipleFullNameSubTypes
      ],
    }
  }

  //* Pastor
  const disabledPastorNamesSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubtypesNamesPastorAllowed.includes(value as SubTypesSearch) ) 
  const disabledPastorLastNamesSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubtypesLastNamesPastorAllowed.includes(value as SubTypesSearch) ) 
  const disabledPastorFullNameSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubtypesFullNamePastorAllowed.includes(value as SubTypesSearch) ) 
  

  if ((currentPath === '/pastors/search-by-term-pastors' || 
        currentPath === '/pastors/update-pastor' || 
        currentPath === '/pastors/delete-pastor') && 
      type === TypesSearch.FirstName) {
    return {
      disabledSubTypes : [
        ...disabledPastorNamesSubTypes,
      ],
    }
  }

  if ((currentPath === '/pastors/search-by-term-pastors' || 
        currentPath === '/pastors/update-pastor' || 
        currentPath === '/pastors/delete-pastor') && 
      type === TypesSearch.LastName) {
    return {
      disabledSubTypes : [
        ...disabledPastorLastNamesSubTypes
      ],
    }
  }

  if ((currentPath === '/pastors/search-by-term-pastors' || 
        currentPath === '/pastors/update-pastor' || 
        currentPath === '/pastors/delete-pastor') && 
      type === TypesSearch.FullName) {
    return {
      disabledSubTypes : [
        ...disabledPastorFullNameSubTypes
      ],
    }
  }

  //* Co-Pastor
  const disabledCopastorNamesSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubtypesNamesCopastorAllowed.includes(value as SubTypesSearch) ) 
  const disabledCopastorLastNamesSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubtypesLastNamesCopastorAllowed.includes(value as SubTypesSearch) ) 
  const disabledCopastorFullNameSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubtypesFullNameCopastorAllowed.includes(value as SubTypesSearch) ) 
  
  if ((currentPath === '/copastors/search-by-term-copastors' || 
        currentPath === '/copastors/update-copastor' || 
        currentPath === '/copastors/delete-copastor') && 
      type === TypesSearch.FirstName) {
    return {
      disabledSubTypes : [
        ...disabledCopastorNamesSubTypes,
      ],
    }
  }

  if ((currentPath === '/copastors/search-by-term-copastors' || 
        currentPath === '/copastors/update-copastor' || 
        currentPath === '/copastors/delete-copastor') && 
      type === TypesSearch.LastName) {
    return {
      disabledSubTypes : [
        ...disabledCopastorLastNamesSubTypes
      ],
    }
  }

  if ((currentPath === '/copastors/search-by-term-copastors' || 
        currentPath === '/copastors/update-copastor' || 
        currentPath === '/copastors/delete-copastor') && 
      type === TypesSearch.FullName) {
    return {
      disabledSubTypes : [
        ...disabledCopastorFullNameSubTypes
      ],
    }
  }

  //* Leader
  const disabledLeaderNamesSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubtypesNamesLeaderAllowed.includes(value as SubTypesSearch) ) 
  const disabledLeaderLastNamesSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubtypesLastNamesLeaderAllowed.includes(value as SubTypesSearch) ) 
  const disabledSubTypesLeaderFullName = Object.keys(SubTypesSearchNames).filter(value => !SubtypesFullNameLeaderAllowed.includes(value as SubTypesSearch) ) 
  
  if ((currentPath === '/leaders/search-by-term-leaders' || 
        currentPath === '/leaders/update-leader' || 
        currentPath === '/leaders/delete-leader') && 
      type === TypesSearch.FirstName) {
    return {
      disabledSubTypes : [
        ...disabledLeaderNamesSubTypes,
      ],
    }
  }

  if ((currentPath === '/leaders/search-by-term-leaders' || 
        currentPath === '/leaders/update-leader' || 
        currentPath === '/leaders/delete-leader')  && 
      type === TypesSearch.LastName) {
    return {
      disabledSubTypes : [
        ...disabledLeaderLastNamesSubTypes
      ],
    }
  }

  if ((currentPath === '/leaders/search-by-term-leaders' || 
        currentPath === '/leaders/update-leader' || 
        currentPath === '/leaders/delete-leader')  && 
      type === TypesSearch.FullName) {
    return {
      disabledSubTypes : [
        ...disabledSubTypesLeaderFullName
      ],
    }
  }
  
  //* Family House
  const disabledFamilyHouseNamesSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubtypesNamesFamilyHouseAllowed.includes(value as SubTypesSearch) ) 
  const disabledFamilyHouseLastNamesSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubtypesLastNamesFamilyHouseAllowed.includes(value as SubTypesSearch) ) 
  const disabledFamilyHouseFullNameSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubtypesFullNameFamilyHouseAllowed.includes(value as SubTypesSearch) ) 
  
  if ((currentPath === '/family-houses/search-by-term-family-houses' || 
        currentPath === '/family-houses/update-family-house' || 
        currentPath === '/family-houses/delete-family-house') && 
      type === TypesSearch.FirstName) {
    return {
      disabledSubTypes : [
        ...disabledFamilyHouseNamesSubTypes,
      ],
    }
  }

  if ((currentPath === '/family-houses/search-by-term-family-houses' || 
        currentPath === '/family-houses/update-family-house' || 
        currentPath === '/family-houses/delete-family-house') &&
      type === TypesSearch.LastName) {
    return {
      disabledSubTypes : [
        ...disabledFamilyHouseLastNamesSubTypes
      ],
    }
  }

  if ((currentPath === '/family-houses/search-by-term-family-houses' || 
        currentPath === '/family-houses/update-family-house' || 
        currentPath === '/family-houses/delete-family-house') && 
      type === TypesSearch.FullName) {
    return {
      disabledSubTypes : [
        ...disabledFamilyHouseFullNameSubTypes
      ],
    }
  }

  //! Offering Income
  //* Offerings (Tithe)
  const disabledTitheSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubtypesTitheAllowed.includes(value as SubTypesSearch) ) 
  
  if ((currentPath === '/offerings/income/search-by-term-offerings-income' || 
        currentPath === '/offerings/income/update-offering-income' || 
        currentPath === '/offerings/income/delete-offering-income') && 
      type === TypesSearch.Tithe) {
    return {
      disabledSubTypes : [
        ...disabledTitheSubTypes,
      ],
    }
  }

  //* Offerings (Worship sunday, Sunday School)
  const disabledSundayWorshipOfferingIncomeSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubtypesOfferingIncomeSundayWorshipAllowed.includes(value as SubTypesSearch) ) 
  
  if ((currentPath === '/offerings/income/search-by-term-offerings-income' || 
        currentPath === '/offerings/income/update-offering-income' || 
        currentPath === '/offerings/income/delete-offering-income') && 
      (type === TypesSearch.SundayWorship || type === TypesSearch.SundaySchool)) {
    return {
      disabledSubTypes : [
        ...disabledSundayWorshipOfferingIncomeSubTypes,
      ],
    }
  }

  //* Offerings (Family House)
  const disabledFamilyHouseOfferingIncomeSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubtypesOfferingIncomeFamilyHouseAllowed.includes(value as SubTypesSearch) ) 
  
  if ((currentPath === '/offerings/income/search-by-term-offerings-income' ||
        currentPath === '/offerings/income/update-offering-income' || 
        currentPath === '/offerings/income/delete-offering-income') && 
      type === TypesSearch.FamilyHouse) {
    return {
      disabledSubTypes : [
        ...disabledFamilyHouseOfferingIncomeSubTypes,
      ],
    }
  }

  //* Offerings (Fasting, Vigil General)
  const disabledFastingAndVigilGeneralOfferingIncomeSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubtypesOfferingIncomeFastingAndVigilGeneralAllowed.includes(value as SubTypesSearch) ) 
  
  if ((currentPath === '/offerings/income/search-by-term-offerings-income' || 
        currentPath === '/offerings/income/update-offering-income' || 
        currentPath === '/offerings/income/delete-offering-income') && 
      (type === TypesSearch.GeneralFasting || type === TypesSearch.GeneralVigil )) {
    return {
      disabledSubTypes : [
        ...disabledFastingAndVigilGeneralOfferingIncomeSubTypes,
      ],
    }
  }

  //* Offerings (Fasting, Vigil Zonal)
  const disabledFastingAndVigilZonalOfferingIncomeSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubtypesOfferingIncomeFastingAndVigilZonalAllowed.includes(value as SubTypesSearch) ) 
  
  if ((currentPath === '/offerings/income/search-by-term-offerings-income' || 
        currentPath === '/offerings/income/update-offering-income' || 
        currentPath === '/offerings/income/delete-offering-income') && 
      (type === TypesSearch.ZonalFasting || type === TypesSearch.ZonalVigil )) {
    return {
      disabledSubTypes : [
        ...disabledFastingAndVigilZonalOfferingIncomeSubTypes,
      ],
    }
  }

  //* Offerings (Young Worship)
  const disabledYoungWorshipOfferingIncomeSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubTypesOfferingIncomeYoungWorshipAllowed.includes(value as SubTypesSearch) ) 
  
  if ((currentPath === '/offerings/income/search-by-term-offerings-income' || 
        currentPath === '/offerings/income/update-offering-income' || 
        currentPath === '/offerings/income/delete-offering-income') &&  
      type === TypesSearch.YouthWorship ) {
    return {
      disabledSubTypes : [
        ...disabledYoungWorshipOfferingIncomeSubTypes,
      ],
    }
  }

  //* Offerings (Activities)
  const disabledActivitiesOfferingIncomeSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubTypesOfferingIncomeActivitiesAllowed.includes(value as SubTypesSearch) ) 
  
  if ((currentPath === '/offerings/income/search-by-term-offerings-income' || 
        currentPath === '/offerings/income/update-offering-income' || 
        currentPath === '/offerings/income/delete-offering-income') &&  
      type === TypesSearch.Activities ) {
    return {
      disabledSubTypes : [
        ...disabledActivitiesOfferingIncomeSubTypes,
      ],
    }
  }

  //* Offerings (Ground Church)
  const disabledGroundChurchOfferingIncomeSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubTypesOfferingIncomeGroundChurchAllowed.includes(value as SubTypesSearch) ) 
  
  if ((currentPath === '/offerings/income/search-by-term-offerings-income' || 
        currentPath === '/offerings/income/update-offering-income' || 
        currentPath === '/offerings/income/delete-offering-income') &&  
      (type === TypesSearch.ChurchGround || type === TypesSearch.Special )) {
    return {
      disabledSubTypes : [
        ...disabledGroundChurchOfferingIncomeSubTypes,
      ],
    }
  }

  //! Offering Expenses
  //* Operational Expenses
  const disabledOperationalOfferingExpensesSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubTypesOfferingExpensesOperationalAllowed.includes(value as SubTypesSearch) ) 
  
  if ((currentPath === '/offerings/expenses/search-by-term-offerings-expenses' || 
        currentPath === '/offerings/expenses/update-offering-expenses' || 
        currentPath === '/offerings/expenses/delete-offering-expenses') &&  
      type === TypesSearch.OperationalExpenses ) {
    return {
      disabledSubTypes : [
        ...disabledOperationalOfferingExpensesSubTypes,
      ],
    }
  }

  //* Maintenance and repair expenses
  const disabledMaintenanceAndRepairOfferingExpensesSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubTypesOfferingExpensesMaintenanceAndRepairAllowed.includes(value as SubTypesSearch) ) 
  
  if ((currentPath === '/offerings/expenses/search-by-term-offerings-expenses' || 
        currentPath === '/offerings/expenses/update-offering-expenses' || 
        currentPath === '/offerings/expenses/delete-offering-expenses') &&  
      type === TypesSearch.MaintenanceAndRepairExpenses ) {
    return {
      disabledSubTypes : [
        ...disabledMaintenanceAndRepairOfferingExpensesSubTypes,
      ],
    }
  }

  //* Decoration expenses
  const disabledDecorationOfferingExpensesSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubTypesOfferingExpensesDecorationAllowed.includes(value as SubTypesSearch) ) 
  
  if ((currentPath === '/offerings/expenses/search-by-term-offerings-expenses' || 
        currentPath === '/offerings/expenses/update-offering-expenses' || 
        currentPath === '/offerings/expenses/delete-offering-expenses') &&  
      type === TypesSearch.DecorationExpenses ) {
    return {
      disabledSubTypes : [
        ...disabledDecorationOfferingExpensesSubTypes,
      ],
    }
  }

  //* Equipment and technology expenses
  const disabledEquipmentAndTechnologyOfferingExpensesSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubTypesOfferingExpensesEquipmentAndTechnologyAllowed.includes(value as SubTypesSearch) ) 

  if ((currentPath === '/offerings/expenses/search-by-term-offerings-expenses' || 
        currentPath === '/offerings/expenses/update-offering-expenses' || 
        currentPath === '/offerings/expenses/delete-offering-expenses') &&  
      type === TypesSearch.EquipmentAndTechnologyExpenses ) {
    return {
      disabledSubTypes : [
        ...disabledEquipmentAndTechnologyOfferingExpensesSubTypes,
      ],
    }
  }

  //* Supplies expenses
  const disabledSuppliesOfferingExpensesSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubTypesOfferingExpensesSuppliesAllowed.includes(value as SubTypesSearch) ) 
  
  if ((currentPath === '/offerings/expenses/search-by-term-offerings-expenses' || 
        currentPath === '/offerings/expenses/update-offering-expenses' || 
        currentPath === '/offerings/expenses/delete-offering-expenses') &&  
      type === TypesSearch.SuppliesExpenses ) {
    return {
      disabledSubTypes : [
        ...disabledSuppliesOfferingExpensesSubTypes,
      ],
    }
  }

  //* Activities and events expenses
  const disabledActivitiesAndEventsOfferingExpensesSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubTypesOfferingExpensesActivitiesAndEventsAllowed.includes(value as SubTypesSearch) ) 
  
  if ((currentPath === '/offerings/expenses/search-by-term-offerings-expenses' || 
        currentPath === '/offerings/expenses/update-offering-expenses' || 
        currentPath === '/offerings/expenses/delete-offering-expenses') &&  
      type === TypesSearch.ActivitiesAndEventsExpenses ) {
    return {
      disabledSubTypes : [
        ...disabledActivitiesAndEventsOfferingExpensesSubTypes,
      ],
    }
  }

  //* Users 
  const disabledUserNamesSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubtypesNamesUserAllowed.includes(value as SubTypesSearch) ) 
  const disabledUserLastNamesSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubtypesLastNamesUserAllowed.includes(value as SubTypesSearch) ) 
  const disabledUserFullNamesSubTypes = Object.keys(SubTypesSearchNames).filter(value => !SubtypesFullNameUserAllowed.includes(value as SubTypesSearch) ) 
  
  if ((currentPath === '/users/search-by-term-users' || 
        currentPath === '/users/update-user' || 
        currentPath === '/users/delete-user' )  &&  
      type === TypesSearch.FirstName ) {
    return {
      disabledSubTypes : [
        ...disabledUserNamesSubTypes,
      ],
    }
  }

  if ((currentPath === '/users/search-by-term-users' || 
        currentPath === '/users/update-user' || 
        currentPath === '/users/delete-user')  &&  
      type === TypesSearch.LastName ) {
    return {
      disabledSubTypes : [
        ...disabledUserLastNamesSubTypes,
      ],
    }
  }

  if ((currentPath === '/users/search-by-term-users' || 
        currentPath === '/users/update-user' || 
        currentPath === '/users/delete-user')  &&  
      type === TypesSearch.FullName ) {
    return {
      disabledSubTypes : [
        ...disabledUserFullNamesSubTypes,
      ],
    }
  }

 
}
