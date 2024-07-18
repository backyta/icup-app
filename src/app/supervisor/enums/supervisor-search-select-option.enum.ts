export enum SupervisorSearchSelectOption {
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

export const SupervisorSearchSelectOptionNames: Record<SupervisorSearchSelectOption, string> =  {
  //* Birth Month
  [SupervisorSearchSelectOption.January]: 'Enero',
  [SupervisorSearchSelectOption.February]: 'Febrero',
  [SupervisorSearchSelectOption.March]: 'Marzo',
  [SupervisorSearchSelectOption.April]: 'Abril',
  [SupervisorSearchSelectOption.May]: 'Mayo',
  [SupervisorSearchSelectOption.June]: 'Junio',
  [SupervisorSearchSelectOption.July]: 'Julio',
  [SupervisorSearchSelectOption.August]: 'Agosto',
  [SupervisorSearchSelectOption.September]: 'Setiembre',
  [SupervisorSearchSelectOption.October]: 'Octubre',
  [SupervisorSearchSelectOption.November]: 'Noviembre',
  [SupervisorSearchSelectOption.December]: 'Diciembre',

  //* Gender
  [SupervisorSearchSelectOption.Male]: 'Masculino',
  [SupervisorSearchSelectOption.Female]: 'Femenino',

  //* Marital Status
  [SupervisorSearchSelectOption.Single]: 'Soltero(a)',
  [SupervisorSearchSelectOption.Married]: 'Casado(a)',
  [SupervisorSearchSelectOption.Widowed]: 'Viudo(a)',
  [SupervisorSearchSelectOption.Divorced]: 'Divorciado(a)',
  [SupervisorSearchSelectOption.Other]: 'Otro',

  //* Status
  [SupervisorSearchSelectOption.Inactive]: 'Inactivo',
};

//* Month Birth
export enum SupervisorSearchByBirthMonth {
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

export const SupervisorSearchNamesByBirthMonth: Record<SupervisorSearchByBirthMonth, string> =  {
  [SupervisorSearchByBirthMonth.January]: 'Enero',
  [SupervisorSearchByBirthMonth.February]: 'Febrero',
  [SupervisorSearchByBirthMonth.March]: 'Marzo',
  [SupervisorSearchByBirthMonth.April]: 'Abril',
  [SupervisorSearchByBirthMonth.May]: 'Mayo',
  [SupervisorSearchByBirthMonth.June]: 'Junio',
  [SupervisorSearchByBirthMonth.July]: 'Julio',
  [SupervisorSearchByBirthMonth.August]: 'Agosto',
  [SupervisorSearchByBirthMonth.September]: 'Setiembre',
  [SupervisorSearchByBirthMonth.October]: 'Octubre',
  [SupervisorSearchByBirthMonth.November]: 'Noviembre',
  [SupervisorSearchByBirthMonth.December]: 'Diciembre',
}

//* Gender
export enum SupervisorSearchByGender {
  Male = 'male',
  Female = 'female',
}

export const SupervisorSearchNamesByGender: Record<SupervisorSearchByGender, string> =  {
  [SupervisorSearchByGender.Male]: 'Masculino',
  [SupervisorSearchByGender.Female]: 'Femenino',
}

//* Marital Status
export enum SupervisorSearchByMaritalStatus {
  Single = 'single',
  Married = 'married',
  Widowed = 'widowed',
  Divorced = 'divorced',
  Other = 'other',
}

export const SupervisorSearchNamesByMaritalStatus: Record<SupervisorSearchByMaritalStatus, string> =  {
  [SupervisorSearchByMaritalStatus.Single]: 'Soltero(a)',
  [SupervisorSearchByMaritalStatus.Married]: 'Casado(a)',
  [SupervisorSearchByMaritalStatus.Widowed]: 'Viudo(a)',
  [SupervisorSearchByMaritalStatus.Divorced]: 'Divorciado(a)',
  [SupervisorSearchByMaritalStatus.Other]: 'Otro',
}

//* Status
export enum SupervisorSearchByStatus {
  Inactive = 'inactive',
}

export const SupervisorSearchNamesByStatus: Record<SupervisorSearchByStatus, string> =  {
  [SupervisorSearchByStatus.Inactive]: 'Inactivo',
}