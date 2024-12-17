export enum OfferingIncomeCreationCategory {
  Events = 'events',
  General = 'general',
  Meetings  = 'meetings',
  SocialAid = 'social_aid',
  OfferingBox = 'offering_box',
  InternalDonation = 'internal_donation',
  ExternalDonation = 'external_donation',
  FundraisingProTemple   = 'fundraising_pro_temple',
  FundraisingProMinistry = 'fundraising_pro_ministry',
  ActivitiesProChurchGround = 'activities_pro_church_ground',
}

export const OfferingIncomeCreationCategoryNames: Record<
  OfferingIncomeCreationCategory,
  string
> = {
  [OfferingIncomeCreationCategory.General]: 'General',
  [OfferingIncomeCreationCategory.FundraisingProTemple]: 'Pro-Templo',
  [OfferingIncomeCreationCategory.SocialAid]: 'Ayuda Social',
  [OfferingIncomeCreationCategory.OfferingBox]: 'Alfolí',
  [OfferingIncomeCreationCategory.InternalDonation]: 'Donación Interna',
  [OfferingIncomeCreationCategory.ExternalDonation]: 'Donación Externa',
  [OfferingIncomeCreationCategory.ActivitiesProChurchGround]: 'Actividades Pro-Terreno',
  [OfferingIncomeCreationCategory.Events]: 'Eventos (campañas, dedicaciones, etc.)',
  [OfferingIncomeCreationCategory.FundraisingProMinistry]: 'Actividades Pro-Ministerio',
  [OfferingIncomeCreationCategory.Meetings]: 'Reuniones (enseñanzas, conferencias, etc.)',
};
