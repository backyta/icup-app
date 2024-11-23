export enum MetricSearchType {
  MembersByProportion = 'members_by_proportion',
  MembersFluctuationByYear = 'members_fluctuation_by_year',
  MembersByBirthMonth = 'members_by_birth_month',
  MembersByCategory = 'members_by_category',
  MembersByCategoryAndGender = 'members_by_category_and_gender',
  MembersByRoleAndGender = 'members_by_role_and_gender',
  MembersByMaritalStatus = 'members_by_marital_status',
  MembersByZoneAndGender = 'members_by_zone_and_gender',
  PreachersByZoneAndGender = 'preachers_by_zone_and_gender',
  MembersByDistrictAndGender = 'members_by_district_and_gender',
  MembersByRecordStatus = 'members_by_record_status',

  FamilyGroupsByProportion = 'family_groups_by_proportion',
  FamilyGroupsFluctuationByYear = 'family_groups_fluctuation_by_year',
  FamilyGroupsByCode = 'family_groups_by_code',
  FamilyGroupsByZone = 'family_groups_by_zone',
  FamilyGroupsByDistrict = 'family_groups_by_district',
  FamilyGroupsByServiceTime = 'family_groups_by_service_time',
  FamilyGroupsByRecordStatus = 'family_groups_by_record_status',

  OfferingIncomeByProportion = 'offering_income_by_proportion',
  OfferingIncomeBySundayService = 'offering_income_by_sunday_service',
  OfferingIncomeByFamilyGroup = 'offering_income_by_family_group',
  OfferingIncomeBySundaySchool = 'offering_income_by_sunday_school',
  OfferingIncomeByFastingAndVigil = 'offering_income_by_fasting_and_vigil',
  OfferingIncomeByYouthService = 'offering_income_by_youth_service',
  OfferingIncomeBySpecialOffering = 'offering_income_by_special_offering',
  OfferingIncomeByChurchGround = 'offering_income_by_church_ground',
  OfferingIncomeByUnitedService = 'offering_income_by_united_service',
  OfferingIncomeByActivities = 'offering_income_by_activities',
  OfferingIncomeAdjustment = 'offering_income_adjustment',

  OfferingExpensesByProportion = 'offering_expenses_by_proportion',
  OperationalOfferingExpenses = 'operational_offering_expenses',
  MaintenanceAndRepairOfferingExpenses = 'maintenance_and_repair_offering_expenses',
  DecorationOfferingExpenses = 'decoration_offering_expenses',
  EquipmentAndTechnologyOfferingExpenses = 'equipment_and_technology_offering_expenses',
  SuppliesOfferingExpenses = 'supplies_offering_expenses',
  PlaningEventsOfferingExpenses = 'planing_events_offering_expenses',
  OfferingExpensesAdjustment = 'offering_expenses_adjustment',

  OfferingExpensesAndOfferingIncomeByProportion = 'offering_expenses_and_offering_income_by_proportion',
  IncomeAndExpensesComparativeByYear = 'income_and_expense_comparative_by_year',
  GeneralComparativeOfferingIncome = 'general_comparative_offering_income',
  ComparativeOfferingIncomeByType = 'comparative_offering_income_by_type',
  GeneralComparativeOfferingExpenses = 'general_comparative_offering_expenses',
  ComparativeOfferingExpensesByType = 'comparative_offering_expenses_by_type',
  ComparativeOfferingExpensesBySubType = 'comparative_offering_expenses_by_sub_type',
}

