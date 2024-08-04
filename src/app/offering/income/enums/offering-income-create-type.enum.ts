export enum OfferingIncomeCreateType {
  Tithe = 'tithe',
  Offering = 'offering',
  IncomeAdjustment = 'income_adjustment',
}

export const OfferingIncomeCreateTypeNames: Record<OfferingIncomeCreateType, string> = {
  tithe : 'Diezmo',
  offering : 'Ofrenda',
  income_adjustment : 'Ajuste por Ingreso '
};

