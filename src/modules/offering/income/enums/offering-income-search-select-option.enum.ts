export enum OfferingIncomeSearchSelectOption {
  Inactive = 'inactive',

  Day = 'day',
  Afternoon = 'afternoon',

  Pastor = 'pastor',
  Copastor = 'copastor',
  Supervisor = 'supervisor',
  Preacher = 'preacher',
  Disciple = 'disciple',
}

export const OfferingIncomeSearchSelectOptionNames: Record<OfferingIncomeSearchSelectOption, string> =  {
  [OfferingIncomeSearchSelectOption.Inactive]: 'Inactivo',
  [OfferingIncomeSearchSelectOption.Day]: 'Dia',
  [OfferingIncomeSearchSelectOption.Afternoon]: 'Tarde',
  [OfferingIncomeSearchSelectOption.Pastor]: 'Pastor',
  [OfferingIncomeSearchSelectOption.Copastor]: 'Co-Pastor',
  [OfferingIncomeSearchSelectOption.Supervisor]: 'Supervisor',
  [OfferingIncomeSearchSelectOption.Preacher]: 'Predicador',
  [OfferingIncomeSearchSelectOption.Disciple]: 'Discípulo',
}

//* Record Status
export enum OfferingIncomeSearchByRecordStatus {
  Inactive = 'inactive',
}

export const OfferingIncomeSearchNamesByRecordStatus: Record<OfferingIncomeSearchByRecordStatus, string> =  {
  [OfferingIncomeSearchByRecordStatus.Inactive]: 'Inactivo',
}

//* Shift
export enum OfferingIncomeSearchByShift {
  Day = 'day',
  Afternoon = 'afternoon',
}

export const OfferingIncomeSearchNamesByShift: Record<OfferingIncomeSearchByShift, string> =  {
  [OfferingIncomeSearchByShift.Day]: 'Dia',
  [OfferingIncomeSearchByShift.Afternoon]: 'Tarde',
}

//* Shift
export enum OfferingIncomeSearchByMemberType {
  Pastor = 'pastor',
  Copastor = 'copastor',
  Supervisor = 'supervisor',
  Preacher = 'preacher',
  Disciple = 'disciple',
}

export const OfferingIncomeSearchNamesByMemberType: Record<OfferingIncomeSearchByMemberType, string> =  {
  [OfferingIncomeSearchByMemberType.Pastor]: 'Pastor',
  [OfferingIncomeSearchByMemberType.Copastor]: 'Co-Pastor',
  [OfferingIncomeSearchByMemberType.Supervisor]: 'Supervisor',
  [OfferingIncomeSearchByMemberType.Preacher]: 'Predicador',
  [OfferingIncomeSearchByMemberType.Disciple]: 'Discípulo',
}

