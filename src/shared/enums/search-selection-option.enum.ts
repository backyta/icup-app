export enum SearchSelectionOption {

  // TODO : Date (pasar el numero de mes pa buscar en DB)
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

  //* isActive
  Active = 'active',
  Inactive = 'inactive',

  //* Turn
  Day = 'day',
  Afternoon = 'afternoon'

}

export const SearchSelectionOptionNames: Record<SearchSelectionOption, string> =  {

  'male': 'Masculino',
  'female': 'Femenino',

  'single' : 'Soltero(a)',
  'married' : 'Casado(a)',
  'widowed' : 'Viudo(a)',
  'divorced' : 'Divorciado(a)',
  'other' : 'Otro',

  'active' : 'Activo',
  'inactive' : 'Inactivo',

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

  'day' : 'Dia',
  'afternoon' : 'Tarde'
}