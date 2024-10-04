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
  FamilyGroupsByWorshipTime = 'family_groups_by_worship_time',
  FamilyGroupsByRecordStatus = 'family_groups_by_record_status',

  OfferingsIncomeByProportion = 'offerings_income_by_proportion',
  OfferingsIncomeBySundayService = 'offerings_income_by_sunday_service',
  OfferingsIncomeByFamilyGroup = 'offerings_income_by_family_group',
  OfferingsIncomeBySundaySchool = 'offerings_income_by_sunday_school',
  OfferingsIncomeByFastingAndVigil = 'offerings_income_by_fasting_and_vigil',
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
  [MetricSearchType.FamilyGroupsByWorshipTime]: 'Análisis de grupos familiares por horario de culto.',
  [MetricSearchType.FamilyGroupsByRecordStatus]: 'Análisis de grupos familiares por estado de registro.',

  [MetricSearchType.OfferingsIncomeByProportion]: 'Análisis de proporción de ingresos de ofrenda.',
  [MetricSearchType.OfferingsIncomeBySundayService]: 'Análisis de ingresos de ofrenda por culto dominical.',
  [MetricSearchType.OfferingsIncomeByFamilyGroup]: 'Análisis de ingresos de ofrenda por grupo familiar.',
  [MetricSearchType.OfferingsIncomeBySundaySchool]: 'Análisis de ingresos de ofrenda por escuela dominical.',
  [MetricSearchType.OfferingsIncomeByFastingAndVigil]: 'Análisis de ingresos de ofrenda por ayuno y vigilia.',
}

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
  FamilyGroupsByWorshipTime = 'family_groups_by_worship_time',
  FamilyGroupsByRecordStatus = 'family_groups_by_record_status',
}

export const MetricFamilyGroupSearchTypeNames: Record<MetricFamilyGroupSearchType, string> =  {
  [MetricFamilyGroupSearchType.FamilyGroupsFluctuationByYear]: 'Fluctuación de grupos fam. por año.',
  [MetricFamilyGroupSearchType.FamilyGroupsByCode]: 'Grupos fam. por código.',
  [MetricFamilyGroupSearchType.FamilyGroupsByZone]: 'Grupos fam. por zona.',
  [MetricFamilyGroupSearchType.FamilyGroupsByDistrict]: 'Grupos fam. por distrito.',
  [MetricFamilyGroupSearchType.FamilyGroupsByWorshipTime]: 'Grupos fam. por horario de culto.',
  [MetricFamilyGroupSearchType.FamilyGroupsByRecordStatus]: 'Grupos fam. por estado de registro.',
}

export enum MetricOfferingIncomeSearchType {
  OfferingsIncomeBySundayService = 'offerings_income_by_sunday_service',
  OfferingsIncomeByFamilyGroup = 'offerings_income_by_family_group',
  OfferingsIncomeBySundaySchool = 'offerings_income_by_sunday_school',
  OfferingsIncomeByFastingAndVigil = 'offerings_income_by_fasting_and_vigil',
}

export const MetricOfferingIncomeSearchTypeNames: Record<MetricOfferingIncomeSearchType, string> =  {
  [MetricOfferingIncomeSearchType.OfferingsIncomeBySundayService]: 'Ofrendas por culto dominical.',
  [MetricOfferingIncomeSearchType.OfferingsIncomeByFamilyGroup]: 'Ofrendas por grupo familiar.',
  [MetricOfferingIncomeSearchType.OfferingsIncomeBySundaySchool]: 'Ofrendas por escuela dominical.',
  [MetricOfferingIncomeSearchType.OfferingsIncomeByFastingAndVigil]: 'Ofrendas por ayuno y vigilia.',
}


