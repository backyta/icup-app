export enum SupervisorSearchSubType {
  SupervisorByPastorNames = 'supervisor_by_pastor_names',
  SupervisorByPastorLastNames = 'supervisor_by_pastor_last_names',
  SupervisorByPastorFullName = 'supervisor_by_pastor_full_name',
  SupervisorByCopastorNames = 'supervisor_by_copastor_names',
  SupervisorByCopastorLastNames = 'supervisor_by_copastor_last_names',
  SupervisorByCopastorFullName = 'supervisor_by_copastor_full_name',
  BySupervisorNames = 'by_supervisor_names',
  BySupervisorLastNames = 'by_supervisor_last_names',
  BySupervisorFullName = 'by_supervisor_full_name',
}

export const SupervisorSearchSubTypeNames: Record<SupervisorSearchSubType, string> =  {
  [SupervisorSearchSubType.SupervisorByPastorNames]: 'Por nombres de su pastor',
  [SupervisorSearchSubType.SupervisorByPastorLastNames]: 'Por apellidos de su pastor',
  [SupervisorSearchSubType.SupervisorByPastorFullName]: 'Por nombres y apellidos de su pastor',
  [SupervisorSearchSubType.SupervisorByCopastorNames]: 'Por nombres de su co-pastor',
  [SupervisorSearchSubType.SupervisorByCopastorLastNames]: 'Por apellidos de su co-pastor',
  [SupervisorSearchSubType.SupervisorByCopastorFullName]: 'Por nombres y apellidos de su co-pastor',
  [SupervisorSearchSubType.BySupervisorNames]: 'Por sus nombres',
  [SupervisorSearchSubType.BySupervisorLastNames]: 'Por sus apellidos',
  [SupervisorSearchSubType.BySupervisorFullName]: 'Por sus nombres y apellidos',
}

//* FirstName
export enum SupervisorSearchByFirstNames {
  SupervisorByPastorNames = 'supervisor_by_pastor_names',
  SupervisorByCopastorNames = 'supervisor_by_copastor_names',
  BySupervisorNames = 'by_supervisor_names',
}

export const SupervisorSearchNamesByFirstNames: Record<SupervisorSearchByFirstNames, string> =  {
  [SupervisorSearchByFirstNames.SupervisorByPastorNames]: 'Por nombres de su pastor',
  [SupervisorSearchByFirstNames.SupervisorByCopastorNames]: 'Por nombres de su co-pastor',
  [SupervisorSearchByFirstNames.BySupervisorNames]: 'Por sus nombres',
}

//* LastName
export enum SupervisorSearchByLastNames {
  SupervisorByPastorLastNames = 'supervisor_by_pastor_last_names',
  SupervisorByCopastorLastNames = 'supervisor_by_copastor_last_names',
  BySupervisorLastNames = 'by_supervisor_last_names',
}

export const SupervisorSearchNamesByLastNames: Record<SupervisorSearchByLastNames, string> =  {
  [SupervisorSearchByLastNames.SupervisorByPastorLastNames]: 'Por apellidos de su pastor',
  [SupervisorSearchByLastNames.SupervisorByCopastorLastNames]: 'Por apellidos de su co-pastor',
  [SupervisorSearchByLastNames.BySupervisorLastNames]: 'Por sus apellidos',
}

//* Full Name
export enum SupervisorSearchByFullNames {
  SupervisorByPastorFullName = 'supervisor_by_pastor_full_name',
  SupervisorByCopastorFullName = 'supervisor_by_copastor_full_name',
  BySupervisorFullName = 'by_supervisor_full_name',
}

export const SupervisorSearchNamesByFullNames: Record<SupervisorSearchByFullNames, string> =  {
  [SupervisorSearchByFullNames.SupervisorByPastorFullName]: 'Por nombres y apellidos de su pastor',
  [SupervisorSearchByFullNames.SupervisorByCopastorFullName]: 'Por nombres y apellidos de su co-pastor',
  [SupervisorSearchByFullNames.BySupervisorFullName]: 'Por sus nombres y apellidos',
}

