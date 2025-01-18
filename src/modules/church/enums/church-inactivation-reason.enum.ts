export enum ChurchInactivationReason {
  //* Administrative reasons
  MergerWithAnotherChurch = 'merger_with_another_church',
  Relocation = 'relocation',
  TemporaryClosure = 'temporary_closure',
  DataReorganization = 'data_reorganization',

  //* Natural or unexpected reasons
  NaturalDisaster = 'natural_disaster',
  Pandemic = 'pandemic',
  InfrastructureLoss = 'infrastructure_loss',

  //* Reasons related to the community
  MembershipDecline = 'membership_decline',
  InternalConflicts = 'internal_conflicts',
  LeadershipVacancy = 'leadership_vacancy',

  //* Economic reasons
  FinancialInfeasibility = 'financial_infeasibility',
  LossOfSupport = 'loss_of_support',

  //* Legal or regulatory reasons
  LegalDisputes = 'legal_disputes',
  RegulatoryNonCompliance = 'regulatory_non_compliance',

  //* Legal or regulatory reasons
  MinistryRefocus = 'ministry_refocus',
  ConsolidationWithNearbyChurches = 'consolidation_with_nearby_churches',

  //* Reasons due to external factors
  CommunityRelocation = 'community_relocation',
  GovernmentMandatedClosure = 'government_mandated_closure',
}

export const ChurchInactivationReasonNames: Record<ChurchInactivationReason, string> = {
  [ChurchInactivationReason.MergerWithAnotherChurch]: 'Fusión con otra iglesia.',
  [ChurchInactivationReason.Relocation]: 'Cambio de ubicación.',
  [ChurchInactivationReason.TemporaryClosure]: ' Cierre temporal por remodelación.',
  [ChurchInactivationReason.DataReorganization]: 'Reorganización de registros.',

  [ChurchInactivationReason.NaturalDisaster]: 'Desastres naturales.',
  [ChurchInactivationReason.Pandemic]: 'Pandemias o emergencias sanitarias.',
  [ChurchInactivationReason.InfrastructureLoss]: 'Pérdida de infraestructura.',

  [ChurchInactivationReason.MembershipDecline]: 'Disminución significativa de miembros.',
  [ChurchInactivationReason.InternalConflicts]:
    'Conflictos internos graves entre líderes o miembros.',
  [ChurchInactivationReason.LeadershipVacancy]:
    'Falta de liderazgo, ausencia de pastores o líderes.',

  [ChurchInactivationReason.FinancialInfeasibility]:
    'Problemas financieros, imposibilidad de mantener gastos operativos.',
  [ChurchInactivationReason.LossOfSupport]: 'Falta de apoyo externo para sustento de la iglesia.',

  [ChurchInactivationReason.LegalDisputes]: 'Problemas legales, enfrentamiento de demandas.',
  [ChurchInactivationReason.RegulatoryNonCompliance]:
    'Incumplimiento de normativas legales, permisos, registros.',

  [ChurchInactivationReason.MinistryRefocus]:
    'Cambio de enfoque ministerial, redirección de recursos.',
  [ChurchInactivationReason.ConsolidationWithNearbyChurches]: 'Concentración en iglesias cercanas.',

  [ChurchInactivationReason.CommunityRelocation]: 'Reubicación de la comunidad a otra región.',
  [ChurchInactivationReason.GovernmentMandatedClosure]:
    'Clausura gubernamental por decisiones municipales o estatales',
};

//? Individuals
//* Administrative reasons
export enum AdministrativeReasons {
  MergerWithAnotherChurch = 'merger_with_another_church',
  Relocation = 'relocation',
  TemporaryClosure = 'temporary_closure',
  DataReorganization = 'data_reorganization',
}

