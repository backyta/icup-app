export enum OfferingIncomeSearchSubType {
  OfferingByDate = 'offering_by_date',
  OfferingByChurch = 'offering_by_church',
  OfferingByChurchDate = 'offering_by_church_date',
  
  // Sunday Worship, school sunday
  OfferingByShift = 'offering_by_shift',
  OfferingByShiftDate = 'offering_by_shift_date',

  // Family House, Fasting Zonal, Vigil Zonal
  OfferingByZone = 'offering_by_zone', 
  OfferingByZoneDate = 'offering_by_zone_date',

  // Offering Family House
  OfferingByGroupCode = 'offering_by_group_code',
  OfferingByGroupCodeDate = 'offering_by_group_code_date',
  OfferingByPreacherNames = 'offering_by_preacher_names',
  OfferingByPreacherFullName = 'offering_by_preacher_full_name',
  OfferingByPreacherLastNames = 'offering_by_preacher_last_names',

  // Offering Ayuno y Vigilia Zonal
  OfferingBySupervisorNames = 'offering_by_supervisor_names',
  OfferingBySupervisorLastNames = 'offering_by_supervisor_last_names',
  OfferingBySupervisorFullName = 'offering_by_supervisor_full_name',

  // Offering Ground Church and Special
  OfferingByContributorNames = 'offering_by_contributor_names',
  OfferingByContributorLastNames = 'offering_by_contributor_last_names',
  OfferingByContributorFullName = 'offering_by_contributor_full_name',
}

export const OfferingIncomeSearchSubTypeNames: Record<OfferingIncomeSearchSubType, string> =  {
  [OfferingIncomeSearchSubType.OfferingByDate]: 'Por fecha',
  [OfferingIncomeSearchSubType.OfferingByChurch]: 'Por iglesia',
  [OfferingIncomeSearchSubType.OfferingByChurchDate]: 'Por fecha e iglesia',

  // Sunday Worship, youngs, school sunday
  [OfferingIncomeSearchSubType.OfferingByShift]: 'Por turno',
  [OfferingIncomeSearchSubType.OfferingByShiftDate]: 'Por fecha y turno',

  // Family House, Fasting Zonal, Vigil Zonal
  [OfferingIncomeSearchSubType.OfferingByZone]: 'Por zona',
  [OfferingIncomeSearchSubType.OfferingByZoneDate]: 'Por zona y fecha',

  // Family House
  [OfferingIncomeSearchSubType.OfferingByPreacherNames]: 'Por nombres de su predicador',
  [OfferingIncomeSearchSubType.OfferingByPreacherLastNames]: 'Por apellidos de su predicador',
  [OfferingIncomeSearchSubType.OfferingByPreacherFullName]: 'Por nombres y apellidos de su predicador',
  [OfferingIncomeSearchSubType.OfferingByGroupCode]: 'Por código de grupo fam.',
  [OfferingIncomeSearchSubType.OfferingByGroupCodeDate]: 'Por código de grupo fam. y fecha',

  // Offering Ayuno Zonal y Vigilia Zonal
  [OfferingIncomeSearchSubType.OfferingBySupervisorNames]: 'Por nombres de su supervisor',
  [OfferingIncomeSearchSubType.OfferingBySupervisorLastNames]: 'Por apellidos de su supervisor',
  [OfferingIncomeSearchSubType.OfferingBySupervisorFullName]: 'Por nombres y apellidos de su supervisor',

  // Offering Ground Church and Special
  [OfferingIncomeSearchSubType.OfferingByContributorNames]: 'Por nombres del aportante',
  [OfferingIncomeSearchSubType.OfferingByContributorLastNames]: 'Por apellidos del aportante',
  [OfferingIncomeSearchSubType.OfferingByContributorFullName]: 'Por nombres y apellidos del aportante',

}

//* Sunday Worship
export enum OfferingIncomeSearchBySundayWorshipAndSundaySchool {
  OfferingByDate = 'offering_by_date',
  OfferingByShift = 'offering_by_shift',
  OfferingByChurch = 'offering_by_church',
  OfferingByShiftDate = 'offering_by_shift_date',
  OfferingByChurchDate = 'offering_by_church_date',
}

