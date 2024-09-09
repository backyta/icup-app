export enum OfferingFileType {
  Income = 'income',
  Expense = 'expense',
}

export const OfferingFileTypeNames: Record<OfferingFileType, string> = {
  [OfferingFileType.Income]: 'Ingreso',
  [OfferingFileType.Expense]: 'Gasto',
};
