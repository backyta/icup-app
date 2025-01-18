export enum MemberInactivationReason {
  //* Reasons for personal or family change
  Relocation = 'relocation',
  FamilyRelocation = 'family_relocation',
  JoiningAnotherChurch = 'joining_another_church',

  //* Reasons related to the congregation
  CongregationalDetachment = 'congregational_detachment',
  DissatisfactionWithChurchLeadership = 'dissatisfaction_with_church_leadership',
  LackOfSpiritualGrowth = 'lack_of_spiritual_growth',
  DoctrinalDisagreement = 'doctrinal_disagreement',

  //* Disciplinary reasons
  Expulsion = 'expulsion',
  EthicalViolation = 'ethical_violation',
  LeadershipConflict = 'leadership_conflict',
  PublicScandal = 'public_scandal',

  //* Personal reasons
  HealthIssues = 'health_issues',
  TimeConstraints = 'time_constraints',
  MentalHealthChallenges = 'mental_health_challenges',

  //* Natural or inevitable reasons
  Death = 'death',
  AgingOrPhysicalIncapacity = 'aging_or_physical_incapacity',

  //* Reasons for inactivity
  Inactivity = 'inactivity',
  LackOfCommitment = 'lack_of_commitment',

  //* Razones administrativas
  RequestForRemoval = 'request_for_removal',
  DataCorrection = 'data_correction',

  //* Administrative reasons
  LegalIssues = 'legal_issues',
  ImmigrationChallenges = 'immigration_challenges',
  CulturalBarriers = 'cultural_barriers',

  //* Special reasons
  VoluntaryMissionaryWork = 'voluntary_missionary_work',
  ChurchClosure = 'church_closure',
}

export const MemberInactivationReasonNames: Record<MemberInactivationReason, string> = {
  [MemberInactivationReason.Relocation]: 'Cambio de residencia a otra ciudad o país.',
  [MemberInactivationReason.FamilyRelocation]: 'Traslado familiar completo a otra región.',
  [MemberInactivationReason.JoiningAnotherChurch]:
    'Cambio a otra iglesia debido a preferencia personal o doctrinal.',

  [MemberInactivationReason.CongregationalDetachment]: 'Alejamiento voluntario de la iglesia.',
  [MemberInactivationReason.DissatisfactionWithChurchLeadership]:
    'Insatisfacción con el liderazgo de la iglesia.',
  [MemberInactivationReason.LackOfSpiritualGrowth]:
    'Percepción de falta de crecimiento espiritual en la congregación.',
  [MemberInactivationReason.DoctrinalDisagreement]:
    'Desacuerdo con las enseñanzas o doctrinas de la iglesia.',

  [MemberInactivationReason.Expulsion]:
    'Expulsión debido a violaciones graves de normas o conductas inapropiadas.',
  [MemberInactivationReason.EthicalViolation]:
    'Violación de normas éticas que afecta la convivencia.',
  [MemberInactivationReason.LeadershipConflict]:
    'Conflictos graves con miembros del liderazgo o pastores.',
  [MemberInactivationReason.PublicScandal]:
    'Escándalo público que compromete la reputación de la iglesia.',

  [MemberInactivationReason.HealthIssues]:
    'Problemas de salud que impiden la asistencia y participación activa.',
  [MemberInactivationReason.TimeConstraints]:
    'Falta de tiempo debido a compromisos laborales, académicos o familiares.',
  [MemberInactivationReason.MentalHealthChallenges]:
    'Problemas de salud mental que dificultan la integración.',

  [MemberInactivationReason.Death]: 'Fallecimiento del miembro.',
  [MemberInactivationReason.AgingOrPhysicalIncapacity]:
    'Incapacidad física debido a la edad avanzada u otras condiciones.',

  [MemberInactivationReason.Inactivity]: 'Inactividad prolongada sin razones declaradas.',
  [MemberInactivationReason.LackOfCommitment]:
    'Falta de compromiso continuo con la iglesia y sus actividades.',

  [MemberInactivationReason.RequestForRemoval]:
    'Solicitud formal del miembro para ser eliminado del registro.',
  [MemberInactivationReason.DataCorrection]:
    'Eliminación debido a correcciones en registros o duplicados.',

  [MemberInactivationReason.LegalIssues]: 'Problemas legales que afectan la membresía.',
  [MemberInactivationReason.ImmigrationChallenges]:
    'Dificultades migratorias que impiden la asistencia.',
  [MemberInactivationReason.CulturalBarriers]:
    'Barreras culturales que afectan la integración del miembro.',

  [MemberInactivationReason.VoluntaryMissionaryWork]:
    'Salida debido a trabajo misionero en otra región o país.',
  [MemberInactivationReason.ChurchClosure]: 'Eliminación debido al cierre de la iglesia local.',
};

//? Individuals
//* Reasons for personal or family change
export enum PersonalOrFamilyChangesReasons {
  Relocation = 'relocation',
  FamilyRelocation = 'family_relocation',
  JoiningAnotherChurch = 'joining_another_church',
}

export const PersonalOrFamilyChangesReasonsNames: Record<PersonalOrFamilyChangesReasons, string> = {
  [MemberInactivationReason.Relocation]: 'Cambio de residencia a otra ciudad o país',
  [MemberInactivationReason.FamilyRelocation]: 'Traslado familiar completo a otra región',
  [MemberInactivationReason.JoiningAnotherChurch]:
    'Cambio a otra iglesia debido a preferencia personal o doctrinal',
};

