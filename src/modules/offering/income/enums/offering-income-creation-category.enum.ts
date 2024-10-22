export enum OfferingIncomeCreationCategory {
  General = 'general',
  OfferingBox = 'offering_box',
  Activities = 'activities',
  InternalDonation = 'internal_donation',
  ExternalDonation = 'external_donation',
}

export const OfferingIncomeCreationCategoryNames: Record<
  OfferingIncomeCreationCategory,
  string
> = {
  [OfferingIncomeCreationCategory.General]: 'General',
  [OfferingIncomeCreationCategory.OfferingBox]: 'Alfolí',
  [OfferingIncomeCreationCategory.Activities]: 'Actividades',
  [OfferingIncomeCreationCategory.InternalDonation]: 'Donación Interna',
  [OfferingIncomeCreationCategory.ExternalDonation]: 'Donación Externa',
};
