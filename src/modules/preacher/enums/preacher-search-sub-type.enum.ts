export enum PreacherSearchSubType {
  PreacherByPastorNames = 'preacher_by_pastor_names',
  PreacherByPastorLastNames = 'preacher_by_pastor_last_names',
  PreacherByPastorFullName = 'preacher_by_pastor_full_name',
  PreacherByCopastorNames = 'preacher_by_copastor_names',
  PreacherByCopastorLastNames = 'preacher_by_copastor_last_names',
  PreacherByCopastorFullName = 'preacher_by_copastor_full_name',
  PreacherBySupervisorNames = 'preacher_by_supervisor_names',
  PreacherBySupervisorLastNames = 'preacher_by_supervisor_last_names',
  PreacherBySupervisorFullName = 'preacher_by_supervisor_full_name',
  ByPreacherNames = 'by_preacher_names',
  ByPreacherLastNames = 'by_preacher_last_names',
  ByPreacherFullName = 'by_preacher_full_name',
}

export const PreacherSearchSubTypeNames: Record<PreacherSearchSubType, string> =  {
  [PreacherSearchSubType.PreacherByPastorNames]: 'Por nombres de su pastor',
  [PreacherSearchSubType.PreacherByPastorLastNames]: 'Por apellidos de su pastor',
  [PreacherSearchSubType.PreacherByPastorFullName]: 'Por nombres y apellidos de su pastor',
  [PreacherSearchSubType.PreacherByCopastorNames]: 'Por nombres de su co-pastor',
  [PreacherSearchSubType.PreacherByCopastorLastNames]: 'Por apellidos de su co-pastor',
  [PreacherSearchSubType.PreacherByCopastorFullName]: 'Por nombres y apellidos de su co-pastor',
  [PreacherSearchSubType.PreacherBySupervisorNames]: 'Por nombres de su supervisor',
  [PreacherSearchSubType.PreacherBySupervisorLastNames]: 'Por apellidos de su supervisor',
  [PreacherSearchSubType.PreacherBySupervisorFullName]: 'Por nombres y apellidos de su supervisor',
  [PreacherSearchSubType.ByPreacherNames]: 'Por sus nombres',
  [PreacherSearchSubType.ByPreacherLastNames]: 'Por sus apellidos',
  [PreacherSearchSubType.ByPreacherFullName]: 'Por sus nombres y apellidos',
}


//* FirstName
export enum SubTypePreacherSearchByFirstNames {
  PreacherByPastorNames = 'preacher_by_pastor_names',
  PreacherByCopastorNames = 'preacher_by_copastor_names',
  PreacherBySupervisorNames = 'preacher_by_supervisor_names',
  ByPreacherNames = 'by_preacher_names',
}

export const SubTypeNamesPreacherSearchByFirstNames: Record<SubTypePreacherSearchByFirstNames, string> =  {
  [SubTypePreacherSearchByFirstNames.PreacherByPastorNames]: 'Por nombres de su pastor',
  [SubTypePreacherSearchByFirstNames.PreacherByCopastorNames]: 'Por nombres de su co-pastor',
  [SubTypePreacherSearchByFirstNames.PreacherBySupervisorNames]: 'Por nombres de su supervisor',
  [SubTypePreacherSearchByFirstNames.ByPreacherNames]: 'Por sus nombres',
}

//* LastName
export enum SubTypePreacherSearchByLastNames {
  PreacherByPastorLastNames = 'preacher_by_pastor_last_names',
  PreacherByCopastorLastNames = 'preacher_by_copastor_last_names',
  PreacherBySupervisorLastNames = 'preacher_by_supervisor_last_names',
  ByPreacherLastNames = 'by_preacher_last_names',
}

export const SubTypeNamesPreacherSearchByLastNames: Record<SubTypePreacherSearchByLastNames, string> =  {
  [SubTypePreacherSearchByLastNames.PreacherByPastorLastNames]: 'Por apellidos de su pastor',
  [SubTypePreacherSearchByLastNames.PreacherByCopastorLastNames]: 'Por apellidos de su co-pastor',
  [SubTypePreacherSearchByLastNames.PreacherBySupervisorLastNames]: 'Por apellidos de su supervisor',
  [SubTypePreacherSearchByLastNames.ByPreacherLastNames]: 'Por sus apellidos',
}

//* Full Name
export enum SubTypePreacherSearchByFullNames {
  PreacherByPastorFullName = 'preacher_by_pastor_full_name',
  PreacherByCopastorFullName = 'preacher_by_copastor_full_name',
  PreacherBySupervisorFullName = 'preacher_by_supervisor_full_name',
  ByPreacherFullName = 'by_preacher_full_name',
}

export const SubTypeNamesPreacherSearchByFullNames: Record<SubTypePreacherSearchByFullNames, string> =  {
  [SubTypePreacherSearchByFullNames.PreacherByPastorFullName]: 'Por nombres y apellidos de su pastor',
  [SubTypePreacherSearchByFullNames.PreacherByCopastorFullName]: 'Por nombres y apellidos de su co-pastor',
  [SubTypePreacherSearchByFullNames.PreacherBySupervisorFullName]: 'Por nombres y apellidos de su supervisor',
  [SubTypePreacherSearchByFullNames.ByPreacherFullName]: 'Por sus nombres y apellidos',
}

