export enum ExchangeCurrencyType {
  USDtoPEN = 'usd_to_pen',
  EURtoPEN = 'eur_to_pen',
  PENtoUSD = 'pen_to_usd',
  PENtoEUR = 'pen_to_eur',
}

export const ExchangeCurrencyTypeNames: Record<ExchangeCurrencyType, string> = {
  [ExchangeCurrencyType.USDtoPEN]: 'USD a PEN',
  [ExchangeCurrencyType.EURtoPEN]: 'EUR a PEN',
  [ExchangeCurrencyType.PENtoUSD]: 'PEN a USD',
  [ExchangeCurrencyType.PENtoEUR]: 'PEN a EUR',
};