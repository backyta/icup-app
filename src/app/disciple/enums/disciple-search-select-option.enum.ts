export enum DiscipleSearchSelectOption {
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
  Inactive = 'inactive',
}

export const DiscipleSearchSelectOptionNames: Record<DiscipleSearchSelectOption, string> =  {
  //* Month birth
  [DiscipleSearchSelectOption.January]: 'Enero',
  [DiscipleSearchSelectOption.February]: 'Febrero',
  [DiscipleSearchSelectOption.March]: 'Marzo',
  [DiscipleSearchSelectOption.April]: 'Abril',
  [DiscipleSearchSelectOption.May]: 'Mayo',
  [DiscipleSearchSelectOption.June]: 'Junio',
  [DiscipleSearchSelectOption.July]: 'Julio',
  [DiscipleSearchSelectOption.August]: 'Agosto',
  [DiscipleSearchSelectOption.September]: 'Setiembre',
  [DiscipleSearchSelectOption.October]: 'Octubre',
  [DiscipleSearchSelectOption.November]: 'Noviembre',
  [DiscipleSearchSelectOption.December]: 'Diciembre',

  //* Gender
  [DiscipleSearchSelectOption.Male]: 'Masculino',
  [DiscipleSearchSelectOption.Female]: 'Femenino',

  //* Marital Status
  [DiscipleSearchSelectOption.Single]: 'Soltero(a)',
  [DiscipleSearchSelectOption.Married]: 'Casado(a)',
  [DiscipleSearchSelectOption.Widowed]: 'Viudo(a)',
  [DiscipleSearchSelectOption.Divorced]: 'Divorciado(a)',
  [DiscipleSearchSelectOption.Other]: 'Otro',

  //* Status
  [DiscipleSearchSelectOption.Inactive]: 'Inactivo',
}

//* Month Birth
export enum DiscipleSearchByBirthMonth {
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

export const DiscipleSearchNamesByBirthMonth: Record<DiscipleSearchByBirthMonth, string> =  {
  [DiscipleSearchByBirthMonth.January]: 'Enero',
  [DiscipleSearchByBirthMonth.February]: 'Febrero',
  [DiscipleSearchByBirthMonth.March]: 'Marzo',
  [DiscipleSearchByBirthMonth.April]: 'Abril',
  [DiscipleSearchByBirthMonth.May]: 'Mayo',
  [DiscipleSearchByBirthMonth.June]: 'Junio',
  [DiscipleSearchByBirthMonth.July]: 'Julio',
  [DiscipleSearchByBirthMonth.August]: 'Agosto',
  [DiscipleSearchByBirthMonth.September]: 'Setiembre',
  [DiscipleSearchByBirthMonth.October]: 'Octubre',
  [DiscipleSearchByBirthMonth.November]: 'Noviembre',
  [DiscipleSearchByBirthMonth.December]: 'Diciembre',
}

//* Gender
export enum DiscipleSearchByGender {
  Male = 'male',
  Female = 'female',
}

export const DiscipleSearchNamesByGender: Record<DiscipleSearchByGender, string> =  {
  [DiscipleSearchByGender.Male]: 'Masculino',
  [DiscipleSearchByGender.Female]: 'Femenino',
}

//* Marital Status
export enum DiscipleSearchByMaritalStatus {
  Single = 'single',
  Married = 'married',
  Widowed = 'widowed',
  Divorced = 'divorced',
  Other = 'other',
}

export const DiscipleSearchNamesByMaritalStatus: Record<DiscipleSearchByMaritalStatus, string> =  {
  [DiscipleSearchByMaritalStatus.Single]: 'Soltero(a)',
  [DiscipleSearchByMaritalStatus.Married]: 'Casado(a)',
  [DiscipleSearchByMaritalStatus.Widowed]: 'Viudo(a)',
  [DiscipleSearchByMaritalStatus.Divorced]: 'Divorciado(a)',
  [DiscipleSearchByMaritalStatus.Other]: 'Otro',
}

//* Status
export enum DiscipleSearchByStatus {
  Inactive = 'inactive',
}

export const DiscipleSearchNamesByStatus: Record<DiscipleSearchByStatus, string> =  {
  [DiscipleSearchByStatus.Inactive]: 'Inactivo',
}
