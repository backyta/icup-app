export enum SubTypesOffering {
  sundayWorship = 'sunday_worship',
  generalFasting = 'general_fasting',
  generalVigil = 'general_vigil',
  zonalVigil = 'zonal_vigil',
  zonalFasting = 'zonal_fasting',
  familyHouse = 'family_house',
  sundaySchool = 'sunday_school',
  youthWorship = 'youth_worship',
  special = 'special',
  activities = 'activities',
  churchGround = 'church_ground',
}

export const SubTypesOfferingNames: Record<SubTypesOffering, string> = {
  sunday_worship : 'Ofrenda Dominical',
  family_house : 'Casa Familiar',
  general_fasting : 'Ayuno General',
  general_vigil : 'Vigilia General',
  zonal_fasting : 'Ayuno Zonal',
  zonal_vigil : 'Vigilia Zonal',
  sunday_school : 'Escuela Dominical',
  youth_worship : 'Culto Jóvenes',
  activities : 'Actividades',
  church_ground : 'Terreno Iglesia',
  special : 'Especial',
};