export const OfferingIncomeSearchBySundayWorshipAndSundaySchoolNames: Record<OfferingIncomeSearchBySundayWorshipAndSundaySchool, string> =  {
  [OfferingIncomeSearchBySundayWorshipAndSundaySchool.OfferingByDate]: 'Por fecha',
  [OfferingIncomeSearchBySundayWorshipAndSundaySchool.OfferingByShift]: 'Por turno',
  [OfferingIncomeSearchBySundayWorshipAndSundaySchool.OfferingByChurch]: 'Por iglesia',
  [OfferingIncomeSearchBySundayWorshipAndSundaySchool.OfferingByShiftDate]: 'Por fecha y turno',
  [OfferingIncomeSearchBySundayWorshipAndSundaySchool.OfferingByChurchDate]: 'Por fecha e iglesia',
}

//* Offering (Family House)
export enum OfferingIncomeSearchByFamilyGroup {
  OfferingByZone = 'offering_by_zone', 
  OfferingByDate = 'offering_by_date',
  OfferingByZoneDate = 'offering_by_zone_date',
  OfferingByGroupCode = 'offering_by_group_code',
  OfferingByGroupCodeDate = 'offering_by_group_code_date',
  OfferingByPreacherNames = 'offering_by_preacher_names',
  OfferingByPreacherFullName = 'offering_by_preacher_full_name',
  OfferingByPreacherLastNames = 'offering_by_preacher_last_names',
}

export const OfferingIncomeSearchByFamilyGroupNames: Record<OfferingIncomeSearchByFamilyGroup, string> =  {
  [OfferingIncomeSearchByFamilyGroup.OfferingByDate]: 'Por fecha',
  [OfferingIncomeSearchByFamilyGroup.OfferingByZone]: 'Por zona',
  [OfferingIncomeSearchByFamilyGroup.OfferingByZoneDate]: 'Por zona y fecha',
  [OfferingIncomeSearchByFamilyGroup.OfferingByGroupCode]: 'Por código de grupo',
  [OfferingIncomeSearchByFamilyGroup.OfferingByGroupCodeDate]: 'Por código y fecha',
  [OfferingIncomeSearchByFamilyGroup.OfferingByPreacherNames]: 'Por nombres de su predicador',
  [OfferingIncomeSearchByFamilyGroup.OfferingByPreacherLastNames]: 'Por apellidos de su predicador',
  [OfferingIncomeSearchByFamilyGroup.OfferingByPreacherFullName]: 'Por nombres y apellidos de su predicador',
}

//* Offering (Fasting General, Vigil General)
export enum OfferingIncomeSearchByFastingAndVigilGeneral {
  OfferingByDate = 'offering_by_date',
  OfferingByChurch = 'offering_by_church',
  OfferingByChurchDate = 'offering_by_church_date',
}

export const OfferingIncomeSearchNamesByFastingAndVigilGeneral: Record<OfferingIncomeSearchByFastingAndVigilGeneral, string> =  {
  [OfferingIncomeSearchByFastingAndVigilGeneral.OfferingByDate]: 'Por fecha',
  [OfferingIncomeSearchByFastingAndVigilGeneral.OfferingByChurch]: 'Por iglesia',
  [OfferingIncomeSearchByFastingAndVigilGeneral.OfferingByChurchDate]: 'Por fecha e iglesia',
}

//* Offering (Fasting Zonal, Vigil Zonal)
export enum OfferingIncomeSearchByFastingAndVigilZonal{
  OfferingByDate = 'offering_by_date',
  OfferingByZone = 'offering_by_zone', 
  OfferingByZoneDate = 'offering_by_zone_date',
  OfferingBySupervisorNames = 'offering_by_supervisor_names',
  OfferingBySupervisorLastNames = 'offering_by_supervisor_last_names',
  OfferingBySupervisorFullName = 'offering_by_supervisor_full_name',
}

export const OfferingIncomeSearchNamesByFastingAndVigilZonal: Record<OfferingIncomeSearchByFastingAndVigilZonal, string> =  {
  [OfferingIncomeSearchSubType.OfferingByDate]: 'Por fecha',
  [OfferingIncomeSearchSubType.OfferingByZone]: 'Por zona',
  [OfferingIncomeSearchSubType.OfferingByZoneDate]: 'Por zona y fecha',
  [OfferingIncomeSearchSubType.OfferingBySupervisorNames]: 'Por nombres de su supervisor',
  [OfferingIncomeSearchSubType.OfferingBySupervisorLastNames]: 'Por apellidos de su supervisor',
  [OfferingIncomeSearchSubType.OfferingBySupervisorFullName]: 'Por nombres y apellidos de su supervisor',
}