export const MetricSearchTypeNames: Record<MetricSearchType, string> =  {
  [MetricSearchType.MembersByProportion]: 'Análisis de proporción de miembros.',
  [MetricSearchType.MembersFluctuationByYear]: 'Análisis de fluctuación de miembros por año.',
  [MetricSearchType.MembersByBirthMonth]: 'Análisis de miembros por mes de nacimiento.',
  [MetricSearchType.MembersByCategory]: 'Análisis de miembros por categoría.',
  [MetricSearchType.MembersByCategoryAndGender]: 'Análisis de miembros por categoría y género.',
  [MetricSearchType.MembersByRoleAndGender]: 'Análisis de miembros por rol y género.',
  [MetricSearchType.MembersByMaritalStatus]: 'Análisis de miembros por estado civil.',
  [MetricSearchType.MembersByZoneAndGender]: 'Análisis de miembros por zone y género.',
  [MetricSearchType.PreachersByZoneAndGender]: 'Análisis de predicadores por zone y género.',
  [MetricSearchType.MembersByDistrictAndGender]: 'Análisis de miembros por distrito y género.',
  [MetricSearchType.MembersByRecordStatus]: 'Análisis de miembros por estado de registro.',

  [MetricSearchType.FamilyGroupsByProportion]: 'Análisis de proporción de grupos familiares.',
  [MetricSearchType.FamilyGroupsFluctuationByYear]: 'Análisis de fluctuación de grupos familiares por año.',
  [MetricSearchType.FamilyGroupsByCode]: 'Análisis de grupos familiares por código.',
  [MetricSearchType.FamilyGroupsByZone]: 'Análisis de grupos familiares por zona.',
  [MetricSearchType.FamilyGroupsByDistrict]: 'Análisis de grupos familiares por distrito.',
  [MetricSearchType.FamilyGroupsByServiceTime]: 'Análisis de grupos familiares por horario de culto.',
  [MetricSearchType.FamilyGroupsByRecordStatus]: 'Análisis de grupos familiares por estado de registro.',

  [MetricSearchType.OfferingIncomeByProportion]: 'Análisis de proporción de ingresos de ofrenda.',
  [MetricSearchType.OfferingIncomeBySundayService]: 'Análisis de ingresos de ofrenda por culto dominical.',
  [MetricSearchType.OfferingIncomeByFamilyGroup]: 'Análisis de ingresos de ofrenda por grupo familiar.',
  [MetricSearchType.OfferingIncomeBySundaySchool]: 'Análisis de ingresos de ofrenda por escuela dominical.',
  [MetricSearchType.OfferingIncomeByFastingAndVigil]: 'Análisis de ingresos de ofrenda por ayuno y vigilia.',
  [MetricSearchType.OfferingIncomeByYouthService]: 'Análisis de ingresos de ofrenda por culto juvenil.',
  [MetricSearchType.OfferingIncomeBySpecialOffering]: 'Análisis de ingresos de ofrenda por ofrenda especial.',
  [MetricSearchType.OfferingIncomeByChurchGround]: 'Análisis de ingresos de ofrenda por terreno iglesia.',
  [MetricSearchType.OfferingIncomeByUnitedService]: 'Análisis de ingresos de ofrenda por culto unido.',
  [MetricSearchType.OfferingIncomeByActivities]: 'Análisis de ingresos de ofrenda por actividades.',
  [MetricSearchType.OfferingIncomeAdjustment]: 'Análisis de ingresos de ofrenda por ajustes de ingreso.',

  [MetricSearchType.OfferingExpensesByProportion]: 'Análisis de proporción de salidas de ofrenda.',
  [MetricSearchType.OperationalOfferingExpenses]: 'Análisis de salidas de ofrenda por gastos operativos.',
  [MetricSearchType.MaintenanceAndRepairOfferingExpenses]: 'Análisis de salidas de ofrenda por gastos de mantenimiento y reparación.',
  [MetricSearchType.DecorationOfferingExpenses]: 'Análisis de salidas de ofrenda por gastos de decoración.',
  [MetricSearchType.EquipmentAndTechnologyOfferingExpenses]: 'Análisis de salidas de ofrenda por gastos de equipamiento y tecnología.',
  [MetricSearchType.SuppliesOfferingExpenses]: 'Análisis de salidas de ofrenda por gastos de suministros.',
  [MetricSearchType.PlaningEventsOfferingExpenses]: 'Análisis de salidas de ofrenda por gastos de planificación de eventos.',
  [MetricSearchType.OfferingExpensesAdjustment]: 'Análisis de salidas de ofrenda por ajustes de salida.',

  [MetricSearchType.OfferingExpensesAndOfferingIncomeByProportion]: 'Análisis de proporción de ingresos y salidas de ofrendas.',
  [MetricSearchType.IncomeAndExpensesComparativeByYear]: 'Análisis de comparación de ingresos y salidas de ofrenda.',
  [MetricSearchType.GeneralComparativeOfferingIncome]: 'Análisis de comparación general de ingreso de ofrenda.',
  [MetricSearchType.ComparativeOfferingIncomeByType]: 'Análisis de comparación de ingreso de ofrenda por tipo.',
  [MetricSearchType.GeneralComparativeOfferingExpenses]: 'Análisis de comparación general de salida de ofrenda.',
  [MetricSearchType.ComparativeOfferingExpensesByType]: 'Análisis de comparación de salida de ofrenda por tipo.',
  [MetricSearchType.ComparativeOfferingExpensesBySubType]: 'Análisis de comparación de salida de ofrenda por sub-tipo.',
}

