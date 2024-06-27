import { SearchSubTypeNames, SearchType, type SearchSubType } from '@/shared/enums';
import { 
  SearchSubTypesOfferingIncomeActivitiesAllowed,
  SearchSubtypesFullNameCopastorModuleAllowed,
  SearchSubtypesLastNamesCopastorModuleAllowed,
  SearchSubtypesNamesCopastorModuleAllowed,
  SearchSubtypesFullNameDiscipleModuleAllowed,
  SearchSubtypesLastNamesDiscipleModuleAllowed,
  SearchSubtypesNamesDiscipleModuleAllowed,
  SearchSubtypesOfferingIncomeFamilyHouseAllowed,
  SearchSubtypesFullNameFamilyHouseModuleAllowed,
  SearchSubtypesLastNamesFamilyHouseModuleAllowed,
  SearchSubtypesNamesFamilyHouseModuleAllowed,
  SearchSubtypesOfferingIncomeFastingAndVigilGeneralAllowed,
  SearchSubtypesOfferingIncomeFastingAndVigilZonalAllowed,
  SearchSubTypesOfferingIncomeGroundChurchAllowed,
  SearchSubtypesFullNameLeaderModuleAllowed,
  SearchSubtypesLastNamesLeaderModuleAllowed,
  SearchSubtypesNamesLeaderModuleAllowed,
  SearchSubtypesFullNamePastorModuleAllowed,
  SearchSubtypesLastNamesPastorModuleAllowed,
  SearchSubtypesNamesPastorModuleAllowed,
  SearchSubtypesOfferingIncomeSundayWorshipAllowed,
  SearchSubtypesTitheAllowed,
  SearchSubtypesFullNameUserModuleAllowed,
  SearchSubtypesLastNamesUserModuleAllowed,
  SearchSubtypesNamesUserModuleAllowed,
  SearchSubTypesOfferingIncomeYoungWorshipAllowed,
  SearchSubTypesOfferingExpensesOperationalAllowed,
  SearchSubTypesOfferingExpensesMaintenanceAndRepairAllowed,
  SearchSubTypesOfferingExpensesDecorationAllowed,
  SearchSubTypesOfferingExpensesEquipmentAndTechnologyAllowed,
  SearchSubTypesOfferingExpensesSuppliesAllowed,
  SearchSubTypesOfferingExpensesActivitiesAndEventsAllowed,
  SearchSubTypesOfferingIncomeUnitedWorshipAllowed,
  SearchSubTypesOfferingIncomeIncomeAdjustmentAllowed,
  SearchSubTypesOfferingExpensesExpensesAdjustmentAllowed,
  } from '@/shared/helpers';


  interface DisabledSearchSubTypesResult {
    disabledSearchSubTypes: string[];
}

