export enum OfferingExpenseEliminationReasonType {
  TypeSelectionError = 'type_selection_error',
  SubTypeSelectionError = 'sub_type_selection_error',
}

export const OfferingExpenseEliminationReasonTypeNames: Record<OfferingExpenseEliminationReasonType, string> = {
  type_selection_error : '❌ Error en selección de tipo',
  sub_type_selection_error : '❌ Error en selección de sub-tipo',
};