//* Para los reportes
export enum MetricMemberSearchType {
  MembersFluctuationByYear = 'members_fluctuation_by_year',
  MembersByBirthMonth = 'members_by_birth_month',
  MembersByCategory = 'members_by_category',
  MembersByCategoryAndGender = 'members_by_category_and_gender',
  MembersByRoleAndGender = 'members_by_role_and_gender',
  MembersByMaritalStatus = 'members_by_marital_status',
  MembersByZoneAndGender = 'members_by_zone_and_gender',
  PreachersByZoneAndGender = 'preachers_by_zone_and_gender',
  MembersByDistrictAndGender = 'members_by_district_and_gender',
  MembersByRecordStatus = 'members_by_record_status',
}

export const MetricMemberSearchTypeNames: Record<MetricMemberSearchType, string> =  {
  [MetricSearchType.MembersFluctuationByYear]: 'Fluctuación de miembros por año.',
  [MetricSearchType.MembersByBirthMonth]: 'Miembros por mes de nacimiento.',
  [MetricSearchType.MembersByCategory]: 'Miembros por categoría.',
  [MetricSearchType.MembersByCategoryAndGender]: 'Miembros por categoría y género.',
  [MetricSearchType.MembersByRoleAndGender]: 'Miembros por rol y género.',
  [MetricSearchType.MembersByMaritalStatus]: 'Miembros por estado civil.',
  [MetricSearchType.MembersByZoneAndGender]: 'Miembros por zone y género.',
  [MetricSearchType.PreachersByZoneAndGender]: 'Predicadores por zona y género.',
  [MetricSearchType.MembersByDistrictAndGender]: 'Miembros por distrito y género.',
  [MetricSearchType.MembersByRecordStatus]: 'Miembros por estado de registro.',
}

export enum MetricFamilyGroupSearchType {
  FamilyGroupsFluctuationByYear = 'family_groups_fluctuation_by_year',
  FamilyGroupsByCode = 'family_groups_by_code',
  FamilyGroupsByZone = 'family_groups_by_zone',
  FamilyGroupsByDistrict = 'family_groups_by_district',
  FamilyGroupsByServiceTime = 'family_groups_by_service_time',
  FamilyGroupsByRecordStatus = 'family_groups_by_record_status',
}

export const MetricFamilyGroupSearchTypeNames: Record<MetricFamilyGroupSearchType, string> =  {
  [MetricFamilyGroupSearchType.FamilyGroupsFluctuationByYear]: 'Fluctuación de grupos familiares por año.',
  [MetricFamilyGroupSearchType.FamilyGroupsByCode]: 'Grupos familiares por código.',
  [MetricFamilyGroupSearchType.FamilyGroupsByZone]: 'Grupos familiares por zona.',
  [MetricFamilyGroupSearchType.FamilyGroupsByDistrict]: 'Grupos familiares por distrito.',
  [MetricFamilyGroupSearchType.FamilyGroupsByServiceTime]: 'Grupos familiares por horario de culto.',
  [MetricFamilyGroupSearchType.FamilyGroupsByRecordStatus]: 'Grupos familiares por estado de registro.',
}

export enum MetricOfferingIncomeSearchType {
  OfferingIncomeBySundayService = 'offering_income_by_sunday_service',
  OfferingIncomeByFamilyGroup = 'offering_income_by_family_group',
  OfferingIncomeBySundaySchool = 'offering_income_by_sunday_school',
  OfferingIncomeByFastingAndVigil = 'offering_income_by_fasting_and_vigil',
  OfferingIncomeByYouthService = 'offering_income_by_youth_service',
  OfferingIncomeBySpecialOffering = 'offering_income_by_special_offering',
  OfferingIncomeByChurchGround = 'offering_income_by_church_ground',
  OfferingIncomeByUnitedService = 'offering_income_by_united_service',
  OfferingIncomeByActivities = 'offering_income_by_activities',
  OfferingIncomeAdjustment = 'offering_income_adjustment',
}

