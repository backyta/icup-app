export enum ZoneSearchSubType {
  ZoneByPastorFirstNames = 'zone_by_pastor_first_names',
  ZoneByPastorLastNames = 'zone_by_pastor_last_names',
  ZoneByPastorFullNames = 'zone_by_pastor_full_names',
  ZoneByCopastorFirstNames = 'zone_by_copastor_first_names',
  ZoneByCopastorLastNames = 'zone_by_copastor_last_names',
  ZoneByCopastorFullNames = 'zone_by_copastor_full_names',
  ZoneBySupervisorFirstNames = 'zone_by_supervisor_first_names',
  ZoneBySupervisorLastNames = 'zone_by_supervisor_last_names',
  ZoneBySupervisorFullNames = 'zone_by_supervisor_full_names',
}

export const ZoneSearchSubTypeNames: Record<ZoneSearchSubType, string> = {
  [ZoneSearchSubType.ZoneByPastorFirstNames]: 'Por nombres de su pastor',
  [ZoneSearchSubType.ZoneByPastorLastNames]: 'Por apellidos de su pastor',
  [ZoneSearchSubType.ZoneByPastorFullNames]: 'Por nombres y apellidos de su pastor',
  [ZoneSearchSubType.ZoneByCopastorFirstNames]: 'Por nombres de su co-pastor',
  [ZoneSearchSubType.ZoneByCopastorLastNames]: 'Por apellidos de su co-pastor',
  [ZoneSearchSubType.ZoneByCopastorFullNames]: 'Por nombres y apellidos de su co-pastor',
  [ZoneSearchSubType.ZoneBySupervisorFirstNames]: 'Por nombres de su supervisor',
  [ZoneSearchSubType.ZoneBySupervisorLastNames]: 'Por apellidos de su supervisor',
  [ZoneSearchSubType.ZoneBySupervisorFullNames]: 'Por nombres y apellidos de su supervisor',
};

//* FirstNames
export enum SubTypeZoneSearchByFirstNames {
  ZoneByPastorFirstNames = 'zone_by_pastor_first_names',
  ZoneByCopastorFirstNames = 'zone_by_copastor_first_names',
  ZoneBySupervisorFirstNames = 'zone_by_supervisor_first_names',
}

export const SubTypeNamesZoneSearchByFirstNames: Record<SubTypeZoneSearchByFirstNames, string> = {
  [SubTypeZoneSearchByFirstNames.ZoneByPastorFirstNames]: 'Por nombres de su pastor',
  [SubTypeZoneSearchByFirstNames.ZoneByCopastorFirstNames]: 'Por nombres de su co-pastor',
  [SubTypeZoneSearchByFirstNames.ZoneBySupervisorFirstNames]: 'Por nombres de su supervisor',
};

//* LastNames
export enum SubTypeZoneSearchByLastNames {
  ZoneByPastorLastNames = 'zone_by_pastor_last_names',
  ZoneByCopastorLastNames = 'zone_by_copastor_last_names',
  ZoneBySupervisorLastNames = 'zone_by_supervisor_last_names',
}

export const SubTypeNamesZoneSearchByLastNames: Record<SubTypeZoneSearchByLastNames, string> = {
  [SubTypeZoneSearchByLastNames.ZoneByPastorLastNames]: 'Por apellidos de su pastor',
  [SubTypeZoneSearchByLastNames.ZoneByCopastorLastNames]: 'Por apellidos de su co-pastor',
  [SubTypeZoneSearchByLastNames.ZoneBySupervisorLastNames]: 'Por apellidos de su supervisor',
};

//* Full Name
export enum SubTypeZoneSearchByFullNames {
  ZoneByPastorFullNames = 'zone_by_pastor_full_names',
  ZoneByCopastorFullNames = 'zone_by_copastor_full_names',
  ZoneBySupervisorFullNames = 'zone_by_supervisor_full_names',
}

export const SubTypeNamesZoneSearchByFullNames: Record<SubTypeZoneSearchByFullNames, string> = {
  [SubTypeZoneSearchByFullNames.ZoneByPastorFullNames]: 'Por nombres y apellidos de su pastor',
  [SubTypeZoneSearchByFullNames.ZoneByCopastorFullNames]: 'Por nombres y apellidos de su co-pastor',
  [SubTypeZoneSearchByFullNames.ZoneBySupervisorFullNames]:
    'Por nombres y apellidos de su supervisor',
};
