export enum UserInactivationCategory {
  AdministrativeChanges = 'administrative_changes',
  PerformanceOrConduct = 'performance_or_conduct',
  InactivityOrRoleIrrelevance = 'inactivity_or_role_irrelevance',
  TransitionOrReassignment = 'transition_or_reassignment',
  SecurityReasons = 'security_reasons',
  UnavoidableCircumstances = 'unavoidable_circumstances',
}

export const UserInactivationCategoryNames: Record<UserInactivationCategory, string> = {
  [UserInactivationCategory.AdministrativeChanges]: 'Razones por cambios administrativos',
  [UserInactivationCategory.PerformanceOrConduct]: 'Razones de rendimiento o conducta inapropiada',
  [UserInactivationCategory.InactivityOrRoleIrrelevance]: 'Razones por falta de actividad o relevancia del rol',
  [UserInactivationCategory.TransitionOrReassignment]: 'Razones de transición o resignación',
  [UserInactivationCategory.SecurityReasons]: 'Razones de seguridad',
  [UserInactivationCategory.UnavoidableCircumstances]: 'Razones inevitables o naturales',
};

