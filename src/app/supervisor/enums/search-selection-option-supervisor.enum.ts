export enum SearchSelectionOptionSupervisor {
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

export const SearchSelectionOptionSupervisorKeys: Record<SearchSelectionOptionSupervisor, string> =  {
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
export enum SearchByBirthMonthSupervisor {
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

export const SearchByBirthMonthSupervisorKeys: Record<SearchByBirthMonthSupervisor, string> =  {
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
export enum SearchByGenderSupervisor {
  Male = 'male',
  Female = 'female',
}

export const SearchByGenderSupervisorKeys: Record<SearchByGenderSupervisor, string> =  {
  'male': 'Masculino',
  'female': 'Femenino',
}

//* Marital Status
export enum SearchByMaritalStatusSupervisor {
  Single = 'single',
  Married = 'married',
  Widowed = 'widowed',
  Divorced = 'divorced',
  Other = 'other',
}

export const SearchByMaritalStatusSupervisorKeys: Record<SearchByMaritalStatusSupervisor, string> =  {
  'single' : 'Soltero(a)',
  'married' : 'Casado(a)',
  'widowed' : 'Viudo(a)',
  'divorced' : 'Divorciado(a)',
  'other' : 'Otro',
}

//* Status
export enum SearchByStatusSupervisor {
  // Active = 'active',
  Inactive = 'inactive',
}

export const SearchByStatusSupervisorKeys: Record<SearchByStatusSupervisor, string> =  {
 // 'active' : 'Activo',
 'inactive' : 'Inactivo',
}