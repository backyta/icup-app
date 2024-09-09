export enum FamilyGroupSearchSubType {
  FamilyGroupByPastorNames = 'family_group_by_pastor_names',
  FamilyGroupByPastorLastNames = 'family_group_by_pastor_last_names',
  FamilyGroupByPastorFullName = 'family_group_by_pastor_full_name',
  FamilyGroupByCopastorNames = 'family_group_by_copastor_names',
  FamilyGroupByCopastorLastNames = 'family_group_by_copastor_last_names',
  FamilyGroupByCopastorFullName = 'family_group_by_copastor_full_name',
  FamilyGroupBySupervisorNames = 'family_group_by_supervisor_names',
  FamilyGroupBySupervisorLastNames = 'family_group_by_supervisor_last_names',
  FamilyGroupBySupervisorFullName = 'family_group_by_supervisor_full_name',
  FamilyGroupByPreacherNames = 'family_group_by_preacher_names',
  FamilyGroupByPreacherLastNames = 'family_group_by_preacher_last_names',
  FamilyGroupByPreacherFullName = 'family_group_by_preacher_full_name',
}

export const FamilyGroupSearchSubTypeNames: Record<FamilyGroupSearchSubType, string> =  {
  [FamilyGroupSearchSubType.FamilyGroupByPastorNames]: 'Por nombres de su pastor',
  [FamilyGroupSearchSubType.FamilyGroupByPastorLastNames]: 'Por apellidos de su pastor',
  [FamilyGroupSearchSubType.FamilyGroupByPastorFullName]: 'Por nombres y apellidos de su pastor',
  [FamilyGroupSearchSubType.FamilyGroupByCopastorNames]: 'Por nombres de su co-pastor',
  [FamilyGroupSearchSubType.FamilyGroupByCopastorLastNames]: 'Por apellidos de su co-pastor',
  [FamilyGroupSearchSubType.FamilyGroupByCopastorFullName]: 'Por nombres y apellidos de su co-pastor',
  [FamilyGroupSearchSubType.FamilyGroupBySupervisorNames]: 'Por nombres de su supervisor',
  [FamilyGroupSearchSubType.FamilyGroupBySupervisorLastNames]: 'Por apellidos de su supervisor',
  [FamilyGroupSearchSubType.FamilyGroupBySupervisorFullName]: 'Por nombres y apellidos de su supervisor',
  [FamilyGroupSearchSubType.FamilyGroupByPreacherNames]: 'Por nombres de su predicador',
  [FamilyGroupSearchSubType.FamilyGroupByPreacherLastNames]: 'Por apellidos de su predicador',
  [FamilyGroupSearchSubType.FamilyGroupByPreacherFullName]: 'Por nombres y apellidos de su predicador',
}

//* FirstName
export enum SubTypeFamilyGroupSearchByFirstNames {
  FamilyGroupByPastorNames = 'family_group_by_pastor_names',
  FamilyGroupByCopastorNames = 'family_group_by_copastor_names',
  FamilyGroupBySupervisorNames = 'family_group_by_supervisor_names',
  FamilyGroupByPreacherNames = 'family_group_by_preacher_names',
}

export const SubTypeNamesFamilyGroupSearchByFirstNames: Record<SubTypeFamilyGroupSearchByFirstNames, string> =  {
  [SubTypeFamilyGroupSearchByFirstNames.FamilyGroupByPastorNames]: 'Por nombres de su pastor',
  [SubTypeFamilyGroupSearchByFirstNames.FamilyGroupByCopastorNames]: 'Por nombres de su co-pastor',
  [SubTypeFamilyGroupSearchByFirstNames.FamilyGroupBySupervisorNames]: 'Por nombres de su supervisor',
  [SubTypeFamilyGroupSearchByFirstNames.FamilyGroupByPreacherNames]: 'Por nombres de su predicador',
}

//* LastName
export enum SubTypeFamilyGroupSearchByLastNames {
  FamilyGroupByPastorLastNames = 'family_group_by_pastor_last_names',
  FamilyGroupByCopastorLastNames = 'family_group_by_copastor_last_names',
  FamilyGroupBySupervisorLastNames = 'family_group_by_supervisor_last_names',
  FamilyGroupByPreacherLastNames = 'family_group_by_preacher_last_names',
}

export const SubTypeNamesFamilyGroupSearchByLastNames: Record<SubTypeFamilyGroupSearchByLastNames, string> =  {
  [SubTypeFamilyGroupSearchByLastNames.FamilyGroupByPastorLastNames]: 'Por apellidos de su pastor',
  [SubTypeFamilyGroupSearchByLastNames.FamilyGroupByCopastorLastNames]: 'Por apellidos de su co-pastor',
  [SubTypeFamilyGroupSearchByLastNames.FamilyGroupBySupervisorLastNames]: 'Por apellidos de su supervisor',
  [SubTypeFamilyGroupSearchByLastNames.FamilyGroupByPreacherLastNames]: 'Por apellidos de su predicador',
}

//* Full Name
export enum SubTypeFamilyGroupSearchByFullNames {
  FamilyGroupByPastorFullName = 'family_group_by_pastor_full_name',
  FamilyGroupByCopastorFullName = 'family_group_by_copastor_full_name',
  FamilyGroupBySupervisorFullName = 'family_group_by_supervisor_full_name',
  FamilyGroupByPreacherFullName = 'family_group_by_preacher_full_name',
}

export const SubTypeNamesFamilyGroupSearchByFullNames: Record<SubTypeFamilyGroupSearchByFullNames, string> =  {
  [SubTypeFamilyGroupSearchByFullNames.FamilyGroupByPastorFullName]: 'Por nombres y apellidos de su pastor',
  [SubTypeFamilyGroupSearchByFullNames.FamilyGroupByCopastorFullName]: 'Por nombres y apellidos de su co-pastor',
  [SubTypeFamilyGroupSearchByFullNames.FamilyGroupBySupervisorFullName]: 'Por nombres y apellidos de su supervisor',
  [SubTypeFamilyGroupSearchByFullNames.FamilyGroupByPreacherFullName]: 'Por nombres y apellidos de su predicador',
}

