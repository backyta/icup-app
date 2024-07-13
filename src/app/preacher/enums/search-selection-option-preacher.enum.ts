export enum SearchSelectionOptionPreacher {
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

export const SearchSelectionOptionPreacherKeys: Record<SearchSelectionOptionPreacher, string> =  {
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
export enum SearchByBirthMonthPreacher {
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

export const SearchByBirthMonthPreacherKeys: Record<SearchByBirthMonthPreacher, string> =  {
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
export enum SearchByGenderPreacher {
  Male = 'male',
  Female = 'female',
}

export const SearchByGenderPreacherKeys: Record<SearchByGenderPreacher, string> =  {
  'male': 'Masculino',
  'female': 'Femenino',
}

//* Marital Status
export enum SearchByMaritalStatusPreacher {
  Single = 'single',
  Married = 'married',
  Widowed = 'widowed',
  Divorced = 'divorced',
  Other = 'other',
}

export const SearchByMaritalStatusPreacherKeys: Record<SearchByMaritalStatusPreacher, string> =  {
  'single' : 'Soltero(a)',
  'married' : 'Casado(a)',
  'widowed' : 'Viudo(a)',
  'divorced' : 'Divorciado(a)',
  'other' : 'Otro',
}

//* Status
export enum SearchByStatusPreacher {
  // Active = 'active',
  Inactive = 'inactive',
}

export const SearchByStatusPreacherKeys: Record<SearchByStatusPreacher, string> =  {
 // 'active' : 'Activo',
 'inactive' : 'Inactivo',
}