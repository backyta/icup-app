export enum ReasonType {
  TypeSelectionError = 'type_selection_error',
  SubTypeSelectionError = 'sub_type_selection_error',
  MemberSelectionError = 'member_selection_error',
  FamilyHouseSelectionError = 'family_house_selection_error',
  ZoneSelectionError = 'zone_selection_error',
  AmountError= 'amount_error',
  CurrencyError= 'currency_error',
  DateError= 'date_error',
}

export const ReasonTypeNames: Record<ReasonType, string> = {
  type_selection_error : '❌ Error en selección de tipo (ofrenda - diezmo)',
  sub_type_selection_error : '❌ Error en selección de sub-tipo de ofrendas',
  member_selection_error : '❌ Error en selección de miembro',
  family_house_selection_error : '❌ Error en selección de casa familiar',
  zone_selection_error : '❌ Error en selección de zona',
  amount_error : '❌ Error en selección de cantidad o monto',
  currency_error : '❌ Error en selección moneda o divisa ',
  date_error : '❌ Error en selección de fecha',
};


