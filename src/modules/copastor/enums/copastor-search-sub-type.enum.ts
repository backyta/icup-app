export enum CopastorSearchSubType {
  CopastorByPastorNames = 'copastor_by_pastor_names',
  CopastorByPastorLastNames = 'copastor_by_pastor_last_names',
  CopastorByPastorFullName = 'copastor_by_pastor_full_name',
  ByCopastorNames = 'by_copastor_names',
  ByCopastorLastNames = 'by_copastor_last_names',
  ByCopastorFullName = 'by_copastor_full_name',
}

export const CopastorSearchSubTypeNames: Record<CopastorSearchSubType, string> = {
  [CopastorSearchSubType.CopastorByPastorNames]: 'Por nombres de su pastor',
  [CopastorSearchSubType.CopastorByPastorLastNames]: 'Por apellidos de su pastor',
  [CopastorSearchSubType.CopastorByPastorFullName]: 'Por nombres y apellidos de su pastor',
  [CopastorSearchSubType.ByCopastorNames]: 'Por sus nombres',
  [CopastorSearchSubType.ByCopastorLastNames]: 'Por sus apellidos',
  [CopastorSearchSubType.ByCopastorFullName]: 'Por sus nombres y apellidos',
};


//* FirstName
export enum SubTypeCopastorSearchByFirstNames {
  CopastorByPastorNames = 'copastor_by_pastor_names',
  ByCopastorNames = 'by_copastor_names',
}

export const SubTypeNamesCopastorSearchByFirstNames: Record<SubTypeCopastorSearchByFirstNames, string> =  {
  [SubTypeCopastorSearchByFirstNames.CopastorByPastorNames]: 'Por nombres de su pastor',
  [SubTypeCopastorSearchByFirstNames.ByCopastorNames]: 'Por sus nombres',
}

//* LastName
export enum SubTypeCopastorSearchByLastNames {
  CopastorByPastorLastNames = 'copastor_by_pastor_last_names',
  ByCopastorLastNames = 'by_copastor_last_names',
}

export const SubTypeNamesCopastorSearchByLastNames: Record<SubTypeCopastorSearchByLastNames, string> =  {
  [SubTypeCopastorSearchByLastNames.CopastorByPastorLastNames]: 'Por apellidos de su pastor',
  [SubTypeCopastorSearchByLastNames.ByCopastorLastNames]: 'Por sus apellidos',
}

//* Full Name
export enum SubTypeCopastorSearchByFullNames {
  CopastorByPastorFullName = 'copastor_by_pastor_full_name',
  ByCopastorFullName = 'by_copastor_full_name',
}

export const SubTypeNamesCopastorSearchByFullNames: Record<SubTypeCopastorSearchByFullNames, string> =  {
  [SubTypeCopastorSearchByFullNames.CopastorByPastorFullName]: 'Por nombres y apellidos de su pastor',
  [SubTypeCopastorSearchByFullNames.ByCopastorFullName]: 'Por sus nombres y apellidos',
}

