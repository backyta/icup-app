export enum OfferingIncomeSearchType {
  SundayService = 'sunday_service',
  FamilyGroup = 'family_group',
  GeneralFasting = 'general_fasting',
  GeneralVigil = 'general_vigil',
  ZonalFasting = 'zonal_fasting',
  ZonalVigil = 'zonal_vigil',
  SundaySchool = 'sunday_school',
  YouthService = 'youth_service',
  UnitedService = 'united_service',
  Activities = 'activities',
  ChurchGround = 'church_ground',
  Special = 'special',
  IncomeAdjustment = 'income_adjustment',
  RecordStatus = 'record_status',
}

export const OfferingIncomeSearchTypeNames: Record<OfferingIncomeSearchType, string> =  {
  [OfferingIncomeSearchType.SundayService]: 'Ofrendas - Culto Dominical',
  [OfferingIncomeSearchType.FamilyGroup]: 'Ofrendas - Grupo Familiar',
  [OfferingIncomeSearchType.GeneralFasting]: 'Ofrendas - Ayuno General',
  [OfferingIncomeSearchType.GeneralVigil]: 'Ofrenda - Vigilia General',
  [OfferingIncomeSearchType.ZonalFasting]: 'Ofrenda - Ayuno Zonal',
  [OfferingIncomeSearchType.ZonalVigil]: 'Ofrendas - Vigilia Zonal',
  [OfferingIncomeSearchType.SundaySchool]:  'Ofrendas - Escuela Dominical',
  [OfferingIncomeSearchType.YouthService]: 'Ofrendas - Culto Jóvenes',
  [OfferingIncomeSearchType.UnitedService]: 'Ofrendas - Culto Unido',
  [OfferingIncomeSearchType.Activities]: 'Ofrendas - Actividades',
  [OfferingIncomeSearchType.ChurchGround]: 'Ofrendas - Terreno Iglesia',
  [OfferingIncomeSearchType.Special]: 'Ofrendas - Especial',
  [OfferingIncomeSearchType.IncomeAdjustment]: 'Ajustes por Ingreso',
  [OfferingIncomeSearchType.RecordStatus]: 'Estado de Registro',
}

// NOTE : hacer ofrenda de terreno iglesia, jovenes, escuela dominical, por actvidades (tipo/general) y por miembro (especifico)
// NOTE : en la db y aqui hacer una columna que sea miembro o actividades, y que esto se mande a la DB
// NOTE : al seleccionar uno de los 2 deplegara diferentes inputs del form y se llenara segun eso.
// NOTE : se arregla en las metricas agrupando por el tipo si es por miembro o por actvidad.