//* Reasons related to the congregation
export enum ChurchRelatedIssuesReasons {
  CongregationalDetachment = 'congregational_detachment',
  DissatisfactionWithChurchLeadership = 'dissatisfaction_with_church_leadership',
  LackOfSpiritualGrowth = 'lack_of_spiritual_growth',
  DoctrinalDisagreement = 'doctrinal_disagreement',
}

export const ChurchRelatedIssuesReasonsNames: Record<ChurchRelatedIssuesReasons, string> = {
  [ChurchRelatedIssuesReasons.CongregationalDetachment]: 'Alejamiento voluntario de la iglesia',
  [ChurchRelatedIssuesReasons.DissatisfactionWithChurchLeadership]:
    'Insatisfacción con el liderazgo de la iglesia',
  [ChurchRelatedIssuesReasons.LackOfSpiritualGrowth]:
    'Percepción de falta de crecimiento espiritual en la congregación',
  [ChurchRelatedIssuesReasons.DoctrinalDisagreement]:
    'Desacuerdo con las enseñanzas o doctrinas de la iglesia',
};

//* Disciplinary reasons
export enum DisciplinaryActionsReasons {
  Expulsion = 'expulsion',
  EthicalViolation = 'ethical_violation',
  LeadershipConflict = 'leadership_conflict',
  PublicScandal = 'public_scandal',
}

export const DisciplinaryActionsReasonsNames: Record<DisciplinaryActionsReasons, string> = {
  [DisciplinaryActionsReasons.Expulsion]:
    'Expulsión debido a violaciones graves de normas o conductas inapropiadas',
  [DisciplinaryActionsReasons.EthicalViolation]:
    'Violación de normas éticas que afecta la convivencia',
  [DisciplinaryActionsReasons.LeadershipConflict]:
    'Conflictos graves con miembros del liderazgo o pastores',
  [DisciplinaryActionsReasons.PublicScandal]:
    'Escándalo público que compromete la reputación de la iglesia',
};

//* Personal reasons
export enum PersonalChallengesReasons {
  HealthIssues = 'health_issues',
  TimeConstraints = 'time_constraints',
  MentalHealthChallenges = 'mental_health_challenges',
}

export const PersonalChallengesReasonsNames: Record<PersonalChallengesReasons, string> = {
  [PersonalChallengesReasons.HealthIssues]:
    'Problemas de salud que impiden la asistencia y participación activa',
  [PersonalChallengesReasons.TimeConstraints]:
    'Falta de tiempo debido a compromisos laborales, académicos o familiares',
  [PersonalChallengesReasons.MentalHealthChallenges]:
    'Problemas de salud mental que dificultan la integración',
};

//* Natural or inevitable reasons
export enum UnavoidableCircumstancesReasons {
  Death = 'death',
  AgingOrPhysicalIncapacity = 'aging_or_physical_incapacity',
}

export const UnavoidableCircumstancesReasonsNames: Record<UnavoidableCircumstancesReasons, string> =
  {
    [UnavoidableCircumstancesReasons.Death]: 'Fallecimiento del miembro',
    [UnavoidableCircumstancesReasons.AgingOrPhysicalIncapacity]:
      'Incapacidad física debido a la edad avanzada u otras condiciones',
  };

//* Reasons for inactivity
export enum InactivityOrLackOfCommitmentReasons {
  Inactivity = 'inactivity',
  LackOfCommitment = 'lack_of_commitment',
}

export const InactivityOrLackOfCommitmentReasonsNames: Record<
  InactivityOrLackOfCommitmentReasons,
  string
> = {
  [InactivityOrLackOfCommitmentReasons.Inactivity]: 'Inactividad prolongada sin razones declaradas',
  [InactivityOrLackOfCommitmentReasons.LackOfCommitment]:
    'Falta de compromiso continuo con la iglesia y sus actividades',
};

//* Administrative reasons
export enum AdministrativeReasons {
  RequestForRemoval = 'request_for_removal',
  DataCorrection = 'data_correction',
}

export const AdministrativeReasonsNames: Record<AdministrativeReasons, string> = {
  [AdministrativeReasons.RequestForRemoval]:
    'Solicitud formal del miembro para ser eliminado del registro',
  [AdministrativeReasons.DataCorrection]:
    'Eliminación debido a correcciones en registros o duplicados',
};

//* Razones administrativas
export enum ExternalFactorsReasons {
  LegalIssues = 'legal_issues',
  ImmigrationChallenges = 'immigration_challenges',
  CulturalBarriers = 'cultural_barriers',
}

export const ExternalFactorsNames: Record<ExternalFactorsReasons, string> = {
  [ExternalFactorsReasons.LegalIssues]: 'Problemas legales que afectan la membresía',
  [ExternalFactorsReasons.ImmigrationChallenges]:
    'Dificultades migratorias que impiden la asistencia',
  [ExternalFactorsReasons.CulturalBarriers]:
    'Barreras culturales que afectan la integración del miembro',
};

//* Special reasons
export enum SpecialCircumstancesReasons {
  VoluntaryMissionaryWork = 'voluntary_missionary_work',
  ChurchClosure = 'church_closure',
}

export const SpecialReasonsNames: Record<SpecialCircumstancesReasons, string> = {
  [SpecialCircumstancesReasons.VoluntaryMissionaryWork]:
    'Salida debido a trabajo misionero en otra región o país',
  [SpecialCircumstancesReasons.ChurchClosure]: 'Eliminación debido al cierre de la iglesia local',
};
