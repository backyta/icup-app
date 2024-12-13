export enum SupervisorSearchSubType {
  SupervisorByPastorFirstNames = 'supervisor_by_pastor_first_names',
  SupervisorByPastorLastNames = 'supervisor_by_pastor_last_names',
  SupervisorByPastorFullNames = 'supervisor_by_pastor_full_names',
  SupervisorByCopastorFirstNames = 'supervisor_by_copastor_first_names',
  SupervisorByCopastorLastNames = 'supervisor_by_copastor_last_names',
  SupervisorByCopastorFullNames = 'supervisor_by_copastor_full_names',
  BySupervisorFirstNames = 'by_supervisor_first_names',
  BySupervisorLastNames = 'by_supervisor_last_names',
  BySupervisorFullNames = 'by_supervisor_full_names',
}

export const SupervisorSearchSubTypeNames: Record<SupervisorSearchSubType, string> =  {
  [SupervisorSearchSubType.SupervisorByPastorFirstNames]: 'Por nombres de su pastor',
  [SupervisorSearchSubType.SupervisorByPastorLastNames]: 'Por apellidos de su pastor',
  [SupervisorSearchSubType.SupervisorByPastorFullNames]: 'Por nombres y apellidos de su pastor',
  [SupervisorSearchSubType.SupervisorByCopastorFirstNames]: 'Por nombres de su co-pastor',
  [SupervisorSearchSubType.SupervisorByCopastorLastNames]: 'Por apellidos de su co-pastor',
  [SupervisorSearchSubType.SupervisorByCopastorFullNames]: 'Por nombres y apellidos de su co-pastor',
  [SupervisorSearchSubType.BySupervisorFirstNames]: 'Por sus nombres',
  [SupervisorSearchSubType.BySupervisorLastNames]: 'Por sus apellidos',
  [SupervisorSearchSubType.BySupervisorFullNames]: 'Por sus nombres y apellidos',
}


//* FirstNames
export enum SubTypeSupervisorSearchByFirstNames {
  SupervisorByPastorFirstNames = 'supervisor_by_pastor_first_names',
  SupervisorByCopastorFirstNames = 'supervisor_by_copastor_first_names',
  BySupervisorFirstNames = 'by_supervisor_first_names',
}

export const SubTypeNamesSupervisorSearchByFirstNames: Record<SubTypeSupervisorSearchByFirstNames, string> =  {
  [SubTypeSupervisorSearchByFirstNames.SupervisorByPastorFirstNames]: 'Por nombres de su pastor',
  [SubTypeSupervisorSearchByFirstNames.SupervisorByCopastorFirstNames]: 'Por nombres de su co-pastor',
  [SubTypeSupervisorSearchByFirstNames.BySupervisorFirstNames]: 'Por sus nombres',
}

//* LastNames
export enum SubTypeSupervisorSearchByLastNames {
  SupervisorByPastorLastNames = 'supervisor_by_pastor_last_names',
  SupervisorByCopastorLastNames = 'supervisor_by_copastor_last_names',
  BySupervisorLastNames = 'by_supervisor_last_names',
}

export const SubTypeNamesSupervisorSearchByLastNames: Record<SubTypeSupervisorSearchByLastNames, string> =  {
  [SubTypeSupervisorSearchByLastNames.SupervisorByPastorLastNames]: 'Por apellidos de su pastor',
  [SubTypeSupervisorSearchByLastNames.SupervisorByCopastorLastNames]: 'Por apellidos de su co-pastor',
  [SubTypeSupervisorSearchByLastNames.BySupervisorLastNames]: 'Por sus apellidos',
}

//* Full Name
export enum SubTypeSupervisorSearchByFullNames {
  SupervisorByPastorFullNames = 'supervisor_by_pastor_full_names',
  SupervisorByCopastorFullNames = 'supervisor_by_copastor_full_names',
  BySupervisorFullNames = 'by_supervisor_full_names',
}

export const SubTypeNamesSupervisorSearchByFullNames: Record<SubTypeSupervisorSearchByFullNames, string> =  {
  [SubTypeSupervisorSearchByFullNames.SupervisorByPastorFullNames]: 'Por nombres y apellidos de su pastor',
  [SubTypeSupervisorSearchByFullNames.SupervisorByCopastorFullNames]: 'Por nombres y apellidos de su co-pastor',
  [SubTypeSupervisorSearchByFullNames.BySupervisorFullNames]: 'Por sus nombres y apellidos',
}

