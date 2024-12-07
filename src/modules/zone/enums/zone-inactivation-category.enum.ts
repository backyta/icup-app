export enum ZoneInactivationCategory {
  AdministrativeChanges = 'administrative_changes',
  LeadershipIssues = 'leadership_issues',
  LackOfActivityOrCommitment = 'lack_of_activity_or_commitment',
  GroupFamilyRelatedReasons = 'group_family_related_reasons',
  ExternalFactors = 'external_factors',
  UnavoidableCircumstances = 'unavoidable_circumstances',
}

export const ZoneInactivationCategoryNames: Record<ZoneInactivationCategory, string> = {
  [ZoneInactivationCategory.AdministrativeChanges]: 'Razones por cambios administrativos',
  [ZoneInactivationCategory.LeadershipIssues]: 'Razones por problemas de liderazgo',
  [ZoneInactivationCategory.LackOfActivityOrCommitment]: 'Razones por falta de actividad o compromiso',
  [ZoneInactivationCategory.GroupFamilyRelatedReasons]: 'Razones relacionadas con grupos familiares',
  [ZoneInactivationCategory.ExternalFactors]: 'Razones por factores externos',
  [ZoneInactivationCategory.UnavoidableCircumstances]: 'Razones inevitables o naturales',
};

