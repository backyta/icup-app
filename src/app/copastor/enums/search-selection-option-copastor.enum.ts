export enum SearchSelectionOptionCopastor {
  //* Month birth
  January = 'january',
  February = 'february',
  March = 'march',
  April = 'april',
  May = 'may',
  June = 'june',
  July = 'july',
  August = 'august',
  September = 'september',
  October = 'october',
  November = 'november',
  December = 'december',

  //* Gender
  Male = 'male',
  Female = 'female',

  //* Marital Status
  Single = 'single',
  Married = 'married',
  Widowed = 'widowed',
  Divorced = 'divorced',
  Other = 'other',

  //* Status
  // Active = 'active',
  Inactive = 'inactive',
}

export const SearchSelectionOptionCopastorKeys: Record<SearchSelectionOptionCopastor, string> =  {
  //* Month birth
  'january' : 'Enero',
  'february' : 'Febrero',
  'march' : 'Marzo',
  'april' : 'Abril',
  'may' : 'Mayo',
  'june' : 'Junio',
  'july' : 'Julio',
  'august' : 'Agosto',
  'september' : 'Setiembre',
  'october' : 'Octubre',
  'november' : 'Noviembre',
  'december' : 'Diciembre',

  //* Gender
  'male': 'Masculino',
  'female': 'Femenino',

  //* Marital Status
  'single' : 'Soltero(a)',
  'married' : 'Casado(a)',
  'widowed' : 'Viudo(a)',
  'divorced' : 'Divorciado(a)',
  'other' : 'Otro',

  //* Status
  // 'active' : 'Activo',
  'inactive' : 'Inactivo',
}

//* Month Birth
export enum SearchByBirthMonthCopastor {
  January = 'january',
  February = 'february',
  March = 'march',
  April = 'april',
  May = 'may',
  June = 'june',
  July = 'july',
  August = 'august',
  September = 'september',
  October = 'october',
  November = 'november',
  December = 'december',
}

export const SearchByBirthMonthCopastorKeys: Record<SearchByBirthMonthCopastor, string> =  {
  'january' : 'Enero',
  'february' : 'Febrero',
  'march' : 'Marzo',
  'april' : 'Abril',
  'may' : 'Mayo',
  'june' : 'Junio',
  'july' : 'Julio',
  'august' : 'Agosto',
  'september' : 'Setiembre',
  'october' : 'Octubre',
  'november' : 'Noviembre',
  'december' : 'Diciembre',
}

//* Gender
export enum SearchByGenderCopastor {
  Male = 'male',
  Female = 'female',
}

export const SearchByGenderCopastorKeys: Record<SearchByGenderCopastor, string> =  {
  'male': 'Masculino',
  'female': 'Femenino',
}

//* Marital Status
export enum SearchByMaritalStatusCopastor {
  Single = 'single',
  Married = 'married',
  Widowed = 'widowed',
  Divorced = 'divorced',
  Other = 'other',
}

export const SearchByMaritalStatusCopastorKeys: Record<SearchByMaritalStatusCopastor, string> =  {
  'single' : 'Soltero(a)',
  'married' : 'Casado(a)',
  'widowed' : 'Viudo(a)',
  'divorced' : 'Divorciado(a)',
  'other' : 'Otro',
}

//* Status
export enum SearchByStatusPastor {
  // Active = 'active',
  Inactive = 'inactive',
}

export const SearchByStatusCopastorKeys: Record<SearchByStatusPastor, string> =  {
 // 'active' : 'Activo',
 'inactive' : 'Inactivo',
}
