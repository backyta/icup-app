export enum SearchSubTypeCopastor {
  CopastorByPastorNames = 'copastor_by_pastor_names',
  CopastorByPastorLastNames = 'copastor_by_pastor_last_names',
  CopastorByPastorFullName = 'copastor_by_pastor_full_name',
  ByCopastorNames = 'by_copastor_names',
  ByCopastorLastNames = 'by_copastor_last_names',
  ByCopastorFullName = 'by_copastor_full_name',
}

export const SearchSubTypeCopastorKeys: Record<SearchSubTypeCopastor, string> =  {
  copastor_by_pastor_names : 'Por nombres de su pastor',
  copastor_by_pastor_last_names : 'Por apellidos de su pastor',
  copastor_by_pastor_full_name : 'Por nombres y apellidos de su pastor',
  by_copastor_names : 'Por sus nombres',
  by_copastor_last_names : 'Por sus apellidos',
  by_copastor_full_name : 'Por sus nombres y apellidos',
}

//* FirstName
export enum SearchByFirstNamesCopastor {
  CopastorByPastorNames = 'copastor_by_pastor_names',
  ByCopastorNames = 'by_copastor_names',
}

export const SearchByFirstNamesCopastorKeys: Record<SearchByFirstNamesCopastor, string> =  {
  copastor_by_pastor_names : 'Por nombres de su pastor',
  by_copastor_names : 'Por sus nombres',
}

//* LastName
export enum SearchByLastNamesCopastor {
  CopastorByPastorLastNames = 'copastor_by_pastor_last_names',
  ByCopastorLastNames = 'by_copastor_last_names',
}

export const SearchByLastNamesCopastorKeys: Record<SearchByLastNamesCopastor, string> =  {
  copastor_by_pastor_last_names : 'Por apellidos de su pastor',
  by_copastor_last_names : 'Por sus apellidos',
}

//* Full Name
export enum SearchByFullNamesCopastor {
  CopastorByPastorFullName = 'copastor_by_pastor_full_name',
  ByCopastorFullName = 'by_copastor_full_name',
}

export const SearchByFullNamesCopastorKeys: Record<SearchByFullNamesCopastor, string> =  {
  copastor_by_pastor_full_name : 'Por nombres y apellidos de su pastor',
  by_copastor_full_name : 'Por sus nombres y apellidos',
}

