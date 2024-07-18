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
export enum PreacherSearchByFirstNames {
  PreacherByPastorNames = 'preacher_by_pastor_names',
  PreacherByCopastorNames = 'preacher_by_copastor_names',
  PreacherBySupervisorNames = 'preacher_by_supervisor_names',
  ByPreacherNames = 'by_preacher_names',
}

export const PreacherSearchNamesByFirstNames: Record<PreacherSearchByFirstNames, string> =  {
  [PreacherSearchByFirstNames.PreacherByPastorNames]: 'Por nombres de su pastor',
  [PreacherSearchByFirstNames.PreacherByCopastorNames]: 'Por nombres de su co-pastor',
  [PreacherSearchByFirstNames.PreacherBySupervisorNames]: 'Por nombres de su supervisor',
  [PreacherSearchByFirstNames.ByPreacherNames]: 'Por sus nombres',
}

//* LastName
export enum PreacherSearchByLastNames {
  PreacherByPastorLastNames = 'preacher_by_pastor_last_names',
  PreacherByCopastorLastNames = 'preacher_by_copastor_last_names',
  PreacherBySupervisorLastNames = 'preacher_by_supervisor_last_names',
  ByPreacherLastNames = 'by_preacher_last_names',
}

export const PreacherSearchNamesByLastNames: Record<PreacherSearchByLastNames, string> =  {
  [PreacherSearchByLastNames.PreacherByPastorLastNames]: 'Por apellidos de su pastor',
  [PreacherSearchByLastNames.PreacherByCopastorLastNames]: 'Por apellidos de su co-pastor',
  [PreacherSearchByLastNames.PreacherBySupervisorLastNames]: 'Por apellidos de su supervisor',
  [PreacherSearchByLastNames.ByPreacherLastNames]: 'Por sus apellidos',
}

//* Full Name
export enum PreacherSearchByFullNames {
  PreacherByPastorFullName = 'preacher_by_pastor_full_name',
  PreacherByCopastorFullName = 'preacher_by_copastor_full_name',
  PreacherBySupervisorFullName = 'preacher_by_supervisor_full_name',
  ByPreacherFullName = 'by_preacher_full_name',
}

export const PreacherSearchNamesByFullNames: Record<PreacherSearchByFullNames, string> =  {
  [PreacherSearchByFullNames.PreacherByPastorFullName]: 'Por nombres y apellidos de su pastor',
  [PreacherSearchByFullNames.PreacherByCopastorFullName]: 'Por nombres y apellidos de su co-pastor',
  [PreacherSearchByFullNames.PreacherBySupervisorFullName]: 'Por nombres y apellidos de su supervisor',
  [PreacherSearchByFullNames.ByPreacherFullName]: 'Por sus nombres y apellidos',
}

