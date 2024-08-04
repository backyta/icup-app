export enum OfferingIncomeSearchSelectOption {
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

export const OfferingIncomeSearchSelectOptionNames: Record<OfferingIncomeSearchSelectOption, string> =  {
  //* Birth Month
  [OfferingIncomeSearchSelectOption.January]: 'Enero',
  [OfferingIncomeSearchSelectOption.February]: 'Febrero',
  [OfferingIncomeSearchSelectOption.March]: 'Marzo',
  [OfferingIncomeSearchSelectOption.April]: 'Abril',
  [OfferingIncomeSearchSelectOption.May]: 'Mayo',
  [OfferingIncomeSearchSelectOption.June]: 'Junio',
  [OfferingIncomeSearchSelectOption.July]: 'Julio',
  [OfferingIncomeSearchSelectOption.August]: 'Agosto',
  [OfferingIncomeSearchSelectOption.September]: 'Setiembre',
  [OfferingIncomeSearchSelectOption.October]: 'Octubre',
  [OfferingIncomeSearchSelectOption.November]: 'Noviembre',
  [OfferingIncomeSearchSelectOption.December]: 'Diciembre',

  //* Gender
  [OfferingIncomeSearchSelectOption.Male]: 'Masculino',
  [OfferingIncomeSearchSelectOption.Female]: 'Femenino',

  //* Marital Status
  [OfferingIncomeSearchSelectOption.Single]: 'Soltero(a)',
  [OfferingIncomeSearchSelectOption.Married]: 'Casado(a)',
  [OfferingIncomeSearchSelectOption.Widowed]: 'Viudo(a)',
  [OfferingIncomeSearchSelectOption.Divorced]: 'Divorciado(a)',
  [OfferingIncomeSearchSelectOption.Other]: 'Otro',

 //* Record Status
  [OfferingIncomeSearchSelectOption.Inactive]: 'Inactivo',
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

//* Record Status
export enum DiscipleSearchByRecordStatus {
  Inactive = 'inactive',
}

export const DiscipleSearchNamesByRecordStatus: Record<DiscipleSearchByRecordStatus, string> =  {
  [DiscipleSearchByRecordStatus.Inactive]: 'Inactivo',
}