//* Offering (Young Worship)
export enum OfferingIncomeSearchByYoungWorship {
  OfferingByDate = 'offering_by_date',
  OfferingByChurch = 'offering_by_church',
  OfferingByChurchDate = 'offering_by_church_date',
}

export const OfferingIncomeSearchByYoungWorshipNames: Record<OfferingIncomeSearchByYoungWorship, string> =  {
  [OfferingIncomeSearchByYoungWorship.OfferingByDate]: 'Por fecha',
  [OfferingIncomeSearchByYoungWorship.OfferingByChurch]: 'Por iglesia',
  [OfferingIncomeSearchByYoungWorship.OfferingByChurchDate]: 'Por fecha e iglesia',
}

//* Offering (Worship United)
export enum OfferingIncomeSearchByUnitedWorship {
  OfferingByDate = 'offering_by_date',
  OfferingByChurch = 'offering_by_church',
  OfferingByChurchDate = 'offering_by_church_date',
}

export const OfferingIncomeSearchByUnitedWorshipNames: Record<OfferingIncomeSearchByUnitedWorship, string> =  {
  [OfferingIncomeSearchByUnitedWorship.OfferingByDate]: 'Por fecha',
  [OfferingIncomeSearchByUnitedWorship.OfferingByChurch]: 'Por iglesia',
  [OfferingIncomeSearchByUnitedWorship.OfferingByChurchDate]: 'Por fecha e iglesia',
}

//* Offering (Income Adjustment)
export enum OfferingIncomeSearchByActivities{
  OfferingByDate = 'offering_by_date',
  OfferingByChurch = 'offering_by_church',
  OfferingByChurchDate = 'offering_by_church_date',
}

export const OfferingIncomeSearchByActivitiesNames: Record<OfferingIncomeSearchByActivities, string> =  {
  [OfferingIncomeSearchByActivities.OfferingByDate]: 'Por fecha',
  [OfferingIncomeSearchByActivities.OfferingByChurch]: 'Por iglesia',
  [OfferingIncomeSearchByActivities.OfferingByChurchDate]: 'Por fecha e iglesia',
}

//* Offering (Activities)
export enum OfferingIncomeSearchByIncomeAdjustment {
  OfferingByDate = 'offering_by_date',
  OfferingByChurch = 'offering_by_church',
  OfferingByChurchDate = 'offering_by_church_date',
}

export const OfferingIncomeSearchByIncomeAdjustmentNames: Record<OfferingIncomeSearchByIncomeAdjustment, string> =  {
  [OfferingIncomeSearchByIncomeAdjustment.OfferingByDate]: 'Por fecha',
  [OfferingIncomeSearchByIncomeAdjustment.OfferingByChurch]: 'Por iglesia',
  [OfferingIncomeSearchByIncomeAdjustment.OfferingByChurchDate]: 'Por fecha e iglesia',
}

//* Offering (Ground Church, Special)
export enum OfferingIncomeSearchByGroundChurchAndSpecial {
  OfferingByDate = 'offering_by_date',
  OfferingByContributorNames = 'offering_by_contributor_names',
  OfferingByContributorLastNames = 'offering_by_contributor_last_names',
  OfferingByContributorFullName = 'offering_by_contributor_full_name',
}

export const OfferingIncomeSearchByGroundChurchAndSpecialNames: Record<OfferingIncomeSearchByGroundChurchAndSpecial, string> =  {
  [OfferingIncomeSearchByGroundChurchAndSpecial.OfferingByDate]: 'Por fecha',
  [OfferingIncomeSearchByGroundChurchAndSpecial.OfferingByContributorNames]: 'Por nombres del aportante',
  [OfferingIncomeSearchByGroundChurchAndSpecial.OfferingByContributorLastNames]: 'Por apellidos del aportante',
  [OfferingIncomeSearchByGroundChurchAndSpecial.OfferingByContributorFullName]: 'Por nombres y apellidos del aportante',
}

