export enum OfferingExpenseSearchType {
  OperationalExpense = "operative_expense",
  MaintenanceAndRepairExpense = "maintenance_and_repair_expense",
  DecorationExpense = "decoration_expenses",
  EquipmentAndTechnologyExpense = "equipment_and_technology_expense",
  SuppliesExpense = "supplies_expense",
  ActivitiesAndEventsExpense = "activities_and_events_expense",
  ExpenseAdjustment = 'expense_adjustment',
  RecordStatus = 'record_status',
}

export const OfferingExpenseSearchTypeNames: Record<OfferingExpenseSearchType, string> = {
  [OfferingExpenseSearchType.OperationalExpense]: "Gastos Operativos",
  [OfferingExpenseSearchType.MaintenanceAndRepairExpense]: "Gastos de Reparación y Mantenimiento",
  [OfferingExpenseSearchType.DecorationExpense]: "Gastos de Decoración",
  [OfferingExpenseSearchType.EquipmentAndTechnologyExpense]: "Gastos de Equipamiento y Tecnología",
  [OfferingExpenseSearchType.SuppliesExpense]: "Gastos de Suministros",
  [OfferingExpenseSearchType.ActivitiesAndEventsExpense]: "Gastos de Actividades y Eventos",
  [OfferingExpenseSearchType.ExpenseAdjustment]: "Ajuste por Salida",
  [OfferingExpenseSearchType.RecordStatus]: 'Estado de Registro',
};

