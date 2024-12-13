export enum PreacherSearchSubType {
  PreacherByPastorFirstNames = 'preacher_by_pastor_first_names',
  PreacherByPastorLastNames = 'preacher_by_pastor_last_names',
  PreacherByPastorFullNames = 'preacher_by_pastor_full_names',
  PreacherByCopastorFirstNames = 'preacher_by_copastor_first_names',
  PreacherByCopastorLastNames = 'preacher_by_copastor_last_names',
  PreacherByCopastorFullNames = 'preacher_by_copastor_full_names',
  PreacherBySupervisorFirstNames = 'preacher_by_supervisor_first_names',
  PreacherBySupervisorLastNames = 'preacher_by_supervisor_last_names',
  PreacherBySupervisorFullNames = 'preacher_by_supervisor_full_names',
  ByPreacherFirstNames = 'by_preacher_first_names',
  ByPreacherLastNames = 'by_preacher_last_names',
  ByPreacherFullNames = 'by_preacher_full_names',
}

export const PreacherSearchSubTypeNames: Record<PreacherSearchSubType, string> =  {
  [PreacherSearchSubType.PreacherByPastorFirstNames]: 'Por nombres de su pastor',
  [PreacherSearchSubType.PreacherByPastorLastNames]: 'Por apellidos de su pastor',
  [PreacherSearchSubType.PreacherByPastorFullNames]: 'Por nombres y apellidos de su pastor',
  [PreacherSearchSubType.PreacherByCopastorFirstNames]: 'Por nombres de su co-pastor',
  [PreacherSearchSubType.PreacherByCopastorLastNames]: 'Por apellidos de su co-pastor',
  [PreacherSearchSubType.PreacherByCopastorFullNames]: 'Por nombres y apellidos de su co-pastor',
  [PreacherSearchSubType.PreacherBySupervisorFirstNames]: 'Por nombres de su supervisor',
  [PreacherSearchSubType.PreacherBySupervisorLastNames]: 'Por apellidos de su supervisor',
  [PreacherSearchSubType.PreacherBySupervisorFullNames]: 'Por nombres y apellidos de su supervisor',
  [PreacherSearchSubType.ByPreacherFirstNames]: 'Por sus nombres',
  [PreacherSearchSubType.ByPreacherLastNames]: 'Por sus apellidos',
  [PreacherSearchSubType.ByPreacherFullNames]: 'Por sus nombres y apellidos',
}


//* FirstNames
export enum SubTypePreacherSearchByFirstNames {
  PreacherByPastorFirstNames = 'preacher_by_pastor_first_names',
  PreacherByCopastorFirstNames = 'preacher_by_copastor_first_names',
  PreacherBySupervisorFirstNames = 'preacher_by_supervisor_first_names',
  ByPreacherFirstNames = 'by_preacher_first_names',
}

export const SubTypeNamesPreacherSearchByFirstNames: Record<SubTypePreacherSearchByFirstNames, string> =  {
  [SubTypePreacherSearchByFirstNames.PreacherByPastorFirstNames]: 'Por nombres de su pastor',
  [SubTypePreacherSearchByFirstNames.PreacherByCopastorFirstNames]: 'Por nombres de su co-pastor',
  [SubTypePreacherSearchByFirstNames.PreacherBySupervisorFirstNames]: 'Por nombres de su supervisor',
  [SubTypePreacherSearchByFirstNames.ByPreacherFirstNames]: 'Por sus nombres',
}

//* LastNames
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
  PreacherByPastorFullNames = 'preacher_by_pastor_full_names',
  PreacherByCopastorFullNames = 'preacher_by_copastor_full_names',
  PreacherBySupervisorFullNames = 'preacher_by_supervisor_full_names',
  ByPreacherFullNames = 'by_preacher_full_names',
}

export const SubTypeNamesPreacherSearchByFullNames: Record<SubTypePreacherSearchByFullNames, string> =  {
  [SubTypePreacherSearchByFullNames.PreacherByPastorFullNames]: 'Por nombres y apellidos de su pastor',
  [SubTypePreacherSearchByFullNames.PreacherByCopastorFullNames]: 'Por nombres y apellidos de su co-pastor',
  [SubTypePreacherSearchByFullNames.PreacherBySupervisorFullNames]: 'Por nombres y apellidos de su supervisor',
  [SubTypePreacherSearchByFullNames.ByPreacherFullNames]: 'Por sus nombres y apellidos',
}

