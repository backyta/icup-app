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
export enum CopastorSearchByFirstNames {
  CopastorByPastorNames = 'copastor_by_pastor_names',
  ByCopastorNames = 'by_copastor_names',
}

export const CopastorSearchNamesByFirstNames: Record<CopastorSearchByFirstNames, string> =  {
  [CopastorSearchByFirstNames.CopastorByPastorNames]: 'Por nombres de su pastor',
  [CopastorSearchByFirstNames.ByCopastorNames]: 'Por sus nombres',
}

//* LastName
export enum CopastorSearchByLastNames {
  CopastorByPastorLastNames = 'copastor_by_pastor_last_names',
  ByCopastorLastNames = 'by_copastor_last_names',
}

export const CopastorSearchNamesByLastNames: Record<CopastorSearchByLastNames, string> =  {
  [CopastorSearchByLastNames.CopastorByPastorLastNames]: 'Por apellidos de su pastor',
  [CopastorSearchByLastNames.ByCopastorLastNames]: 'Por sus apellidos',
}

//* Full Name
export enum CopastorSearchByFullNames {
  CopastorByPastorFullName = 'copastor_by_pastor_full_name',
  ByCopastorFullName = 'by_copastor_full_name',
}

export const CopastorSearchNamesByFullNames: Record<CopastorSearchByFullNames, string> =  {
  [CopastorSearchByFullNames.CopastorByPastorFullName]: 'Por nombres y apellidos de su pastor',
  [CopastorSearchByFullNames.ByCopastorFullName]: 'Por sus nombres y apellidos',
}

