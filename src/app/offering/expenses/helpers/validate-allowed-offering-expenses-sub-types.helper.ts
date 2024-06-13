/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { SubTypesOfferingExpenseNames, TypesOfferingExpense, type SubTypesOfferingExpense } from '@/app/offering/expenses/enums';
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
  const disabledOperatingExpensesSubtypes = Object.keys(SubTypesOfferingExpenseNames).filter(value => !SubtypesOperatingExpensesAllowed.includes(value as SubTypesOfferingExpense) );
  const disabledMaintenanceAndRepairExpensesSubtypes = Object.keys(SubTypesOfferingExpenseNames).filter(value => !SubtypesMaintenanceAndRepairExpensesAllowed.includes(value as SubTypesOfferingExpense) );
  const disabledDecorationExpensesSubtypes = Object.keys(SubTypesOfferingExpenseNames).filter(value => !SubtypesDecorationExpensesAllowed.includes(value as SubTypesOfferingExpense) );
  const disabledEquipmentAndTechnologyExpensesSubtypes = Object.keys(SubTypesOfferingExpenseNames).filter(value => !SubtypesEquipmentAndTechnologyExpensesAllowed.includes(value as SubTypesOfferingExpense) );
  const disabledSuppliesExpensesSubtypes = Object.keys(SubTypesOfferingExpenseNames).filter(value => !SubTypesSuppliesExpensesAllowed.includes(value as SubTypesOfferingExpense) );
  const disabledActivitiesAndEventsExpensesSubtypes = Object.keys(SubTypesOfferingExpenseNames).filter(value => !SubtypesActivitiesAndEventsExpensesAllowed.includes(value as SubTypesOfferingExpense) );
  
  if ((currentPath === '/offerings/expenses/create-offering-expenses' || 
        currentPath === '/offerings/expenses/update-offering-expenses' ) && 
      type === TypesOfferingExpense.OperationalExpenses) {
    return {
      disabledSubTypes : [
        ...disabledOperatingExpensesSubtypes,
      ],
    }
  }
  if ((currentPath === '/offerings/expenses/create-offering-expenses' || 
        currentPath === '/offerings/expenses/update-offering-expenses' ) && 
      type === TypesOfferingExpense.MaintenanceAndRepairExpenses) {
    return {
      disabledSubTypes : [
        ...disabledMaintenanceAndRepairExpensesSubtypes,
      ],
    }
  }
  if ((currentPath === '/offerings/expenses/create-offering-expenses' || 
        currentPath === '/offerings/expenses/update-offering-expenses' ) &&
      type === TypesOfferingExpense.DecorationExpenses) {
    return {
      disabledSubTypes : [
        ...disabledDecorationExpensesSubtypes,
      ],
    }
  }
  if ((currentPath === '/offerings/expenses/create-offering-expenses' || 
        currentPath === '/offerings/expenses/update-offering-expenses' ) && 
      type === TypesOfferingExpense.EquipmentAndTechnologyExpenses) {
    return {
      disabledSubTypes : [
        ...disabledEquipmentAndTechnologyExpensesSubtypes,
      ],
    }
  }
  if ((currentPath === '/offerings/expenses/create-offering-expenses' || 
        currentPath === '/offerings/expenses/update-offering-expenses' ) && 
      type === TypesOfferingExpense.SuppliesExpenses) {
    return {
      disabledSubTypes : [
        ...disabledSuppliesExpensesSubtypes,
      ],
    }
  }
  if ((currentPath === '/offerings/expenses/create-offering-expenses' || 
        currentPath === '/offerings/expenses/update-offering-expenses' ) &&
      type === TypesOfferingExpense.ActivitiesAndEventsExpenses) {
    return {
      disabledSubTypes : [
        ...disabledActivitiesAndEventsExpensesSubtypes,
      ],
    }
  }
}
