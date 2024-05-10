// TODO : agregar ingresos por ajustes e salidas por ajuste, en search by term de cada modulo de ofrenda
// TODO : buscar por fecha
// TODO : Agregar tmb culto unido
export enum TypesOfferingExpenses {
  OperationalExpenses = "operative_expenses",
  MaintenanceAndRepairExpenses = "maintenance_and_repair_expenses",
  DecorationExpenses = "decoration_expenses",
  EquipmentAndTechnologyExpenses = "equipment_and_technology_expenses",
  SuppliesExpenses = "supplies_expenses",
  ActivitiesAndEventsExpenses = "activities_and_events_expenses",
  ExpensesAdjustment = 'expenses_adjustment',
}

export const TypesOfferingExpensesNames: Record<TypesOfferingExpenses, string> = {
  operative_expenses : "Gastos de operación",
  maintenance_and_repair_expenses : "Gastos de reparación y mantenimiento",
  decoration_expenses : "Gastos de decoración",
  equipment_and_technology_expenses : "Gastos de equipamiento y tecnología",
  supplies_expenses : "Gastos de suministros",
  activities_and_events_expenses : "Gastos de actividades y eventos",
  expenses_adjustment: "Ajuste por Salida"
};

