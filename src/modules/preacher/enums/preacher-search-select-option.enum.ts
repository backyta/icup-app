export enum PreacherSearchSelectOption {
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

export const PreacherSearchSelectOptionNames: Record<PreacherSearchSelectOption, string> = {
  //* Month birth
  [PreacherSearchSelectOption.January]: 'Enero',
  [PreacherSearchSelectOption.February]: 'Febrero',
  [PreacherSearchSelectOption.March]: 'Marzo',
  [PreacherSearchSelectOption.April]: 'Abril',
  [PreacherSearchSelectOption.May]: 'Mayo',
  [PreacherSearchSelectOption.June]: 'Junio',
  [PreacherSearchSelectOption.July]: 'Julio',
  [PreacherSearchSelectOption.August]: 'Agosto',
  [PreacherSearchSelectOption.September]: 'Setiembre',
  [PreacherSearchSelectOption.October]: 'Octubre',
  [PreacherSearchSelectOption.November]: 'Noviembre',
  [PreacherSearchSelectOption.December]: 'Diciembre',

  //* Gender
  [PreacherSearchSelectOption.Male]: 'Masculino',
  [PreacherSearchSelectOption.Female]: 'Femenino',

  //* Marital Status
  [PreacherSearchSelectOption.Single]: 'Soltero(a)',
  [PreacherSearchSelectOption.Married]: 'Casado(a)',
  [PreacherSearchSelectOption.Widowed]: 'Viudo(a)',
  [PreacherSearchSelectOption.Divorced]: 'Divorciado(a)',
  [PreacherSearchSelectOption.Other]: 'Otro',

  //* Record Status
  [PreacherSearchSelectOption.Inactive]: 'Inactivo',
};

//* Birth month
export enum PreacherSearchByBirthMonth {
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

export const PreacherSearchNamesByBirthMonth: Record<PreacherSearchByBirthMonth, string> = {
  [PreacherSearchByBirthMonth.January]: 'Enero',
  [PreacherSearchByBirthMonth.February]: 'Febrero',
  [PreacherSearchByBirthMonth.March]: 'Marzo',
  [PreacherSearchByBirthMonth.April]: 'Abril',
  [PreacherSearchByBirthMonth.May]: 'Mayo',
  [PreacherSearchByBirthMonth.June]: 'Junio',
  [PreacherSearchByBirthMonth.July]: 'Julio',
  [PreacherSearchByBirthMonth.August]: 'Agosto',
  [PreacherSearchByBirthMonth.September]: 'Setiembre',
  [PreacherSearchByBirthMonth.October]: 'Octubre',
  [PreacherSearchByBirthMonth.November]: 'Noviembre',
  [PreacherSearchByBirthMonth.December]: 'Diciembre',
};

//* Gender
export enum PreacherSearchByGender {
  Male = 'male',
  Female = 'female',
}

export const PreacherSearchNamesByGender: Record<PreacherSearchByGender, string> = {
  [PreacherSearchByGender.Male]: 'Masculino',
  [PreacherSearchByGender.Female]: 'Femenino',
};

//* Marital Status
export enum PreacherSearchByMaritalStatus {
  Single = 'single',
  Married = 'married',
  Widowed = 'widowed',
  Divorced = 'divorced',
  Other = 'other',
}

export const PreacherSearchNamesByMaritalStatus: Record<PreacherSearchByMaritalStatus, string> = {
  [PreacherSearchByMaritalStatus.Single]: 'Soltero(a)',
  [PreacherSearchByMaritalStatus.Married]: 'Casado(a)',
  [PreacherSearchByMaritalStatus.Widowed]: 'Viudo(a)',
  [PreacherSearchByMaritalStatus.Divorced]: 'Divorciado(a)',
  [PreacherSearchByMaritalStatus.Other]: 'Otro',
};

//* Record Status
export enum PreacherSearchByRecordStatus {
  Inactive = 'inactive',
}

export const PreacherSearchNamesByRecordStatus: Record<PreacherSearchByRecordStatus, string> = {
  [PreacherSearchByRecordStatus.Inactive]: 'Inactivo',
};