export const MetricOfferingIncomeSearchTypeNames: Record<MetricOfferingIncomeSearchType, string> =  {
  [MetricOfferingIncomeSearchType.OfferingIncomeBySundayService]: 'Ofrendas por culto dominical.',
  [MetricOfferingIncomeSearchType.OfferingIncomeByFamilyGroup]: 'Ofrendas por grupo familiar.',
  [MetricOfferingIncomeSearchType.OfferingIncomeBySundaySchool]: 'Ofrendas por escuela dominical.',
  [MetricOfferingIncomeSearchType.OfferingIncomeByFastingAndVigil]: 'Ofrendas por ayuno y vigilia.',
  [MetricOfferingIncomeSearchType.OfferingIncomeByYouthService]: 'Ofrendas por culto juvenil.',
  [MetricOfferingIncomeSearchType.OfferingIncomeBySpecialOffering]: 'Ofrendas por ofrenda especial.',
  [MetricOfferingIncomeSearchType.OfferingIncomeByChurchGround]: 'Ofrendas por terreno iglesia.',
  [MetricOfferingIncomeSearchType.OfferingIncomeByUnitedService]: 'Ofrendas por culto unido.',
  [MetricOfferingIncomeSearchType.OfferingIncomeByActivities]: 'Ofrendas por actividades.',
  [MetricOfferingIncomeSearchType.OfferingIncomeAdjustment]: 'Ajustes por ingreso.',
}

export enum MetricOfferingExpenseSearchType {
  OperationalOfferingExpenses = 'operational_offering_expenses',
  DecorationOfferingExpenses = 'decoration_offering_expenses',
  MaintenanceAndRepairOfferingExpenses = 'maintenance_and_repair_offering_expenses',
  EquipmentAndTechnologyOfferingExpenses = 'equipment_and_technology_offering_expenses',
  SuppliesOfferingExpenses = 'supplies_offering_expenses',
  PlaningEventsOfferingExpenses = 'planing_events_offering_expenses',
  OfferingExpensesAdjustment = 'offering_expenses_adjustment',
}

export const MetricOfferingExpenseSearchTypeNames: Record<MetricOfferingExpenseSearchType, string> =  {
  [MetricOfferingExpenseSearchType.OperationalOfferingExpenses]: 'Gastos Operativos.',
  [MetricOfferingExpenseSearchType.MaintenanceAndRepairOfferingExpenses]: 'Gastos de Mantenimiento y Reparación.',
  [MetricOfferingExpenseSearchType.DecorationOfferingExpenses]: 'Gastos de Decoración.',
  [MetricOfferingExpenseSearchType.EquipmentAndTechnologyOfferingExpenses]: 'Gastos de Equipamiento y Tecnología.',
  [MetricOfferingExpenseSearchType.SuppliesOfferingExpenses]: 'Gastos de Suministros.',
  [MetricOfferingExpenseSearchType.PlaningEventsOfferingExpenses]: 'Gastos de Planificación de Eventos.',
  [MetricOfferingExpenseSearchType.OfferingExpensesAdjustment]: 'Ajustes por salida.',
}

export enum MetricFinancialBalanceComparisonSearchType {
  IncomeAndExpensesComparativeByYear = 'income_and_expense_comparative_by_year',
  GeneralComparativeOfferingIncome = 'general_comparative_offering_income',
  ComparativeOfferingIncomeByType = 'comparative_offering_income_by_type',
  GeneralComparativeOfferingExpenses = 'general_comparative_offering_expenses',
  ComparativeOfferingExpensesByType = 'comparative_offering_expenses_by_type',
  ComparativeOfferingExpensesBySubType = 'comparative_offering_expenses_by_sub_type',
}

export const MetricFinancialBalanceComparisonSearchTypeNames: Record<MetricFinancialBalanceComparisonSearchType, string> =  {
  [MetricFinancialBalanceComparisonSearchType.IncomeAndExpensesComparativeByYear]: 'Comparativa de Ingresos y Salidas por año.',
  [MetricFinancialBalanceComparisonSearchType.GeneralComparativeOfferingIncome]: 'Comparativa de Ingresos de Ofrenda (General).',
  [MetricFinancialBalanceComparisonSearchType.ComparativeOfferingIncomeByType]: 'Comparativa de Ingresos de Ofrenda (Tipo).',
  [MetricFinancialBalanceComparisonSearchType.GeneralComparativeOfferingExpenses]: 'Comparativa de Salidas de Ofrenda (General).',
  [MetricFinancialBalanceComparisonSearchType.ComparativeOfferingExpensesByType]: 'Comparativa de Salidas de Ofrenda (Tipo).',
  [MetricFinancialBalanceComparisonSearchType.ComparativeOfferingExpensesBySubType]: 'Comparativa de Salidas de Ofrenda (Sub-Tipo).',
}


