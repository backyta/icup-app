export enum CopastorSearchSelectOption {
  //* Birth Month
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

export const CopastorSearchNamesSelectOption: Record<CopastorSearchSelectOption, string> = {
  //* Birth Month
  [CopastorSearchSelectOption.January]: 'Enero',
  [CopastorSearchSelectOption.February]: 'Febrero',
  [CopastorSearchSelectOption.March]: 'Marzo',
  [CopastorSearchSelectOption.April]: 'Abril',
  [CopastorSearchSelectOption.May]: 'Mayo',
  [CopastorSearchSelectOption.June]: 'Junio',
  [CopastorSearchSelectOption.July]: 'Julio',
  [CopastorSearchSelectOption.August]: 'Agosto',
  [CopastorSearchSelectOption.September]: 'Setiembre',
  [CopastorSearchSelectOption.October]: 'Octubre',
  [CopastorSearchSelectOption.November]: 'Noviembre',
  [CopastorSearchSelectOption.December]: 'Diciembre',

  //* Gender
  [CopastorSearchSelectOption.Male]: 'Masculino',
  [CopastorSearchSelectOption.Female]: 'Femenino',

  //* Marital Status
  [CopastorSearchSelectOption.Single]: 'Soltero(a)',
  [CopastorSearchSelectOption.Married]: 'Casado(a)',
  [CopastorSearchSelectOption.Widowed]: 'Viudo(a)',
  [CopastorSearchSelectOption.Divorced]: 'Divorciado(a)',
  [CopastorSearchSelectOption.Other]: 'Otro',

  //* Status
  [CopastorSearchSelectOption.Inactive]: 'Inactivo',
};

//* Month Birth
export enum CopastorSearchByBirthMonth {
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

export const CopastorSearchNamesByBirthMonth: Record<CopastorSearchByBirthMonth, string> = {
  [CopastorSearchByBirthMonth.January]: 'Enero',
  [CopastorSearchByBirthMonth.February]: 'Febrero',
  [CopastorSearchByBirthMonth.March]: 'Marzo',
  [CopastorSearchByBirthMonth.April]: 'Abril',
  [CopastorSearchByBirthMonth.May]: 'Mayo',
  [CopastorSearchByBirthMonth.June]: 'Junio',
  [CopastorSearchByBirthMonth.July]: 'Julio',
  [CopastorSearchByBirthMonth.August]: 'Agosto',
  [CopastorSearchByBirthMonth.September]: 'Setiembre',
  [CopastorSearchByBirthMonth.October]: 'Octubre',
  [CopastorSearchByBirthMonth.November]: 'Noviembre',
  [CopastorSearchByBirthMonth.December]: 'Diciembre',
};

//* Gender
export enum CopastorSearchByGender {
  Male = 'male',
  Female = 'female',
}

export const CopastorSearchNamesByGender: Record<CopastorSearchByGender, string> = {
  [CopastorSearchByGender.Male]: 'Masculino',
  [CopastorSearchByGender.Female]: 'Femenino',
};

//* Marital Status
export enum CopastorSearchByMaritalStatus {
  Single = 'single',
  Married = 'married',
  Widowed = 'widowed',
  Divorced = 'divorced',
  Other = 'other',
}

export const CopastorSearchNamesByMaritalStatus: Record<CopastorSearchByMaritalStatus, string> = {
  [CopastorSearchByMaritalStatus.Single]: 'Soltero(a)',
  [CopastorSearchByMaritalStatus.Married]: 'Casado(a)',
  [CopastorSearchByMaritalStatus.Widowed]: 'Viudo(a)',
  [CopastorSearchByMaritalStatus.Divorced]: 'Divorciado(a)',
  [CopastorSearchByMaritalStatus.Other]: 'Otro',
};

//* Status
export enum CopastorSearchByStatus {
  Inactive = 'inactive',
}

export const CopastorSearchNamesByStatus: Record<CopastorSearchByStatus, string> = {
  [CopastorSearchByStatus.Inactive]: 'Inactivo',
};
