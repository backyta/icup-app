export enum MetricSearchType {
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

export const MetricSearchTypeNames: Record<MetricSearchType, string> =  {
  [MetricSearchType.MembersFluctuationByYear]: 'Análisis de fluctuación de miembros por año',
  [MetricSearchType.MembersByBirthMonth]: 'Análisis de miembros por mes de nacimiento',
  [MetricSearchType.MembersByCategory]: 'Análisis de miembros por categoría',
  [MetricSearchType.MembersByCategoryAndGender]: 'Análisis de miembros por categoría y género',
  [MetricSearchType.MembersByRoleAndGender]: 'Análisis de miembros por rol y género',
  [MetricSearchType.MembersByMaritalStatus]: 'Análisis de miembros por estado civil',
  [MetricSearchType.MembersByZoneAndGender]: 'Análisis de miembros por zone y género',
  [MetricSearchType.PreachersByZoneAndGender]: 'Análisis de predicadores por zone y género',
  [MetricSearchType.MembersByDistrictAndGender]: 'Análisis de miembros por distrito y género',
  [MetricSearchType.MembersByRecordStatus]: 'Análisis de miembros por estado de registro',
}