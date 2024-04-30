export enum TypesReasonEliminationOfferingExpenses {
  TypeSelectionError = 'type_selection_error',
  SubTypeSelectionError = 'sub_type_selection_error',
  AmountError= 'amount_error',
  CurrencyError= 'currency_error',
  DateError= 'date_error',
}

export const TypesReasonEliminationOfferingExpensesNames: Record<TypesReasonEliminationOfferingExpenses, string> = {
  type_selection_error : '❌ Error en selección de tipo',
  sub_type_selection_error : '❌ Error en selección de sub-tipo',
  amount_error : '❌ Error en digitar el monto',
  currency_error : '❌ Error en selección divisa ',
  date_error : '❌ Error en selección de fecha',
};

