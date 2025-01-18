export enum OfferingExpenseInactivationReason {
  ChurchSelectionError = 'church_selection_error',
  TypeSelectionError = 'type_selection_error',
  SubTypeSelectionError = 'sub_type_selection_error',
}

export const OfferingExpenseInactivationReasonNames: Record<
  OfferingExpenseInactivationReason,
  string
> = {
  church_selection_error: '❌ Error en selección de iglesia.',
  type_selection_error: '❌ Error en selección de tipo.',
  sub_type_selection_error: '❌ Error en selección de sub-tipo.',
};
