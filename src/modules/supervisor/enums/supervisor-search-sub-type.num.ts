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
export enum SubTypeSupervisorSearchByFirstNames {
  SupervisorByPastorNames = 'supervisor_by_pastor_names',
  SupervisorByCopastorNames = 'supervisor_by_copastor_names',
  BySupervisorNames = 'by_supervisor_names',
}

export const SubTypeNamesSupervisorSearchByFirstNames: Record<SubTypeSupervisorSearchByFirstNames, string> =  {
  [SubTypeSupervisorSearchByFirstNames.SupervisorByPastorNames]: 'Por nombres de su pastor',
  [SubTypeSupervisorSearchByFirstNames.SupervisorByCopastorNames]: 'Por nombres de su co-pastor',
  [SubTypeSupervisorSearchByFirstNames.BySupervisorNames]: 'Por sus nombres',
}

//* LastName
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
  SupervisorByPastorFullName = 'supervisor_by_pastor_full_name',
  SupervisorByCopastorFullName = 'supervisor_by_copastor_full_name',
  BySupervisorFullName = 'by_supervisor_full_name',
}

export const SubTypeNamesSupervisorSearchByFullNames: Record<SubTypeSupervisorSearchByFullNames, string> =  {
  [SubTypeSupervisorSearchByFullNames.SupervisorByPastorFullName]: 'Por nombres y apellidos de su pastor',
  [SubTypeSupervisorSearchByFullNames.SupervisorByCopastorFullName]: 'Por nombres y apellidos de su co-pastor',
  [SubTypeSupervisorSearchByFullNames.BySupervisorFullName]: 'Por sus nombres y apellidos',
}

