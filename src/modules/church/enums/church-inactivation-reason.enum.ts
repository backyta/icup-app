export enum ChurchInactivationReason {
  // Razones administrativas
  MergerWithAnotherChurch = 'merger_with_another_church',
  Relocation = 'relocation',
  TemporaryClosure = 'temporary_closure',
  DataReorganization = 'data_reorganization',

  // Razones naturales o inesperadas
  NaturalDisaster = 'natural_disaster',
  Pandemic = 'pandemic',
  InfrastructureLoss = 'infrastructure_loss',

  // Razones relacionados con la comunidad
  MembershipDecline = 'membership_decline',
  InternalConflicts = 'internal_conflicts',
  LeadershipVacancy = 'leadership_vacancy',

  // Razones económicas
  FinancialInfeasibility = 'financial_infeasibility',
  LossOfSupport = 'loss_of_support',

  // Razones legales o normativos
  LegalDisputes = 'legal_disputes',
  RegulatoryNonCompliance = 'regulatory_non_compliance',

  // Razones estratégicas
  MinistryRefocus = 'ministry_refocus',
  ConsolidationWithNearbyChurches = 'consolidation_with_nearby_churches',

  // Razones por factores externos
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
  [ChurchInactivationReason.InternalConflicts]: 'Conflictos internos graves entre líderes o miembros.',
  [ChurchInactivationReason.LeadershipVacancy]: 'Falta de liderazgo, ausencia de pastores o líderes.',

  [ChurchInactivationReason.FinancialInfeasibility]: 'Problemas financieros, imposibilidad de mantener gastos operativos.',
  [ChurchInactivationReason.LossOfSupport]: 'Falta de apoyo externo para sustento de la iglesia.',

  [ChurchInactivationReason.LegalDisputes]: 'Problemas legales, enfrentamiento de demandas.',
  [ChurchInactivationReason.RegulatoryNonCompliance]: 'Incumplimiento de normativas legales, permisos, registros.',

  [ChurchInactivationReason.MinistryRefocus]: 'Cambio de enfoque ministerial, redirección de recursos.',
  [ChurchInactivationReason.ConsolidationWithNearbyChurches]: 'Concentración en iglesias cercanas.',

  [ChurchInactivationReason.CommunityRelocation]: 'Reubicación de la comunidad a otra región.',
  [ChurchInactivationReason.GovernmentMandatedClosure ]: 'Clausura gubernamental por decisiones municipales o estatales',
};

// ? Individuals

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
}

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

export enum CommunityRelatedIssuesReasons {
  MembershipDecline = 'membership_decline',
  InternalConflicts = 'internal_conflicts',
  LeadershipVacancy = 'leadership_vacancy',
}

export const CommunityRelatedIssuesReasonsNames: Record<CommunityRelatedIssuesReasons, string> = {
  [CommunityRelatedIssuesReasons.MembershipDecline]: 'Disminución significativa de miembros',
  [CommunityRelatedIssuesReasons.LeadershipVacancy]: 'Falta de liderazgo, ausencia de pastores o líderes',
  [CommunityRelatedIssuesReasons.InternalConflicts]: 'Conflictos internos graves entre líderes o miembros',
};

export enum FinancialChallengesReasons {
  FinancialInfeasibility = 'financial_infeasibility',
  LossOfSupport = 'loss_of_support',
}

export const FinancialChallengesReasonsNames: Record<FinancialChallengesReasons, string> = {
  [FinancialChallengesReasons.LossOfSupport]: 'Falta de apoyo externo para sustento de la iglesia',
  [FinancialChallengesReasons.FinancialInfeasibility]: 'Problemas financieros, imposibilidad de mantener gastos operativos',
};

export enum LegalOrRegulatoryIssuesReasons {
  LegalDisputes = 'legal_disputes',
  RegulatoryNonCompliance = 'regulatory_non_compliance',
}

export const LegalOrRegulatoryIssuesReasonsNames: Record<LegalOrRegulatoryIssuesReasons, string> = {
  [LegalOrRegulatoryIssuesReasons.LegalDisputes]: 'Problemas legales, enfrentamiento de demandas.',
  [LegalOrRegulatoryIssuesReasons.RegulatoryNonCompliance]: 'Incumplimiento de normativas legales, permisos, registros.',
};

export enum StrategicDecisionsReasons {
  MinistryRefocus = 'ministry_refocus',
  ConsolidationWithNearbyChurches = 'consolidation_with_nearby_churches',
}

export const StrategicDecisionsReasonsNames: Record<StrategicDecisionsReasons, string> = {
  [StrategicDecisionsReasons.ConsolidationWithNearbyChurches]: 'Concentración en iglesias cercanas.',
  [StrategicDecisionsReasons.MinistryRefocus]: 'Cambio de enfoque ministerial, redirección de recursos.',
};

export enum ExternalFactorsReasons {
  CommunityRelocation = 'community_relocation',
  GovernmentMandatedClosure = 'government_mandated_closure',
}

export const ExternalFactorsReasonsNames: Record<ExternalFactorsReasons, string> = {
  [ExternalFactorsReasons.CommunityRelocation]: 'Reubicación de la comunidad a otra región.',
  [ExternalFactorsReasons.GovernmentMandatedClosure ]: 'Clausura gubernamental por decisiones municipales o estatales',
};

