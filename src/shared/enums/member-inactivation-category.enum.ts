export enum MemberInactivationCategory {
  PersonalOrFamilyChanges = 'personal_or_family_changes', 
  ChurchRelatedIssues = 'church_related_issues',
  DisciplinaryActions = 'disciplinary_actions',
  PersonalChallenges = 'personal_challenges',
  UnavoidableCircumstances = 'unavoidable_circumstances',
  InactivityOrLackOfCommitment = 'inactivity_or_lack_of_commitment',
  AdministrativeReasons = 'administrative_reasons',
  ExternalFactors = 'external_factors',
  SpecialCircumstances = 'special_circumstances',
}

export const MemberInactivationCategoryNames: Record<MemberInactivationCategory, string> = {
  [MemberInactivationCategory.DisciplinaryActions]: 'Razones disciplinarias',
  [MemberInactivationCategory.AdministrativeReasons]: 'Razones administrativas',
  [MemberInactivationCategory.PersonalChallenges]: 'Razones de índole personal',
  [MemberInactivationCategory.ExternalFactors]: 'Razones por factores externos',
  [MemberInactivationCategory.UnavoidableCircumstances]: 'Razones inevitables o naturales',
  [MemberInactivationCategory.PersonalOrFamilyChanges]: 'Razones personales y/o familiares',
  [MemberInactivationCategory.ChurchRelatedIssues]: 'Razones relacionadas con la iglesia',
  [MemberInactivationCategory.SpecialCircumstances]: 'Razones especiales o excepcionales',
  [MemberInactivationCategory.InactivityOrLackOfCommitment]: 'Razones de actividad o compromiso',
};

