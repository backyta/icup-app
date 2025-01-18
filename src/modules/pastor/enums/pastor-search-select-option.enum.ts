export enum PastorSearchSelectOption {
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

  //* Record Status
  Inactive = 'inactive',
}

export const PastorSearchSelectOptionNames: Record<PastorSearchSelectOption, string> = {
  //* Mes de nacimiento
  [PastorSearchSelectOption.January]: 'Enero',
  [PastorSearchSelectOption.February]: 'Febrero',
  [PastorSearchSelectOption.March]: 'Marzo',
  [PastorSearchSelectOption.April]: 'Abril',
  [PastorSearchSelectOption.May]: 'Mayo',
  [PastorSearchSelectOption.June]: 'Junio',
  [PastorSearchSelectOption.July]: 'Julio',
  [PastorSearchSelectOption.August]: 'Agosto',
  [PastorSearchSelectOption.September]: 'Setiembre',
  [PastorSearchSelectOption.October]: 'Octubre',
  [PastorSearchSelectOption.November]: 'Noviembre',
  [PastorSearchSelectOption.December]: 'Diciembre',

  //* Género
  [PastorSearchSelectOption.Male]: 'Masculino',
  [PastorSearchSelectOption.Female]: 'Femenino',

  //* Estado civil
  [PastorSearchSelectOption.Single]: 'Soltero(a)',
  [PastorSearchSelectOption.Married]: 'Casado(a)',
  [PastorSearchSelectOption.Widowed]: 'Viudo(a)',
  [PastorSearchSelectOption.Divorced]: 'Divorciado(a)',
  [PastorSearchSelectOption.Other]: 'Otro',

  //* Record Status
  [PastorSearchSelectOption.Inactive]: 'Inactivo',
};

//* Month Birth
export enum PastorSearchByBirthMonth {
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

export const PastorSearchNamesByBirthMonth: Record<PastorSearchByBirthMonth, string> = {
  [PastorSearchByBirthMonth.January]: 'Enero',
  [PastorSearchByBirthMonth.February]: 'Febrero',
  [PastorSearchByBirthMonth.March]: 'Marzo',
  [PastorSearchByBirthMonth.April]: 'Abril',
  [PastorSearchByBirthMonth.May]: 'Mayo',
  [PastorSearchByBirthMonth.June]: 'Junio',
  [PastorSearchByBirthMonth.July]: 'Julio',
  [PastorSearchByBirthMonth.August]: 'Agosto',
  [PastorSearchByBirthMonth.September]: 'Setiembre',
  [PastorSearchByBirthMonth.October]: 'Octubre',
  [PastorSearchByBirthMonth.November]: 'Noviembre',
  [PastorSearchByBirthMonth.December]: 'Diciembre',
};

//* Gender
export enum PastorSearchByGender {
  Male = 'male',
  Female = 'female',
}

export const PastorSearchNamesByGender: Record<PastorSearchByGender, string> = {
  [PastorSearchByGender.Male]: 'Masculino',
  [PastorSearchByGender.Female]: 'Femenino',
};

//* Marital Status
export enum PastorSearchByMaritalStatus {
  Single = 'single',
  Married = 'married',
  Widowed = 'widowed',
  Divorced = 'divorced',
  Other = 'other',
}

export const PastorSearchNamesByMaritalStatus: Record<PastorSearchByMaritalStatus, string> = {
  [PastorSearchByMaritalStatus.Single]: 'Soltero(a)',
  [PastorSearchByMaritalStatus.Married]: 'Casado(a)',
  [PastorSearchByMaritalStatus.Widowed]: 'Viudo(a)',
  [PastorSearchByMaritalStatus.Divorced]: 'Divorciado(a)',
  [PastorSearchByMaritalStatus.Other]: 'Otro',
};

//* Record Status
export enum PastorSearchByRecordStatus {
  Inactive = 'inactive',
}

export const PastorSearchNamesByRecordStatus: Record<PastorSearchByRecordStatus, string> = {
  [PastorSearchByRecordStatus.Inactive]: 'Inactivo',
};
