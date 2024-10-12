export enum OfferingIncomeReasonEliminationType {
  CurrencyExchange = 'currency_exchange',
  TypeSelectionError = 'type_selection_error',
  SubTypeSelectionError = 'sub_type_selection_error',
  ShiftSelectionError = 'shift_selection_error',
  ChurchSelectionError = 'church_selection_error',
  MemberTypeSelectionError = 'member_type_selection_error',
  PastorSelectionError = 'pastor_selection_error',
  CopastorSelectionError = 'copastor_selection_error',
  SupervisorSelectionError = 'supervisor_selection_error',
  PreacherSelectionError = 'preacher_selection_error',
  DiscipleSelectionError = 'disciple_selection_error',
  FamilyGroupSelectionError = 'family_group_selection_error',
  ZoneSelectionError = 'zone_selection_error',
}

export const OfferingIncomeReasonEliminationTypeNames: Record<OfferingIncomeReasonEliminationType, string> = {
  currency_exchange :  '💲💲 Cambio de divisa',
  type_selection_error : '❌ Error en selección de tipo',
  sub_type_selection_error : '❌ Error en selección de sub-tipo',
  shift_selection_error : '❌ Error en selección de turno',
  church_selection_error : '❌ Error en selección de iglesia',
  zone_selection_error : '❌ Error en selección de zona',
  family_group_selection_error : '❌ Error en selección de grupo familiar',
  member_type_selection_error : '❌ Error en selección de tipo de miembro',
  pastor_selection_error : '❌ Error en selección de pastor',
  copastor_selection_error : '❌ Error en selección de co-pastor',
  supervisor_selection_error : '❌ Error en selección de supervisor',
  preacher_selection_error : '❌ Error en selección de predicador',
  disciple_selection_error : '❌ Error en selección de discípulo',
};


