export enum UserInactivationReason {
// Razones por cambios administrativos
  OrganizationalRestructure = 'organizational_restructure',
  RoleReassignment = 'role_reassignment',
  PermissionRevocation = 'permission_revocation',

// Razones de rendimiento o conducta inapropiada
  PolicyViolation = 'policy_violation',
  UnprofessionalBehavior = 'unprofessional_behavior',
  GrossNegligence = 'gross_negligence',

// Razones por falta de actividad o relevancia del rol
  ProlongedInactivity = 'prolonged_inactivity',
  ObsoleteRole = 'obsolete_role',
  LowUsageFrequency = 'low_usage_frequency',

// Razones de transición o reasignación
  RoleTransfer = 'role_transfer',
  ResponsibilityChange = 'responsibility_change',
  ResignationOrExit = 'resignation_or_exit',

// Razones de seguridad
  UnauthorizedAccess = 'unauthorized_access',
  SecurityRisk = 'security_risk',
  CredentialCompromise = 'credential_compromise',

// Razones circunstancias inevitables o naturales
  HealthIssues = 'health_issues',
  Deceased = 'deceased',
  ForceMajeure = 'force_majeure',
}

export const UserInactivationReasonNames: Record<UserInactivationReason, string> = {
  [UserInactivationReason.OrganizationalRestructure]: 'Cambio en la estructura organizativa que elimina o fusiona roles.',
  [UserInactivationReason.RoleReassignment]: 'Reasignación del usuario a otra área dentro del sistema.',
  [UserInactivationReason.PermissionRevocation]: 'Decisión de restringir acceso por reestructuración de permisos.',

  [UserInactivationReason.PolicyViolation]: 'Uso indebido del sistema o violación de políticas internas.',
  [UserInactivationReason.UnprofessionalBehavior]: 'Comportamiento inadecuado o falta de profesionalismo en sus interacciones.',
  [UserInactivationReason.GrossNegligence]: 'Negligencia grave en el uso del sistema que afecta la operación.',

  [UserInactivationReason.ProlongedInactivity]: 'Inactividad prolongada sin justificación.',
  [UserInactivationReason.ObsoleteRole]: 'Rol obsoleto o ya no necesario en el sistema.',
  [UserInactivationReason.LowUsageFrequency]: 'Baja frecuencia de uso que no justifica mantener el acceso.',

  [UserInactivationReason.RoleTransfer]: 'El usuario ha sido transferido a otra área o proyecto fuera del sistema.',
  [UserInactivationReason.ResponsibilityChange]: 'Cambio en las responsabilidades que ya no requieren acceso.',
  [UserInactivationReason.ResignationOrExit]: 'El usuario dejó la organización o renunció.',

  [UserInactivationReason.UnauthorizedAccess]: 'Acceso sospechoso o no autorizado detectado.',
  [UserInactivationReason.SecurityRisk]: 'Riesgo de brechas de seguridad asociadas al usuario.',
  [UserInactivationReason.CredentialCompromise]: 'Credenciales comprometidas o uso irregular de su cuenta.',

  [UserInactivationReason.HealthIssues]: 'Problemas de salud que impiden continuar con sus funciones.',
  [UserInactivationReason.Deceased]: 'Fallecimiento del usuario.',
  [UserInactivationReason.ForceMajeure]: 'Fuerza mayor (desastres naturales, situaciones críticas externas).',
};

// ? Individuals

export enum AdministrativeChangesReasons {
  OrganizationalRestructure = 'organizational_restructure',
  RoleReassignment = 'role_reassignment',
  PermissionRevocation = 'permission_revocation',
}

export const AdministrativeChangesReasonsNames: Record<AdministrativeChangesReasons, string> = {
  [AdministrativeChangesReasons.OrganizationalRestructure]: 'Cambio en la estructura organizativa que elimina o fusiona roles',
  [AdministrativeChangesReasons.RoleReassignment]: 'Reasignación del usuario a otra área dentro del sistema',
  [AdministrativeChangesReasons.PermissionRevocation]: 'Decisión de restringir acceso por reestructuración de permisos',
}

export enum PerformanceOrConductReasons {
  PolicyViolation = 'policy_violation',
  UnprofessionalBehavior = 'unprofessional_behavior',
  GrossNegligence = 'gross_negligence',
}

export const PerformanceOrConductReasonsNames: Record<PerformanceOrConductReasons, string> = {
  [PerformanceOrConductReasons.PolicyViolation]: 'Uso indebido del sistema o violación de políticas internas.',
  [PerformanceOrConductReasons.UnprofessionalBehavior]: 'Comportamiento inadecuado o falta de profesionalismo en sus interacciones.',
  [PerformanceOrConductReasons.GrossNegligence]: 'Negligencia grave en el uso del sistema que afecta la operación.',
};

export enum InactivityOrRoleIrrelevanceReasons {
  ProlongedInactivity = 'prolonged_inactivity',
  ObsoleteRole = 'obsolete_role',
  LowUsageFrequency = 'low_usage_frequency',
}

export const InactivityOrRoleIrrelevanceReasonsNames: Record<InactivityOrRoleIrrelevanceReasons, string> = {
  [InactivityOrRoleIrrelevanceReasons.ProlongedInactivity]: 'Inactividad prolongada sin justificación.',
  [InactivityOrRoleIrrelevanceReasons.ObsoleteRole]: 'Rol obsoleto o ya no necesario en el sistema.',
  [InactivityOrRoleIrrelevanceReasons.LowUsageFrequency]: 'Baja frecuencia de uso que no justifica mantener el acceso.',
};

export enum TransitionOrReassignmentReasons {
  RoleTransfer = 'role_transfer',
  ResponsibilityChange = 'responsibility_change',
  ResignationOrExit = 'resignation_or_exit',
}

export const TransitionOrReassignmentReasonsNames: Record<TransitionOrReassignmentReasons, string> = {
  [TransitionOrReassignmentReasons.RoleTransfer]: 'El usuario ha sido transferido a otra área o proyecto fuera del sistema.',
  [TransitionOrReassignmentReasons.ResponsibilityChange]: 'Cambio en las responsabilidades que ya no requieren acceso.',
  [TransitionOrReassignmentReasons.ResignationOrExit]: 'El usuario dejó la organización o renunció.',
};

export enum SecurityReasonsReasons {
  UnauthorizedAccess = 'unauthorized_access',
  SecurityRisk = 'security_risk',
  CredentialCompromise = 'credential_compromise',
}

export const SecurityReasonsReasonsNames: Record<SecurityReasonsReasons, string> = {
  [SecurityReasonsReasons.UnauthorizedAccess]: 'Acceso sospechoso o no autorizado detectado.',
  [SecurityReasonsReasons.SecurityRisk]: 'Riesgo de brechas de seguridad asociadas al usuario.',
  [SecurityReasonsReasons.CredentialCompromise]: 'Credenciales comprometidas o uso irregular de su cuenta.',
};

export enum UnavoidableCircumstancesReasons {
  HealthIssues = 'health_issues',
  Deceased = 'deceased',
  ForceMajeure = 'force_majeure',
}

export const UnavoidableCircumstancesReasonsNames: Record<UnavoidableCircumstancesReasons, string> = {
  [UnavoidableCircumstancesReasons.HealthIssues]: 'Problemas de salud que impiden continuar con sus funciones.',
  [UnavoidableCircumstancesReasons.Deceased]: 'Fallecimiento del usuario.',
  [UnavoidableCircumstancesReasons.ForceMajeure]: 'Fuerza mayor (desastres naturales, situaciones críticas externas).',
};


