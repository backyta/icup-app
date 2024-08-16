export enum DiscipleSearchSubType {
  DiscipleByPastorNames = 'disciple_by_pastor_names',
  DiscipleByPastorLastNames = 'disciple_by_pastor_last_names',
  DiscipleByPastorFullName = 'disciple_by_pastor_full_name',
  DiscipleByCopastorNames = 'disciple_by_copastor_names',
  DiscipleByCopastorLastNames = 'disciple_by_copastor_last_names',
  DiscipleByCopastorFullName = 'disciple_by_copastor_full_name',
  DiscipleBySupervisorNames = 'disciple_by_supervisor_names',
  DiscipleBySupervisorLastNames = 'disciple_by_supervisor_last_names',
  DiscipleBySupervisorFullName = 'disciple_by_supervisor_full_name',
  DiscipleByPreacherNames = 'disciple_by_preacher_names',
  DiscipleByPreacherLastNames = 'disciple_by_preacher_last_names',
  DiscipleByPreacherFullName = 'disciple_by_preacher_full_name',
  ByDiscipleNames = 'by_disciple_names',
  ByDiscipleLastNames = 'by_disciple_last_names',
  ByDiscipleFullName = 'by_disciple_full_name',
}

export const DiscipleSearchSubTypeNames: Record<DiscipleSearchSubType, string> =  {
  [DiscipleSearchSubType.DiscipleByPastorNames]: 'Por nombres de su pastor',
  [DiscipleSearchSubType.DiscipleByPastorLastNames]: 'Por apellidos de su pastor',
  [DiscipleSearchSubType.DiscipleByPastorFullName]: 'Por nombres y apellidos de su pastor',
  [DiscipleSearchSubType.DiscipleByCopastorNames]: 'Por nombres de su co-pastor',
  [DiscipleSearchSubType.DiscipleByCopastorLastNames]: 'Por apellidos de su co-pastor',
  [DiscipleSearchSubType.DiscipleByCopastorFullName]: 'Por nombres y apellidos de su co-pastor',
  [DiscipleSearchSubType.DiscipleBySupervisorNames]: 'Por nombres de su supervisor',
  [DiscipleSearchSubType.DiscipleBySupervisorLastNames]: 'Por apellidos de su supervisor',
  [DiscipleSearchSubType.DiscipleBySupervisorFullName]: 'Por nombres y apellidos de su supervisor',
  [DiscipleSearchSubType.DiscipleByPreacherNames]: 'Por nombres de su predicador',
  [DiscipleSearchSubType.DiscipleByPreacherLastNames]: 'Por apellidos de su predicador',
  [DiscipleSearchSubType.DiscipleByPreacherFullName]: 'Por nombres y apellidos de su predicador',
  [DiscipleSearchSubType.ByDiscipleNames]: 'Por sus nombres',
  [DiscipleSearchSubType.ByDiscipleLastNames]: 'Por sus apellidos',
  [DiscipleSearchSubType.ByDiscipleFullName]: 'Por sus nombres y apellidos',
}

//* FirstName
export enum DiscipleSearchByFirstNames {
  DiscipleByPastorNames = 'disciple_by_pastor_names',
  DiscipleByCopastorNames = 'disciple_by_copastor_names',
  DiscipleBySupervisorNames = 'disciple_by_supervisor_names',
  DiscipleByPreacherNames = 'disciple_by_preacher_names',
  ByDiscipleNames = 'by_disciple_names',
}

export const DiscipleSearchNamesByFirstNames: Record<DiscipleSearchByFirstNames, string> =  {
  [DiscipleSearchByFirstNames.DiscipleByPastorNames]: 'Por nombres de su pastor',
  [DiscipleSearchByFirstNames.DiscipleByCopastorNames]: 'Por nombres de su co-pastor',
  [DiscipleSearchByFirstNames.DiscipleBySupervisorNames]: 'Por nombres de su supervisor',
  [DiscipleSearchByFirstNames.DiscipleByPreacherNames]: 'Por nombres de su predicador',
  [DiscipleSearchByFirstNames.ByDiscipleNames]: 'Por sus nombres',
}

//* LastName
export enum DiscipleSearchByLastNames {
  DiscipleByPastorLastNames = 'disciple_by_pastor_last_names',
  DiscipleByCopastorLastNames = 'disciple_by_copastor_last_names',
  DiscipleBySupervisorLastNames = 'disciple_by_supervisor_last_names',
  DiscipleByPreacherLastNames = 'disciple_by_preacher_last_names',
  ByDiscipleLastNames = 'by_disciple_last_names',
}

export const DiscipleSearchNamesByLastNames: Record<DiscipleSearchByLastNames, string> =  {
  [DiscipleSearchByLastNames.DiscipleByPastorLastNames]: 'Por apellidos de su pastor',
  [DiscipleSearchByLastNames.DiscipleByCopastorLastNames]: 'Por apellidos de su co-pastor',
  [DiscipleSearchByLastNames.DiscipleBySupervisorLastNames]: 'Por apellidos de su supervisor',
  [DiscipleSearchByLastNames.DiscipleByPreacherLastNames]: 'Por apellidos de su predicador',
  [DiscipleSearchByLastNames.ByDiscipleLastNames]: 'Por sus apellidos',
}

//* Full Name
export enum DiscipleSearchByFullNames {
  DiscipleByPastorFullName = 'disciple_by_pastor_full_name',
  DiscipleByCopastorFullName = 'disciple_by_copastor_full_name',
  DiscipleBySupervisorFullName = 'disciple_by_supervisor_full_name',
  DiscipleByPreacherFullName = 'disciple_by_preacher_full_name',
  ByDiscipleFullName = 'by_disciple_full_name',
}

export const DiscipleSearchNamesByFullNames: Record<DiscipleSearchByFullNames, string> =  {
  [DiscipleSearchByFullNames.DiscipleByPastorFullName]: 'Por nombres y apellidos de su pastor',
  [DiscipleSearchByFullNames.DiscipleByCopastorFullName]: 'Por nombres y apellidos de su co-pastor',
  [DiscipleSearchByFullNames.DiscipleBySupervisorFullName]: 'Por nombres y apellidos de su supervisor',
  [DiscipleSearchByFullNames.DiscipleByPreacherFullName]: 'Por nombres y apellidos de su predicador',
  [DiscipleSearchByFullNames.ByDiscipleFullName]: 'Por sus nombres y apellidos',
}

