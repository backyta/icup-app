export enum FamilyGroupSearchSubType {
  FamilyGroupByPastorFirstNames = 'family_group_by_pastor_first_names',
  FamilyGroupByPastorLastNames = 'family_group_by_pastor_last_names',
  FamilyGroupByPastorFullNames = 'family_group_by_pastor_full_names',
  FamilyGroupByCopastorFirstNames = 'family_group_by_copastor_first_names',
  FamilyGroupByCopastorLastNames = 'family_group_by_copastor_last_names',
  FamilyGroupByCopastorFullNames = 'family_group_by_copastor_full_names',
  FamilyGroupBySupervisorFirstNames = 'family_group_by_supervisor_first_names',
  FamilyGroupBySupervisorLastNames = 'family_group_by_supervisor_last_names',
  FamilyGroupBySupervisorFullNames = 'family_group_by_supervisor_full_names',
  FamilyGroupByPreacherFirstNames = 'family_group_by_preacher_first_names',
  FamilyGroupByPreacherLastNames = 'family_group_by_preacher_last_names',
  FamilyGroupByPreacherFullNames = 'family_group_by_preacher_full_names',
}

export const FamilyGroupSearchSubTypeNames: Record<FamilyGroupSearchSubType, string> = {
  [FamilyGroupSearchSubType.FamilyGroupByPastorFirstNames]: 'Por nombres de su pastor',
  [FamilyGroupSearchSubType.FamilyGroupByPastorLastNames]: 'Por apellidos de su pastor',
  [FamilyGroupSearchSubType.FamilyGroupByPastorFullNames]: 'Por nombres y apellidos de su pastor',
  [FamilyGroupSearchSubType.FamilyGroupByCopastorFirstNames]: 'Por nombres de su co-pastor',
  [FamilyGroupSearchSubType.FamilyGroupByCopastorLastNames]: 'Por apellidos de su co-pastor',
  [FamilyGroupSearchSubType.FamilyGroupByCopastorFullNames]:
    'Por nombres y apellidos de su co-pastor',
  [FamilyGroupSearchSubType.FamilyGroupBySupervisorFirstNames]: 'Por nombres de su supervisor',
  [FamilyGroupSearchSubType.FamilyGroupBySupervisorLastNames]: 'Por apellidos de su supervisor',
  [FamilyGroupSearchSubType.FamilyGroupBySupervisorFullNames]:
    'Por nombres y apellidos de su supervisor',
  [FamilyGroupSearchSubType.FamilyGroupByPreacherFirstNames]: 'Por nombres de su predicador',
  [FamilyGroupSearchSubType.FamilyGroupByPreacherLastNames]: 'Por apellidos de su predicador',
  [FamilyGroupSearchSubType.FamilyGroupByPreacherFullNames]:
    'Por nombres y apellidos de su predicador',
};

//* FirstNames
export enum SubTypeFamilyGroupSearchByFirstNames {
  FamilyGroupByPastorFirstNames = 'family_group_by_pastor_first_names',
  FamilyGroupByCopastorFirstNames = 'family_group_by_copastor_first_names',
  FamilyGroupBySupervisorFirstNames = 'family_group_by_supervisor_first_names',
  FamilyGroupByPreacherFirstNames = 'family_group_by_preacher_first_names',
}

export const SubTypeNamesFamilyGroupSearchByFirstNames: Record<
  SubTypeFamilyGroupSearchByFirstNames,
  string
> = {
  [SubTypeFamilyGroupSearchByFirstNames.FamilyGroupByPastorFirstNames]: 'Por nombres de su pastor',
  [SubTypeFamilyGroupSearchByFirstNames.FamilyGroupByCopastorFirstNames]:
    'Por nombres de su co-pastor',
  [SubTypeFamilyGroupSearchByFirstNames.FamilyGroupBySupervisorFirstNames]:
    'Por nombres de su supervisor',
  [SubTypeFamilyGroupSearchByFirstNames.FamilyGroupByPreacherFirstNames]:
    'Por nombres de su predicador',
};

//* LastNames
export enum SubTypeFamilyGroupSearchByLastNames {
  FamilyGroupByPastorLastNames = 'family_group_by_pastor_last_names',
  FamilyGroupByCopastorLastNames = 'family_group_by_copastor_last_names',
  FamilyGroupBySupervisorLastNames = 'family_group_by_supervisor_last_names',
  FamilyGroupByPreacherLastNames = 'family_group_by_preacher_last_names',
}

export const SubTypeNamesFamilyGroupSearchByLastNames: Record<
  SubTypeFamilyGroupSearchByLastNames,
  string
> = {
  [SubTypeFamilyGroupSearchByLastNames.FamilyGroupByPastorLastNames]: 'Por apellidos de su pastor',
  [SubTypeFamilyGroupSearchByLastNames.FamilyGroupByCopastorLastNames]:
    'Por apellidos de su co-pastor',
  [SubTypeFamilyGroupSearchByLastNames.FamilyGroupBySupervisorLastNames]:
    'Por apellidos de su supervisor',
  [SubTypeFamilyGroupSearchByLastNames.FamilyGroupByPreacherLastNames]:
    'Por apellidos de su predicador',
};

//* Full Name
export enum SubTypeFamilyGroupSearchByFullNames {
  FamilyGroupByPastorFullNames = 'family_group_by_pastor_full_names',
  FamilyGroupByCopastorFullNames = 'family_group_by_copastor_full_names',
  FamilyGroupBySupervisorFullNames = 'family_group_by_supervisor_full_names',
  FamilyGroupByPreacherFullNames = 'family_group_by_preacher_full_names',
}

export const SubTypeNamesFamilyGroupSearchByFullNames: Record<
  SubTypeFamilyGroupSearchByFullNames,
  string
> = {
  [SubTypeFamilyGroupSearchByFullNames.FamilyGroupByPastorFullNames]:
    'Por nombres y apellidos de su pastor',
  [SubTypeFamilyGroupSearchByFullNames.FamilyGroupByCopastorFullNames]:
    'Por nombres y apellidos de su co-pastor',
  [SubTypeFamilyGroupSearchByFullNames.FamilyGroupBySupervisorFullNames]:
    'Por nombres y apellidos de su supervisor',
  [SubTypeFamilyGroupSearchByFullNames.FamilyGroupByPreacherFullNames]:
    'Por nombres y apellidos de su predicador',
};
