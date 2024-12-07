export enum FamilyGroupInactivationCategory {
  AdministrativeChanges = 'administrative_changes',
  LeadershipIssues = 'leadership_issues',
  HostUnavailability = 'host_unavailability',
  LackOfActivityOrCommitment = 'lack_of_activity_or_commitment',
  ExternalFactors = 'external_factors',
  UnavoidableCircumstances = 'unavoidable_circumstances',
}

export const FamilyGroupInactivationCategoryNames: Record<FamilyGroupInactivationCategory, string> = {
  [FamilyGroupInactivationCategory.AdministrativeChanges]: 'Razones por cambios administrativos',
  [FamilyGroupInactivationCategory.LeadershipIssues]: 'Razones por problemas de liderazgo',
  [FamilyGroupInactivationCategory.HostUnavailability]: 'Razones por falta de disponibilidad del anfitrión',
  [FamilyGroupInactivationCategory.LackOfActivityOrCommitment]: 'Razones por falta de actividad o compromiso',
  [FamilyGroupInactivationCategory.ExternalFactors]: 'Razones por factores externos',
  [FamilyGroupInactivationCategory.UnavoidableCircumstances]: 'Razones inevitables o naturales',
};

