export enum TermSelectType {

  //* Date (pasar el numero de mes pa buscar en DB)
  january = 'january',
  february = 'february',
  march = 'march',
  april = 'april',
  may = 'may',
  june = 'june',
  july = 'july',
  august = 'august',
  september = 'september',
  october = 'october',
  november = 'november',
  december = 'december',

  //* Gender
  male = 'male',
  female = 'female',


  //* Marital Status
  single = 'single',
  married = 'married',
  widowed = 'widowed',
  divorced = 'divorced',
  other = 'other',

  //* isActive
  active = 'active',
  inactive = 'inactive',

}


export const TermSelectTypeNames: Record<TermSelectType, string> =  {
  
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
  
  'male': 'Hombre',
  'female': 'Mujer',

  'single' : 'Soltero(a)',
  'married' : 'Casado(a)',
  'widowed' : 'Viudo(a)',
  'divorced' : 'Divorciado(a)',
  'other' : 'Otro',

  'active' : 'Activo',
  'inactive' : 'Inactivo',

}