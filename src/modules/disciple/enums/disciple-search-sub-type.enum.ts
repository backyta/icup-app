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

//* FirstNames
export enum SubTypeDiscipleSearchByFirstNames { 
  DiscipleByPastorNames = 'disciple_by_pastor_names',
  DiscipleByCopastorNames = 'disciple_by_copastor_names',
  DiscipleBySupervisorNames = 'disciple_by_supervisor_names',
  DiscipleByPreacherNames = 'disciple_by_preacher_names',
  ByDiscipleNames = 'by_disciple_names',
}

export const SubTypeNamesDiscipleSearchByFirstNames: Record<SubTypeDiscipleSearchByFirstNames, string> =  {
  [SubTypeDiscipleSearchByFirstNames.DiscipleByPastorNames]: 'Por nombres de su pastor',
  [SubTypeDiscipleSearchByFirstNames.DiscipleByCopastorNames]: 'Por nombres de su co-pastor',
  [SubTypeDiscipleSearchByFirstNames.DiscipleBySupervisorNames]: 'Por nombres de su supervisor',
  [SubTypeDiscipleSearchByFirstNames.DiscipleByPreacherNames]: 'Por nombres de su predicador',
  [SubTypeDiscipleSearchByFirstNames.ByDiscipleNames]: 'Por sus nombres',
}

//* LastName
export enum SubTypeDiscipleSearchByLastNames {
  DiscipleByPastorLastNames = 'disciple_by_pastor_last_names',
  DiscipleByCopastorLastNames = 'disciple_by_copastor_last_names',
  DiscipleBySupervisorLastNames = 'disciple_by_supervisor_last_names',
  DiscipleByPreacherLastNames = 'disciple_by_preacher_last_names',
  ByDiscipleLastNames = 'by_disciple_last_names',
}

export const SubTypeNamesDiscipleSearchByLastNames: Record<SubTypeDiscipleSearchByLastNames, string> =  {
  [SubTypeDiscipleSearchByLastNames.DiscipleByPastorLastNames]: 'Por apellidos de su pastor',
  [SubTypeDiscipleSearchByLastNames.DiscipleByCopastorLastNames]: 'Por apellidos de su co-pastor',
  [SubTypeDiscipleSearchByLastNames.DiscipleBySupervisorLastNames]: 'Por apellidos de su supervisor',
  [SubTypeDiscipleSearchByLastNames.DiscipleByPreacherLastNames]: 'Por apellidos de su predicador',
  [SubTypeDiscipleSearchByLastNames.ByDiscipleLastNames]: 'Por sus apellidos',
}

//* Full Name
export enum SubTypeDiscipleSearchByFullNames {
  DiscipleByPastorFullName = 'disciple_by_pastor_full_name',
  DiscipleByCopastorFullName = 'disciple_by_copastor_full_name',
  DiscipleBySupervisorFullName = 'disciple_by_supervisor_full_name',
  DiscipleByPreacherFullName = 'disciple_by_preacher_full_name',
  ByDiscipleFullName = 'by_disciple_full_name',
}

export const SubTypeNamesDiscipleSearchByFullNames: Record<SubTypeDiscipleSearchByFullNames, string> =  {
  [SubTypeDiscipleSearchByFullNames.DiscipleByPastorFullName]: 'Por nombres y apellidos de su pastor',
  [SubTypeDiscipleSearchByFullNames.DiscipleByCopastorFullName]: 'Por nombres y apellidos de su co-pastor',
  [SubTypeDiscipleSearchByFullNames.DiscipleBySupervisorFullName]: 'Por nombres y apellidos de su supervisor',
  [SubTypeDiscipleSearchByFullNames.DiscipleByPreacherFullName]: 'Por nombres y apellidos de su predicador',
  [SubTypeDiscipleSearchByFullNames.ByDiscipleFullName]: 'Por sus nombres y apellidos',
}

