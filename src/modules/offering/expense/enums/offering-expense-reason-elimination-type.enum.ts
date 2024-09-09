export enum OfferingExpenseReasonEliminationType {
  TypeSelectionError = 'type_selection_error',
  SubTypeSelectionError = 'sub_type_selection_error',
}

export const OfferingExpenseReasonEliminationTypeNames: Record<OfferingExpenseReasonEliminationType, string> = {
  type_selection_error : '❌ Error en selección de tipo',
  sub_type_selection_error : '❌ Error en selección de sub-tipo',
};
