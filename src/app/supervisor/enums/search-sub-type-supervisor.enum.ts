export enum SearchSubTypeSupervisor {
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

export const SearchSubTypeSupervisorKeys: Record<SearchSubTypeSupervisor, string> =  {
  supervisor_by_pastor_names: 'Por nombres de su pastor',
  supervisor_by_pastor_last_names: 'Por apellidos de su pastor',
  supervisor_by_pastor_full_name: 'Por nombres y apellidos de su pastor',
  supervisor_by_copastor_names: 'Por nombres de su co-pastor',
  supervisor_by_copastor_last_names: 'Por apellidos de su co-pastor',
  supervisor_by_copastor_full_name: 'Por nombres y apellidos de su co-pastor',
  by_supervisor_names: 'Por sus nombres',
  by_supervisor_last_names: 'Por sus apellidos',
  by_supervisor_full_name: 'Por sus nombres y apellidos',
}

//* FirstName
export enum SearchByFirstNamesSupervisor {
  SupervisorByPastorNames = 'supervisor_by_pastor_names',
  SupervisorByCopastorNames = 'supervisor_by_copastor_names',
  BySupervisorNames = 'by_supervisor_names',
}

export const SearchByFirstNamesSupervisorKeys: Record<SearchByFirstNamesSupervisor, string> =  {
  supervisor_by_pastor_names: 'Por nombres de su pastor',
  supervisor_by_copastor_names: 'Por nombres de su co-pastor',
  by_supervisor_names: 'Por sus nombres',
}

//* LastName
export enum SearchByLastNamesSupervisor {
  SupervisorByPastorLastNames = 'supervisor_by_pastor_last_names',
  SupervisorByCopastorLastNames = 'supervisor_by_copastor_last_names',
  BySupervisorLastNames = 'by_supervisor_last_names',
}

export const SearchByLastNamesSupervisorKeys: Record<SearchByLastNamesSupervisor, string> =  {
  supervisor_by_pastor_last_names: 'Por apellidos de su pastor',
  supervisor_by_copastor_last_names: 'Por apellidos de su co-pastor',
  by_supervisor_last_names: 'Por sus apellidos',
}

//* Full Name
export enum SearchByFullNamesSupervisor {
  SupervisorByPastorFullName = 'supervisor_by_pastor_full_name',
  SupervisorByCopastorFullName = 'supervisor_by_copastor_full_name',
  BySupervisorFullName = 'by_supervisor_full_name',
}

export const SearchByFullNamesSupervisorKeys: Record<SearchByFullNamesSupervisor, string> =  {
  supervisor_by_pastor_full_name: 'Por nombres y apellidos de su pastor',
  supervisor_by_copastor_full_name: 'Por nombres y apellidos de su co-pastor',
  by_supervisor_full_name: 'Por sus nombres y apellidos',
}

