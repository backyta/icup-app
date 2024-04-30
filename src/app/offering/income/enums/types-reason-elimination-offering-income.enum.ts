export enum TypesReasonEliminationOfferingIncome {
  TypeSelectionError = 'type_selection_error',
  SubTypeSelectionError = 'sub_type_selection_error',
  ShiftSelectionError = 'shift_selection_error',
  MemberSelectionError = 'member_selection_error',
  FamilyHouseSelectionError = 'family_house_selection_error',
  ZoneSelectionError = 'zone_selection_error',
  AmountError= 'amount_error',
  CurrencyError= 'currency_error',
  DateError= 'date_error',
}

export const TypesReasonEliminationOfferingIncomeNames: Record<TypesReasonEliminationOfferingIncome, string> = {
  type_selection_error : '❌ Error en selección de tipo',
  sub_type_selection_error : '❌ Error en selección de sub-tipo',
  shift_selection_error : '❌ Error en selección de turno',
  member_selection_error : '❌ Error en selección de discípulo',
  family_house_selection_error : '❌ Error en selección de casa familiar',
  zone_selection_error : '❌ Error en selección de zona',
  amount_error : '❌ Error en digitar el monto',
  currency_error : '❌ Error en selección divisa ',
  date_error : '❌ Error en selección de fecha',
};


