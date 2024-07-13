export enum SearchSubTypePreacher {
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

export const SearchSubTypePreacherKeys: Record<SearchSubTypePreacher, string> =  {
  preacher_by_pastor_names: 'Por nombres de su pastor',
  preacher_by_pastor_last_names: 'Por apellidos de su pastor',
  preacher_by_pastor_full_name: 'Por nombres y apellidos de su pastor',
  preacher_by_copastor_names: 'Por nombres de su co-pastor',
  preacher_by_copastor_last_names: 'Por apellidos de su co-pastor',
  preacher_by_copastor_full_name: 'Por nombres y apellidos de su co-pastor',
  preacher_by_supervisor_names: 'Por nombres de su supervisor',
  preacher_by_supervisor_last_names: 'Por apellidos de su supervisor',
  preacher_by_supervisor_full_name: 'Por nombres y apellidos de su supervisor',
  by_preacher_names: 'Por sus nombres',
  by_preacher_last_names: 'Por sus apellidos',
  by_preacher_full_name: 'Por sus nombres y apellidos',
}

//* FirstName
export enum SearchByFirstNamesPreacher {
  PreacherByPastorNames = 'preacher_by_pastor_names',
  PreacherByCopastorNames = 'preacher_by_copastor_names',
  PreacherBySupervisorNames = 'preacher_by_supervisor_names',
  ByPreacherNames = 'by_preacher_names',
}

export const SearchByFirstNamesPreacherKeys: Record<SearchByFirstNamesPreacher, string> =  {
  preacher_by_pastor_names: 'Por nombres de su pastor',
  preacher_by_copastor_names: 'Por nombres de su co-pastor',
  preacher_by_supervisor_names: 'Por nombres de su supervisor',
  by_preacher_names: 'Por sus nombres',
}

//* LastName
export enum SearchByLastNamesPreacher {
  PreacherByPastorLastNames = 'preacher_by_pastor_last_names',
  PreacherByCopastorLastNames = 'preacher_by_copastor_last_names',
  PreacherBySupervisorLastNames = 'preacher_by_supervisor_last_names',
  ByPreacherLastNames = 'by_preacher_last_names',
}

export const SearchByLastNamesPreacherKeys: Record<SearchByLastNamesPreacher, string> =  {
  preacher_by_pastor_last_names: 'Por apellidos de su pastor',
  preacher_by_copastor_last_names: 'Por apellidos de su co-pastor',
  preacher_by_supervisor_last_names: 'Por apellidos de su supervisor',
  by_preacher_last_names: 'Por sus apellidos',
}

//* Full Name
export enum SearchByFullNamesPreacher {
  PreacherByPastorFullName = 'preacher_by_pastor_full_name',
  PreacherByCopastorFullName = 'preacher_by_copastor_full_name',
  PreacherBySupervisorFullName = 'preacher_by_supervisor_full_name',
  ByPreacherFullName = 'by_preacher_full_name',
}

export const SearchByFullNamesPreacherKeys: Record<SearchByFullNamesPreacher, string> =  {
  preacher_by_pastor_full_name: 'Por nombres y apellidos de su pastor',
  preacher_by_copastor_full_name: 'Por nombres y apellidos de su co-pastor',
  preacher_by_supervisor_full_name: 'Por nombres y apellidos de su supervisor',
  by_preacher_full_name: 'Por sus nombres y apellidos',
}

