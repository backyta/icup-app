export enum ZoneInactivationReason {
  //* Reasons for administrative changes
  StructuralReorganization = 'structural_reorganization',
  ZoneReduction = 'zone_reduction',
  ZoneFusion = 'zone_fusion',
  NoSupervisorAssigned = 'no_supervisor_assigned',

  //* Reasons for leadership problems
  SupervisorResignation = 'supervisor_resignation',
  LeadershipConflicts = 'leadership_conflicts',
  LeadershipIncapacity = 'leadership_incapacity',

  //* Reasons for lack of activity or commitment
  GeneralInactivity = 'general_inactivity',
  LackOfParticipation = 'lack_of_participation',
  LowDiscipleCommitment = 'low_disciple_commitment',

  //* Reasons related to family groups
  FamilyGroupsDissolution = 'family_groups_dissolution',
  FamilyGroupsRelocation = 'family_groups_relocation',
  MemberLoss = 'member_loss',

  //* Reasons due to external factor
  DemographicChanges = 'demographic_changes',
  LegalRestrictions = 'legal_restrictions',
  AccessIssues = 'access_issues',

  //* Unavoidable or natural reasons
  NaturalDisasters = 'natural_disasters',
  HealthCrisis = 'health_crisis',
  ResourceShortage = 'resource_shortage',
}

export const ZoneInactivationReasonNames: Record<ZoneInactivationReason, string> = {
  [ZoneInactivationReason.StructuralReorganization]: 'Reorganización estructural de las zonas.',
  [ZoneInactivationReason.ZoneReduction]: 'Reducción de zonas por optimización de recursos.',
  [ZoneInactivationReason.ZoneFusion]: 'Fusión con otra zona para mejorar la gestión.',
  [ZoneInactivationReason.NoSupervisorAssigned]: 'Falta de un supervisor designado.',

  [ZoneInactivationReason.SupervisorResignation]:
    'Renuncia o inactividad prolongada del supervisor.',
  [ZoneInactivationReason.LeadershipConflicts]:
    'Conflictos graves entre el supervisor y los discípulos o grupos familiares.',
  [ZoneInactivationReason.LeadershipIncapacity]:
    'Incapacidad del liderazgo para cumplir con las responsabilidades.',

  [ZoneInactivationReason.GeneralInactivity]: 'Inactividad general en los grupos familiares.',
  [ZoneInactivationReason.LackOfParticipation]: 'Falta de participación en actividades o eventos.',
  [ZoneInactivationReason.LowDiscipleCommitment]: 'Bajo compromiso de los discípulos asignados.',

  [ZoneInactivationReason.FamilyGroupsDissolution]:
    'Disolución de la mayoría de los grupos familiares en la zona.',
  [ZoneInactivationReason.FamilyGroupsRelocation]:
    'Reubicación de los grupos familiares a otras zonas.',
  [ZoneInactivationReason.MemberLoss]:
    'Pérdida significativa de miembros en los grupos familiares.',

  [ZoneInactivationReason.DemographicChanges]:
    'Cambios demográficos significativos en el área geográfica (migración, urbanización, etc.).',
  [ZoneInactivationReason.LegalRestrictions]: 'Restricciones legales o gubernamentales.',
  [ZoneInactivationReason.AccessIssues]:
    'Dificultades de acceso al área por problemas de infraestructura.',

  [ZoneInactivationReason.NaturalDisasters]:
    'Desastres naturales que afectan la operatividad de la zona.',
  [ZoneInactivationReason.HealthCrisis]:
    'Pandemias u otras crisis sanitarias que impiden el desarrollo de actividades.',
  [ZoneInactivationReason.ResourceShortage]:
    'Falta de recursos básicos en la zona (agua, electricidad, etc.).',
};

//? Individuals
//* Reasons for administrative changes
export enum AdministrativeChangesReasons {
  StructuralReorganization = 'structural_reorganization',
  ZoneReduction = 'zone_reduction',
  ZoneFusion = 'zone_fusion',
  NoSupervisorAssigned = 'no_supervisor_assigned',
}

