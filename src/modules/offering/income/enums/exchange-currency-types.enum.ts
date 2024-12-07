export enum ExchangeCurrencyTypes {
  USDtoPEN = 'usd_to_pen',
  EURtoPEN = 'eur_to_pen',
  PENtoUSD = 'pen_to_usd',
  PENtoEUR = 'pen_to_eur',
}

export const ExchangeCurrencyTypesNames: Record<ExchangeCurrencyTypes, string> = {
  [ExchangeCurrencyTypes.USDtoPEN]: 'USD a PEN',
  [ExchangeCurrencyTypes.EURtoPEN]: 'EUR a PEN',
  [ExchangeCurrencyTypes.PENtoUSD]: 'PEN a USD',
  [ExchangeCurrencyTypes.PENtoEUR]: 'PEN a EUR',
};