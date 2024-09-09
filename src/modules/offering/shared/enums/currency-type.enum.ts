export enum CurrencyType {
  PEN = 'PEN',
  USD = 'USD',
  EUR = 'EUR',
}

export const CurrencyTypeNames: Record<CurrencyType, string> = {
  [CurrencyType.PEN]: 'Soles',
  [CurrencyType.USD]: 'Dólares',
  [CurrencyType.EUR]: 'Euros',
};