export enum SearchSelectOption {
  //* Month
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

  //* Record status
  Active = 'active',
  Inactive = 'inactive',

  //* Turn
  Day = 'day',
  Afternoon = 'afternoon'
}

export const SearchSelectOptionNames: Record<SearchSelectOption, string> = {
  //* Month
  [SearchSelectOption.Male]: 'Masculino',
  [SearchSelectOption.Female]: 'Femenino',

  //* Gender
  [SearchSelectOption.Single]: 'Soltero(a)',
  [SearchSelectOption.Married]: 'Casado(a)',
  [SearchSelectOption.Widowed]: 'Viudo(a)',
  [SearchSelectOption.Divorced]: 'Divorciado(a)',
  [SearchSelectOption.Other]: 'Otro',

  //* Marital Status
  [SearchSelectOption.Active]: 'Activo',
  [SearchSelectOption.Inactive]: 'Inactivo',

   //* Record status
  [SearchSelectOption.January]: 'Enero',
  [SearchSelectOption.February]: 'Febrero',
  [SearchSelectOption.March]: 'Marzo',
  [SearchSelectOption.April]: 'Abril',
  [SearchSelectOption.May]: 'Mayo',
  [SearchSelectOption.June]: 'Junio',
  [SearchSelectOption.July]: 'Julio',
  [SearchSelectOption.August]: 'Agosto',
  [SearchSelectOption.September]: 'Setiembre',
  [SearchSelectOption.October]: 'Octubre',
  [SearchSelectOption.November]: 'Noviembre',
  [SearchSelectOption.December]: 'Diciembre',

  //* Turn
  [SearchSelectOption.Day]: 'Dia',
  [SearchSelectOption.Afternoon]: 'Tarde',
};