export const AdministrativeReasonsNames: Record<AdministrativeReasons, string> = {
  [AdministrativeReasons.Relocation]: 'Cambio de ubicación',
  [AdministrativeReasons.MergerWithAnotherChurch]: 'Fusión con otra iglesia',
  [AdministrativeReasons.DataReorganization]: 'Reorganización de registros',
  [AdministrativeReasons.TemporaryClosure]: ' Cierre temporal por remodelación',
};

//* Natural or unexpected reasons
export enum NaturalCircumstancesReasons {
  NaturalDisaster = 'natural_disaster',
  Pandemic = 'pandemic',
  InfrastructureLoss = 'infrastructure_loss',
}

export const NaturalCircumstancesReasonsNames: Record<NaturalCircumstancesReasons, string> = {
  [NaturalCircumstancesReasons.NaturalDisaster]: 'Desastres naturales.',
  [NaturalCircumstancesReasons.InfrastructureLoss]: 'Pérdida de infraestructura.',
  [NaturalCircumstancesReasons.Pandemic]: 'Pandemias o emergencias sanitarias.',
};

//* Reasons related to the community
export enum CommunityRelatedIssuesReasons {
  MembershipDecline = 'membership_decline',
  InternalConflicts = 'internal_conflicts',
  LeadershipVacancy = 'leadership_vacancy',
}

export const CommunityRelatedIssuesReasonsNames: Record<CommunityRelatedIssuesReasons, string> = {
  [CommunityRelatedIssuesReasons.MembershipDecline]: 'Disminución significativa de miembros',
  [CommunityRelatedIssuesReasons.LeadershipVacancy]:
    'Falta de liderazgo, ausencia de pastores o líderes',
  [CommunityRelatedIssuesReasons.InternalConflicts]:
    'Conflictos internos graves entre líderes o miembros',
};

//* Economic reasons
export enum FinancialChallengesReasons {
  FinancialInfeasibility = 'financial_infeasibility',
  LossOfSupport = 'loss_of_support',
}

export const FinancialChallengesReasonsNames: Record<FinancialChallengesReasons, string> = {
  [FinancialChallengesReasons.LossOfSupport]: 'Falta de apoyo externo para sustento de la iglesia',
  [FinancialChallengesReasons.FinancialInfeasibility]:
    'Problemas financieros, imposibilidad de mantener gastos operativos',
};

//* Razones legales o normativos
export enum LegalOrRegulatoryIssuesReasons {
  LegalDisputes = 'legal_disputes',
  RegulatoryNonCompliance = 'regulatory_non_compliance',
}

export const LegalOrRegulatoryIssuesReasonsNames: Record<LegalOrRegulatoryIssuesReasons, string> = {
  [LegalOrRegulatoryIssuesReasons.LegalDisputes]: 'Problemas legales, enfrentamiento de demandas.',
  [LegalOrRegulatoryIssuesReasons.RegulatoryNonCompliance]:
    'Incumplimiento de normativas legales, permisos, registros.',
};

//* Legal or regulatory reasons
export enum StrategicDecisionsReasons {
  MinistryRefocus = 'ministry_refocus',
  ConsolidationWithNearbyChurches = 'consolidation_with_nearby_churches',
}

export const StrategicDecisionsReasonsNames: Record<StrategicDecisionsReasons, string> = {
  [StrategicDecisionsReasons.ConsolidationWithNearbyChurches]:
    'Concentración en iglesias cercanas.',
  [StrategicDecisionsReasons.MinistryRefocus]:
    'Cambio de enfoque ministerial, redirección de recursos.',
};

//* Reasons due to external factors
export enum ExternalFactorsReasons {
  CommunityRelocation = 'community_relocation',
  GovernmentMandatedClosure = 'government_mandated_closure',
}

export const ExternalFactorsReasonsNames: Record<ExternalFactorsReasons, string> = {
  [ExternalFactorsReasons.CommunityRelocation]: 'Reubicación de la comunidad a otra región.',
  [ExternalFactorsReasons.GovernmentMandatedClosure]:
    'Clausura gubernamental por decisiones municipales o estatales',
};
