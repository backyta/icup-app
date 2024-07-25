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
export enum FamilyGroupSearchByFirstNames {
  FamilyGroupByPastorNames = 'family_group_by_pastor_names',
  FamilyGroupByCopastorNames = 'family_group_by_copastor_names',
  FamilyGroupBySupervisorNames = 'family_group_by_supervisor_names',
  FamilyGroupByPreacherNames = 'family_group_by_preacher_names',
}

export const FamilyGroupSearchNamesByFirstNames: Record<FamilyGroupSearchByFirstNames, string> =  {
  [FamilyGroupSearchByFirstNames.FamilyGroupByPastorNames]: 'Por nombres de su pastor',
  [FamilyGroupSearchByFirstNames.FamilyGroupByCopastorNames]: 'Por nombres de su co-pastor',
  [FamilyGroupSearchByFirstNames.FamilyGroupBySupervisorNames]: 'Por nombres de su supervisor',
  [FamilyGroupSearchByFirstNames.FamilyGroupByPreacherNames]: 'Por nombres de su predicador',
}

//* LastName
export enum FamilyGroupSearchByLastNames {
  FamilyGroupByPastorLastNames = 'family_group_by_pastor_last_names',
  FamilyGroupByCopastorLastNames = 'family_group_by_copastor_last_names',
  FamilyGroupBySupervisorLastNames = 'family_group_by_supervisor_last_names',
  FamilyGroupByPreacherLastNames = 'family_group_by_preacher_last_names',
}

export const FamilyGroupSearchNamesByLastNames: Record<FamilyGroupSearchByLastNames, string> =  {
  [FamilyGroupSearchByLastNames.FamilyGroupByPastorLastNames]: 'Por apellidos de su pastor',
  [FamilyGroupSearchByLastNames.FamilyGroupByCopastorLastNames]: 'Por apellidos de su co-pastor',
  [FamilyGroupSearchByLastNames.FamilyGroupBySupervisorLastNames]: 'Por apellidos de su supervisor',
  [FamilyGroupSearchByLastNames.FamilyGroupByPreacherLastNames]: 'Por apellidos de su predicador',
}

//* Full Name
export enum FamilyGroupSearchByFullNames {
  FamilyGroupByPastorFullName = 'family_group_by_pastor_full_name',
  FamilyGroupByCopastorFullName = 'family_group_by_copastor_full_name',
  FamilyGroupBySupervisorFullName = 'family_group_by_supervisor_full_name',
  FamilyGroupByPreacherFullName = 'family_group_by_preacher_full_name',
}

export const FamilyGroupSearchNamesByFullNames: Record<FamilyGroupSearchByFullNames, string> =  {
  [FamilyGroupSearchByFullNames.FamilyGroupByPastorFullName]: 'Por nombres y apellidos de su pastor',
  [FamilyGroupSearchByFullNames.FamilyGroupByCopastorFullName]: 'Por nombres y apellidos de su co-pastor',
  [FamilyGroupSearchByFullNames.FamilyGroupBySupervisorFullName]: 'Por nombres y apellidos de su supervisor',
  [FamilyGroupSearchByFullNames.FamilyGroupByPreacherFullName]: 'Por nombres y apellidos de su predicador',
}

