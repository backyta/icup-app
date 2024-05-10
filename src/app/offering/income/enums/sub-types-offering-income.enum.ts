export enum SubTypesOfferingIncome {
  SundayWorship = 'sunday_worship',
  GeneralFasting = 'general_fasting',
  GeneralVigil = 'general_vigil',
  ZonalVigil = 'zonal_vigil',
  ZonalFasting = 'zonal_fasting',
  FamilyHouse = 'family_house',
  SundaySchool = 'sunday_school',
  YouthWorship = 'youth_worship',
  WorshipUnited = 'worship_united',
  Special = 'special',
  Activities = 'activities',
  ChurchGround = 'church_ground',
}

export const SubTypesOfferingIncomeNames: Record<SubTypesOfferingIncome, string> = {
  sunday_worship : 'Culto Dominical',
  family_house : 'Casa Familiar',
  general_fasting : 'Ayuno General',
  general_vigil : 'Vigilia General',
  zonal_fasting : 'Ayuno Zonal',
  zonal_vigil : 'Vigilia Zonal',
  sunday_school : 'Escuela Dominical',
  youth_worship : 'Culto Jóvenes',
  worship_united : 'Culto Unido',
  activities : 'Actividades',
  church_ground : 'Terreno Iglesia',
  special : 'Especial',
};
