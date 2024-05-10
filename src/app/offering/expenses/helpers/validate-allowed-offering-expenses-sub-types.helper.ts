/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { SubTypesOfferingExpensesNames, TypesOfferingExpenses, type SubTypesOfferingExpenses } from '@/app/offering/expenses/enums';
import { 
  SubtypesActivitiesAndEventsExpensesAllowed, 
  SubtypesDecorationExpensesAllowed, 
  SubtypesEquipmentAndTechnologyExpensesAllowed, 
  SubtypesMaintenanceAndRepairExpensesAllowed, 
  SubtypesOperatingExpensesAllowed, 
  SubTypesSuppliesExpensesAllowed 
} from '@/app/offering/expenses/helpers';

export const validateAllowedOfferingExpensesSubtypes = (currentPath: string, type: string ) => {

  //* Disabled Sub-types 
  const disabledOperatingExpensesSubtypes = Object.keys(SubTypesOfferingExpensesNames).filter(value => !SubtypesOperatingExpensesAllowed.includes(value as SubTypesOfferingExpenses) );
  const disabledMaintenanceAndRepairExpensesSubtypes = Object.keys(SubTypesOfferingExpensesNames).filter(value => !SubtypesMaintenanceAndRepairExpensesAllowed.includes(value as SubTypesOfferingExpenses) );
  const disabledDecorationExpensesSubtypes = Object.keys(SubTypesOfferingExpensesNames).filter(value => !SubtypesDecorationExpensesAllowed.includes(value as SubTypesOfferingExpenses) );
  const disabledEquipmentAndTechnologyExpensesSubtypes = Object.keys(SubTypesOfferingExpensesNames).filter(value => !SubtypesEquipmentAndTechnologyExpensesAllowed.includes(value as SubTypesOfferingExpenses) );
  const disabledSuppliesExpensesSubtypes = Object.keys(SubTypesOfferingExpensesNames).filter(value => !SubTypesSuppliesExpensesAllowed.includes(value as SubTypesOfferingExpenses) );
  const disabledActivitiesAndEventsExpensesSubtypes = Object.keys(SubTypesOfferingExpensesNames).filter(value => !SubtypesActivitiesAndEventsExpensesAllowed.includes(value as SubTypesOfferingExpenses) );
  
  if ((currentPath === '/offerings/expenses/create-offering-expenses' || 
        currentPath === '/offerings/expenses/update-offering-expenses' ) && 
      type === TypesOfferingExpenses.OperationalExpenses) {
    return {
      disabledSubTypes : [
        ...disabledOperatingExpensesSubtypes,
      ],
    }
  }
  if ((currentPath === '/offerings/expenses/create-offering-expenses' || 
        currentPath === '/offerings/expenses/update-offering-expenses' ) && 
      type === TypesOfferingExpenses.MaintenanceAndRepairExpenses) {
    return {
      disabledSubTypes : [
        ...disabledMaintenanceAndRepairExpensesSubtypes,
      ],
    }
  }
  if ((currentPath === '/offerings/expenses/create-offering-expenses' || 
        currentPath === '/offerings/expenses/update-offering-expenses' ) &&
      type === TypesOfferingExpenses.DecorationExpenses) {
    return {
      disabledSubTypes : [
        ...disabledDecorationExpensesSubtypes,
      ],
    }
  }
  if ((currentPath === '/offerings/expenses/create-offering-expenses' || 
        currentPath === '/offerings/expenses/update-offering-expenses' ) && 
      type === TypesOfferingExpenses.EquipmentAndTechnologyExpenses) {
    return {
      disabledSubTypes : [
        ...disabledEquipmentAndTechnologyExpensesSubtypes,
      ],
    }
  }
  if ((currentPath === '/offerings/expenses/create-offering-expenses' || 
        currentPath === '/offerings/expenses/update-offering-expenses' ) && 
      type === TypesOfferingExpenses.SuppliesExpenses) {
    return {
      disabledSubTypes : [
        ...disabledSuppliesExpensesSubtypes,
      ],
    }
  }
  if ((currentPath === '/offerings/expenses/create-offering-expenses' || 
        currentPath === '/offerings/expenses/update-offering-expenses' ) &&
      type === TypesOfferingExpenses.ActivitiesAndEventsExpenses) {
    return {
      disabledSubTypes : [
        ...disabledActivitiesAndEventsExpensesSubtypes,
      ],
    }
  }
}