export const validateSubTypesAllowedByModule = (currentPath: string, type: string ): DisabledSearchSubTypesResult | undefined => {

  //* Disabled Sub-types by module
  //* Disciple
  const disabledDiscipleModuleNamesSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubtypesNamesDiscipleModuleAllowed.includes(value as SearchSubType) ) 
  const disabledDiscipleModuleLastNamesSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubtypesLastNamesDiscipleModuleAllowed.includes(value as SearchSubType) ) 
  const disabledDiscipleModuleFullNameSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubtypesFullNameDiscipleModuleAllowed.includes(value as SearchSubType) ) 

  if ((currentPath === '/disciples/search-by-term-disciples' || 
        currentPath === '/disciples/update-disciple' || 
        currentPath === '/disciples/delete-disciple') && 
      type === SearchType.FirstName) {
    return {
      disabledSearchSubTypes : [
        ...disabledDiscipleModuleNamesSearchSubTypes,
      ],
    }
  }

  if ((currentPath === '/disciples/search-by-term-disciples' || 
        currentPath === '/disciples/update-disciple' || 
        currentPath === '/disciples/delete-disciple') && 
      type === SearchType.LastName) {
    return {
      disabledSearchSubTypes : [
        ...disabledDiscipleModuleLastNamesSearchSubTypes
      ],
    }
  }

  if ((currentPath === '/disciples/search-by-term-disciples' || 
        currentPath === '/disciples/update-disciple' || 
        currentPath === '/disciples/delete-disciple') && 
      type === SearchType.FullName) {
    return {
      disabledSearchSubTypes : [
        ...disabledDiscipleModuleFullNameSearchSubTypes
      ],
    }
  }

  //* Pastor
  const disabledPastorModuleNamesSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubtypesNamesPastorModuleAllowed.includes(value as SearchSubType) ) 
  const disabledPastorModuleLastNamesSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubtypesLastNamesPastorModuleAllowed.includes(value as SearchSubType) ) 
  const disabledPastorModuleFullNameSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubtypesFullNamePastorModuleAllowed.includes(value as SearchSubType) ) 
  

  if ((currentPath === '/pastors/search-by-term-pastors' || 
        currentPath === '/pastors/update-pastor' || 
        currentPath === '/pastors/delete-pastor') && 
      type === SearchType.FirstName) {
    return {
      disabledSearchSubTypes : [
        ...disabledPastorModuleNamesSearchSubTypes,
      ],
    }
  }

  if ((currentPath === '/pastors/search-by-term-pastors' || 
        currentPath === '/pastors/update-pastor' || 
        currentPath === '/pastors/delete-pastor') && 
      type === SearchType.LastName) {
    return {
      disabledSearchSubTypes : [
        ...disabledPastorModuleLastNamesSearchSubTypes
      ],
    }
  }

  if ((currentPath === '/pastors/search-by-term-pastors' || 
        currentPath === '/pastors/update-pastor' || 
        currentPath === '/pastors/delete-pastor') && 
      type === SearchType.FullName) {
    return {
      disabledSearchSubTypes : [
        ...disabledPastorModuleFullNameSearchSubTypes
      ],
    }
  }

  //* Co-Pastor
  const disabledCopastorModuleNamesSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubtypesNamesCopastorModuleAllowed.includes(value as SearchSubType) ) 
  const disabledCopastorModuleLastNamesSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubtypesLastNamesCopastorModuleAllowed.includes(value as SearchSubType) ) 
  const disabledCopastorModuleFullNameSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubtypesFullNameCopastorModuleAllowed.includes(value as SearchSubType) ) 
  
  if ((currentPath === '/copastors/search-by-term-copastors' || 
        currentPath === '/copastors/update-copastor' || 
        currentPath === '/copastors/delete-copastor') && 
      type === SearchType.FirstName) {
    return {
      disabledSearchSubTypes : [
        ...disabledCopastorModuleNamesSearchSubTypes,
      ],
    }
  }

  if ((currentPath === '/copastors/search-by-term-copastors' || 
        currentPath === '/copastors/update-copastor' || 
        currentPath === '/copastors/delete-copastor') && 
      type === SearchType.LastName) {
    return {
      disabledSearchSubTypes : [
        ...disabledCopastorModuleLastNamesSearchSubTypes
      ],
    }
  }

  if ((currentPath === '/copastors/search-by-term-copastors' || 
        currentPath === '/copastors/update-copastor' || 
        currentPath === '/copastors/delete-copastor') && 
      type === SearchType.FullName) {
    return {
      disabledSearchSubTypes : [
        ...disabledCopastorModuleFullNameSearchSubTypes
      ],
    }
  }

  //* Leader
  const disabledLeaderModuleNamesSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubtypesNamesLeaderModuleAllowed.includes(value as SearchSubType) ) 
  const disabledLeaderModuleLastNamesSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubtypesLastNamesLeaderModuleAllowed.includes(value as SearchSubType) ) 
  const disabledLeaderModuleFullNameSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubtypesFullNameLeaderModuleAllowed.includes(value as SearchSubType) ) 
  
  if ((currentPath === '/leaders/search-by-term-leaders' || 
        currentPath === '/leaders/update-leader' || 
        currentPath === '/leaders/delete-leader') && 
      type === SearchType.FirstName) {
    return {
      disabledSearchSubTypes : [
        ...disabledLeaderModuleNamesSearchSubTypes,
      ],
    }
  }

  if ((currentPath === '/leaders/search-by-term-leaders' || 
        currentPath === '/leaders/update-leader' || 
        currentPath === '/leaders/delete-leader')  && 
      type === SearchType.LastName) {
    return {
      disabledSearchSubTypes : [
        ...disabledLeaderModuleLastNamesSearchSubTypes
      ],
    }
  }

  if ((currentPath === '/leaders/search-by-term-leaders' || 
        currentPath === '/leaders/update-leader' || 
        currentPath === '/leaders/delete-leader')  && 
      type === SearchType.FullName) {
    return {
      disabledSearchSubTypes : [
        ...disabledLeaderModuleFullNameSearchSubTypes
      ],
    }
  }
  
  //* Family House
  const disabledFamilyHouseModuleNamesSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubtypesNamesFamilyHouseModuleAllowed.includes(value as SearchSubType) ) 
  const disabledFamilyHouseModuleLastNamesSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubtypesLastNamesFamilyHouseModuleAllowed.includes(value as SearchSubType) ) 
  const disabledFamilyHouseModuleFullNameSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubtypesFullNameFamilyHouseModuleAllowed.includes(value as SearchSubType) ) 
  
  if ((currentPath === '/family-houses/search-by-term-family-houses' || 
        currentPath === '/family-houses/update-family-house' || 
        currentPath === '/family-houses/delete-family-house') && 
      type === SearchType.FirstName) {
    return {
      disabledSearchSubTypes : [
        ...disabledFamilyHouseModuleNamesSearchSubTypes,
      ],
    }
  }

  if ((currentPath === '/family-houses/search-by-term-family-houses' || 
        currentPath === '/family-houses/update-family-house' || 
        currentPath === '/family-houses/delete-family-house') &&
      type === SearchType.LastName) {
    return {
      disabledSearchSubTypes : [
        ...disabledFamilyHouseModuleLastNamesSearchSubTypes
      ],
    }
  }

  if ((currentPath === '/family-houses/search-by-term-family-houses' || 
        currentPath === '/family-houses/update-family-house' || 
        currentPath === '/family-houses/delete-family-house') && 
      type === SearchType.FullName) {
    return {
      disabledSearchSubTypes : [
        ...disabledFamilyHouseModuleFullNameSearchSubTypes
      ],
    }
  }

  //! Offering Income
  //* Offerings (Tithe)
  const disabledTitheSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubtypesTitheAllowed.includes(value as SearchSubType) ) 
  
  if ((currentPath === '/offerings/income/search-by-term-offerings-income' || 
        currentPath === '/offerings/income/update-offering-income' || 
        currentPath === '/offerings/income/delete-offering-income') && 
      type === SearchType.Tithe) {
    return {
      disabledSearchSubTypes : [
        ...disabledTitheSearchSubTypes,
      ],
    }
  }

  //* Offerings (Worship sunday, Sunday School)
  const disabledSundayWorshipOfferingIncomeSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubtypesOfferingIncomeSundayWorshipAllowed.includes(value as SearchSubType) ) 
  
  if ((currentPath === '/offerings/income/search-by-term-offerings-income' || 
        currentPath === '/offerings/income/update-offering-income' || 
        currentPath === '/offerings/income/delete-offering-income') && 
      (type === SearchType.SundayWorship || type === SearchType.SundaySchool)) {
    return {
      disabledSearchSubTypes : [
        ...disabledSundayWorshipOfferingIncomeSearchSubTypes,
      ],
    }
  }

  //* Offerings (Family House)
  const disabledFamilyHouseOfferingIncomeSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubtypesOfferingIncomeFamilyHouseAllowed.includes(value as SearchSubType) ) 
  
  if ((currentPath === '/offerings/income/search-by-term-offerings-income' ||
        currentPath === '/offerings/income/update-offering-income' || 
        currentPath === '/offerings/income/delete-offering-income') && 
      type === SearchType.FamilyHouse) {
    return {
      disabledSearchSubTypes : [
        ...disabledFamilyHouseOfferingIncomeSearchSubTypes,
      ],
    }
  }

  //* Offerings (Fasting, Vigil General)
  const disabledFastingAndVigilGeneralOfferingIncomeSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubtypesOfferingIncomeFastingAndVigilGeneralAllowed.includes(value as SearchSubType) ) 
  
  if ((currentPath === '/offerings/income/search-by-term-offerings-income' || 
        currentPath === '/offerings/income/update-offering-income' || 
        currentPath === '/offerings/income/delete-offering-income') && 
      (type === SearchType.GeneralFasting || type === SearchType.GeneralVigil )) {
    return {
      disabledSearchSubTypes : [
        ...disabledFastingAndVigilGeneralOfferingIncomeSearchSubTypes,
      ],
    }
  }

  //* Offerings (Fasting, Vigil Zonal)
  const disabledFastingAndVigilZonalOfferingIncomeSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubtypesOfferingIncomeFastingAndVigilZonalAllowed.includes(value as SearchSubType) ) 
  
  if ((currentPath === '/offerings/income/search-by-term-offerings-income' || 
        currentPath === '/offerings/income/update-offering-income' || 
        currentPath === '/offerings/income/delete-offering-income') && 
      (type === SearchType.ZonalFasting || type === SearchType.ZonalVigil )) {
    return {
      disabledSearchSubTypes : [
        ...disabledFastingAndVigilZonalOfferingIncomeSearchSubTypes,
      ],
    }
  }

  //* Offerings (Young Worship)
  const disabledYoungWorshipOfferingIncomeSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubTypesOfferingIncomeYoungWorshipAllowed.includes(value as SearchSubType) ) 
  
  if ((currentPath === '/offerings/income/search-by-term-offerings-income' || 
        currentPath === '/offerings/income/update-offering-income' || 
        currentPath === '/offerings/income/delete-offering-income') &&  
      type === SearchType.YouthWorship ) {
    return {
      disabledSearchSubTypes : [
        ...disabledYoungWorshipOfferingIncomeSearchSubTypes,
      ],
    }
  }

  //* Offerings (Worship United)
  const disabledUnitedWorshipOfferingIncomeSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubTypesOfferingIncomeUnitedWorshipAllowed.includes(value as SearchSubType) ) 
  
  if ((currentPath === '/offerings/income/search-by-term-offerings-income' || 
        currentPath === '/offerings/income/update-offering-income' || 
        currentPath === '/offerings/income/delete-offering-income') &&  
      type === SearchType.UnitedWorship ) {
    return {
      disabledSearchSubTypes : [
        ...disabledUnitedWorshipOfferingIncomeSearchSubTypes,
      ],
    }
  }

  //* Offerings (Worship United)
  const disabledIncomeAdjustmentOfferingIncomeSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubTypesOfferingIncomeIncomeAdjustmentAllowed.includes(value as SearchSubType) ) 
  
  if ((currentPath === '/offerings/income/search-by-term-offerings-income' || 
        currentPath === '/offerings/income/update-offering-income' || 
        currentPath === '/offerings/income/delete-offering-income') &&  
      type === SearchType.IncomeAdjustment ) {
    return {
      disabledSearchSubTypes : [
        ...disabledIncomeAdjustmentOfferingIncomeSearchSubTypes,
      ],
    }
  }

  //* Offerings (Activities)
  const disabledActivitiesOfferingIncomeSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubTypesOfferingIncomeActivitiesAllowed.includes(value as SearchSubType) ) 
  
  if ((currentPath === '/offerings/income/search-by-term-offerings-income' || 
        currentPath === '/offerings/income/update-offering-income' || 
        currentPath === '/offerings/income/delete-offering-income') &&  
      type === SearchType.Activities ) {
    return {
      disabledSearchSubTypes : [
        ...disabledActivitiesOfferingIncomeSearchSubTypes,
      ],
    }
  }

  //* Offerings (Ground Church)
  const disabledGroundChurchOfferingIncomeSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubTypesOfferingIncomeGroundChurchAllowed.includes(value as SearchSubType) ) 
  
  if ((currentPath === '/offerings/income/search-by-term-offerings-income' || 
        currentPath === '/offerings/income/update-offering-income' || 
        currentPath === '/offerings/income/delete-offering-income') &&  
      (type === SearchType.ChurchGround || type === SearchType.Special )) {
    return {
      disabledSearchSubTypes : [
        ...disabledGroundChurchOfferingIncomeSearchSubTypes,
      ],
    }
  }

  //! Offering Expenses
  //* Operational Expenses
  const disabledOperationalOfferingExpensesSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubTypesOfferingExpensesOperationalAllowed.includes(value as SearchSubType) ) 
  
  if ((currentPath === '/offerings/expenses/search-by-term-offerings-expenses' || 
        currentPath === '/offerings/expenses/update-offering-expenses' || 
        currentPath === '/offerings/expenses/delete-offering-expenses') &&  
      type === SearchType.OperationalExpenses ) {
    return {
      disabledSearchSubTypes : [
        ...disabledOperationalOfferingExpensesSearchSubTypes,
      ],
    }
  }

  //* Maintenance and repair expenses
  const disabledMaintenanceAndRepairOfferingExpensesSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubTypesOfferingExpensesMaintenanceAndRepairAllowed.includes(value as SearchSubType) ) 
  
  if ((currentPath === '/offerings/expenses/search-by-term-offerings-expenses' || 
        currentPath === '/offerings/expenses/update-offering-expenses' || 
        currentPath === '/offerings/expenses/delete-offering-expenses') &&  
      type === SearchType.MaintenanceAndRepairExpenses ) {
    return {
      disabledSearchSubTypes : [
        ...disabledMaintenanceAndRepairOfferingExpensesSearchSubTypes,
      ],
    }
  }

  //* Decoration expenses
  const disabledDecorationOfferingExpensesSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubTypesOfferingExpensesDecorationAllowed.includes(value as SearchSubType) ) 
  
  if ((currentPath === '/offerings/expenses/search-by-term-offerings-expenses' || 
        currentPath === '/offerings/expenses/update-offering-expenses' || 
        currentPath === '/offerings/expenses/delete-offering-expenses') &&  
      type === SearchType.DecorationExpenses ) {
    return {
      disabledSearchSubTypes : [
        ...disabledDecorationOfferingExpensesSearchSubTypes,
      ],
    }
  }

  //* Equipment and technology expenses
  const disabledEquipmentAndTechnologyOfferingExpensesSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubTypesOfferingExpensesEquipmentAndTechnologyAllowed.includes(value as SearchSubType) ) 

  if ((currentPath === '/offerings/expenses/search-by-term-offerings-expenses' || 
        currentPath === '/offerings/expenses/update-offering-expenses' || 
        currentPath === '/offerings/expenses/delete-offering-expenses') &&  
      type === SearchType.EquipmentAndTechnologyExpenses ) {
    return {
      disabledSearchSubTypes : [
        ...disabledEquipmentAndTechnologyOfferingExpensesSearchSubTypes,
      ],
    }
  }

  //* Supplies expenses
  const disabledSuppliesOfferingExpensesSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubTypesOfferingExpensesSuppliesAllowed.includes(value as SearchSubType) ) 
  
  if ((currentPath === '/offerings/expenses/search-by-term-offerings-expenses' || 
        currentPath === '/offerings/expenses/update-offering-expenses' || 
        currentPath === '/offerings/expenses/delete-offering-expenses') &&  
      type === SearchType.SuppliesExpenses ) {
    return {
      disabledSearchSubTypes : [
        ...disabledSuppliesOfferingExpensesSearchSubTypes,
      ],
    }
  }

  //* Activities and events expenses
  const disabledActivitiesAndEventsOfferingExpensesSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubTypesOfferingExpensesActivitiesAndEventsAllowed.includes(value as SearchSubType) ) 
  
  if ((currentPath === '/offerings/expenses/search-by-term-offerings-expenses' || 
        currentPath === '/offerings/expenses/update-offering-expenses' || 
        currentPath === '/offerings/expenses/delete-offering-expenses') &&  
      type === SearchType.ActivitiesAndEventsExpenses ) {
    return {
      disabledSearchSubTypes : [
        ...disabledActivitiesAndEventsOfferingExpensesSearchSubTypes,
      ],
    }
  }

  //* Offerings (Worship United)
  const disabledExpensesAdjustmentOfferingExpensesSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubTypesOfferingExpensesExpensesAdjustmentAllowed.includes(value as SearchSubType) ) 

  if ((currentPath === '/offerings/expenses/search-by-term-offerings-expenses' || 
        currentPath === '/offerings/expenses/update-offering-expenses' || 
        currentPath === '/offerings/expenses/delete-offering-expenses') &&  
      type === SearchType.ExpensesAdjustment ) {
    return {
      disabledSearchSubTypes : [
        ...disabledExpensesAdjustmentOfferingExpensesSearchSubTypes,
      ],
    }
  }

  //* Users 
  const disabledUserModuleNamesSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubtypesNamesUserModuleAllowed.includes(value as SearchSubType) ) 
  const disabledUserModuleLastNamesSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubtypesLastNamesUserModuleAllowed.includes(value as SearchSubType) ) 
  const disabledUserModuleFullNamesSearchSubTypes = Object.keys(SearchSubTypeNames).filter(value => !SearchSubtypesFullNameUserModuleAllowed.includes(value as SearchSubType) ) 
  
  if ((currentPath === '/users/search-by-term-users' || 
        currentPath === '/users/update-user' || 
        currentPath === '/users/delete-user' )  &&  
      type === SearchType.FirstName ) {
    return {
      disabledSearchSubTypes : [
        ...disabledUserModuleNamesSearchSubTypes,
      ],
    }
  }

  if ((currentPath === '/users/search-by-term-users' || 
        currentPath === '/users/update-user' || 
        currentPath === '/users/delete-user')  &&  
      type === SearchType.LastName ) {
    return {
      disabledSearchSubTypes : [
        ...disabledUserModuleLastNamesSearchSubTypes,
      ],
    }
  }

  if ((currentPath === '/users/search-by-term-users' || 
        currentPath === '/users/update-user' || 
        currentPath === '/users/delete-user')  &&  
      type === SearchType.FullName ) {
    return {
      disabledSearchSubTypes : [
        ...disabledUserModuleFullNamesSearchSubTypes,
      ],
    }
  }

 
}