export const AdministrativeChangesReasonsNames: Record<AdministrativeChangesReasons, string> = {
  [AdministrativeChangesReasons.StructuralReorganization]:
    'Reorganización estructural de las zonas',
  [AdministrativeChangesReasons.ZoneReduction]: 'Reducción de zonas por optimización de recursos',
  [AdministrativeChangesReasons.ZoneFusion]: 'Fusión con otra zona para mejorar la gestión',
  [AdministrativeChangesReasons.NoSupervisorAssigned]: 'Falta de un supervisor designado',
};

//* Reasons for leadership problems
export enum LeadershipIssuesReasons {
  SupervisorResignation = 'supervisor_resignation',
  LeadershipConflicts = 'leadership_conflicts',
  LeadershipIncapacity = 'leadership_incapacity',
}

export const LeadershipIssuesReasonsNames: Record<LeadershipIssuesReasons, string> = {
  [LeadershipIssuesReasons.SupervisorResignation]:
    'Renuncia o inactividad prolongada del supervisor',
  [LeadershipIssuesReasons.LeadershipConflicts]:
    'Conflictos graves entre el supervisor y los discípulos o grupos familiares',
  [LeadershipIssuesReasons.LeadershipIncapacity]:
    'Incapacidad del liderazgo para cumplir con las responsabilidades',
};

//* Reasons for lack of activity or commitment
export enum LackOfActivityOrCommitmentReasons {
  GeneralInactivity = 'general_inactivity',
  LackOfParticipation = 'lack_of_participation',
  LowDiscipleCommitment = 'low_disciple_commitment',
}

export const LackOfActivityOrCommitmentReasonsNames: Record<
  LackOfActivityOrCommitmentReasons,
  string
> = {
  [LackOfActivityOrCommitmentReasons.GeneralInactivity]:
    'Inactividad general en los grupos familiares',
  [LackOfActivityOrCommitmentReasons.LackOfParticipation]:
    'Falta de participación en actividades o eventos',
  [LackOfActivityOrCommitmentReasons.LowDiscipleCommitment]:
    'Bajo compromiso de los discípulos asignados',
};

//* Reasons related to family groups
export enum FamilyGroupRelatedReasonsReasons {
  FamilyGroupsDissolution = 'family_groups_dissolution',
  FamilyGroupsRelocation = 'family_groups_relocation',
  MemberLoss = 'member_loss',
}

export const GroupFamilyRelatedReasonsReasonsNames: Record<
  FamilyGroupRelatedReasonsReasons,
  string
> = {
  [FamilyGroupRelatedReasonsReasons.FamilyGroupsDissolution]:
    'Disolución de la mayoría de los grupos familiares en la zona',
  [FamilyGroupRelatedReasonsReasons.FamilyGroupsRelocation]:
    'Reubicación de los grupos familiares a otras zonas',
  [FamilyGroupRelatedReasonsReasons.MemberLoss]:
    'Pérdida significativa de miembros en los grupos familiares',
};

//* Reasons due to external factor
export enum ExternalFactorsReasons {
  DemographicChanges = 'demographic_changes',
  LegalRestrictions = 'legal_restrictions',
  AccessIssues = 'access_issues',
}

export const ExternalFactorsReasonsNames: Record<ExternalFactorsReasons, string> = {
  [ExternalFactorsReasons.DemographicChanges]:
    'Cambios demográficos significativos en el área geográfica (migración, urbanización, etc.)',
  [ExternalFactorsReasons.LegalRestrictions]: 'Restricciones legales o gubernamentales',
  [ExternalFactorsReasons.AccessIssues]:
    'Dificultades de acceso al área por problemas de infraestructura',
};

//* Unavoidable or natural reasons
export enum UnavoidableCircumstancesReasons {
  NaturalDisasters = 'natural_disasters',
  HealthCrisis = 'health_crisis',
  ResourceShortage = 'resource_shortage',
}

export const UnavoidableCircumstancesReasonsNames: Record<UnavoidableCircumstancesReasons, string> =
  {
    [UnavoidableCircumstancesReasons.NaturalDisasters]:
      'Desastres naturales que afectan la operatividad de la zona',
    [UnavoidableCircumstancesReasons.HealthCrisis]:
      'Pandemias u otras crisis sanitarias que impiden el desarrollo de actividades',
    [UnavoidableCircumstancesReasons.ResourceShortage]:
      'Falta de recursos básicos en la zona (agua, electricidad, etc.)',
  };
