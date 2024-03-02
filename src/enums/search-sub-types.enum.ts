export enum SubTypeSearch {
  none = 'none',

  //* Member
  memberPastorNames = 'member_pastor_names',
  memberPastorLastNames = 'member_pastor_last_names',
  memberPastorFullName = 'member_pastor_full_name',
  memberCopastorNames = 'member_copastor_names',
  memberCopastorLastNames = 'member_copastor_last_names',
  memberCopastorFullName = 'member_copastor_full_name',
  memberSupervisorNames = 'member_supervisor_names',
  memberSupervisorLastNames = 'member_supervisor_last_names',
  memberSupervisorFullName = 'member_supervisor_full_name',
  memberPreacherNames = 'member_preacher_names',
  memberPreacherLastNames = 'member_preacher_last_names',
  memberPreacherFullName = 'member_preacher_full_name',
  memberNames = 'member_names',
  memberLastNames = 'member_last_names',
  memberFullName = 'member_full_name',

  //* Pastor
  pastorNames = 'pastor_names',
  pastorLastNames = 'pastor_last_names',
  pastorFullName = 'pastor_full_name',

  //* Copastor
  copastorPastorNames = 'copastor_pastor_names',
  copastorPastorLastNames = 'copastor_pastor_last_names',
  copastorPastorFullName = 'copastor_pastor_full_name',
  copastorNames = 'copastor_names',
  copastorLastNames = 'copastor_last_names',
  copastorFullName = 'copastor_full_name',

  //* Leaders
  leaderPastorNames = 'leader_pastor_names',
  leaderPastorLastNames = 'leader_pastor_last_names',
  leaderPastorFullName = 'leader_pastor_full_name',
  leaderCopastorNames = 'leader_copastor_names',
  leaderCopastorLastNames = 'leader_copastor_last_names',
  leaderCopastorFullName = 'leader_copastor_full_name',
  leaderSupervisorNames = 'leader_supervisor_names',
  leaderSupervisorLastNames = 'leader_supervisor_last_names',
  leaderSupervisorFullName = 'leader_supervisor_full_name',
  supervisorNames = 'leader_names',
  supervisorLastNames = 'leader_last_names',
  supervisorFullName = 'leader_full_name',


  //* Module Family Home
  familyHousePastorNames = 'family_house_pastor_names',
  familyHousePastorLastName = 'family_house_pastor_last_names',
  familyHousePastorFullName = 'family_house_pastor_full_name',
  familyHouseCopastorNames = 'family_house_copastor_names',
  familyHouseCopastorLastaNames = 'family_house_copastor_last_names',
  familyHouseCopastorFullName = 'family_house_copastor_full_name',
  familyHouseSupervisorNames = 'family_house_supervisor_names',
  familyHouseSupervisorLastNames = 'family_house_supervisor_last_names',
  familyHouseSupervisorFullName = 'family_house_supervisor_full_name',
  familyHousePreacherNames = 'family_house_preacher_names',
  familyHousePreacherLastNames = 'family_house_preacher_last_names',
  familyHousePreacherFullName = 'family_house_preacher_full_name',

  //* Tithe
  titheNames = 'tithe_names',
  titheLastNames = 'tithe_last_names',
  titheFullNames = 'tithe_full_names',
  titheDate = 'tithe_date',
  titheDateNames = 'tithe_date_names',
  titheDateLastNames = 'tithe_date_last_names',
  titheDateFullName = 'tithe_date_full_name',

  //* Offering
  //* Family House, Fasting Zonal, Fasting General, Vigil Zonal, vigilia General, Ground Church, Activities, Youngs
  offeringDate = 'offering_date',

  //* Sunday Worship, youngs, school sunday
  offeringShift = 'offering_shift',
  offeringDateShift = 'offering_date_shift',

  //* Family House, Fasting Zonal, Vigil Zonal
  offeringZone = 'offering_zone', 
  offeringDateZone = 'offering_date_zone',

  //* Offering Family House
  offeringDateCodeHouse = 'offering_date_code_house',
  offeringCodeHouse = 'offering_code_house',
  offeringPreacherNames = 'offering_preacher_names',
  offeringPreacherLastNames = 'offering_preacher_last_names',
  offeringPreacherFullName = 'offering_preacher_full_name',

  //* Offering Ayuno y Vigilia Zonal
  offeringCopastorNames = 'offering_copastor_names',
  offeringCopastorLastNames = 'offering_copastor_last_names',
  offeringCopastorFullName = 'offering_copastor_full_name',

  //* Offering Ground Church and Special
  OfferingNames = 'offering_names',
  OfferingLastNames = 'offering_last_names',
  OfferingFullNames = 'offering_full_names',

  //* Users
  userNames = 'user_names',
  userLastNames = 'user_last_names',
  userLastFullName = 'user_last_full_name',
  userRoles = 'user_roles' // multi-select


}

// TODO : en search by term colocar la opción de todos en limite y tmb se podrá escribir

export const SubTypeSearchNames: Record<SubTypeSearch, string> =  {

  none: '',
  
  // TODO : mejorar por nombres ya apellidos para mejor legibilidad (like offering)
  //* Member
  member_pastor_names : 'Buscar miembros por nombres de su pastor',
  member_pastor_last_names : 'Buscar miembros por apellidos de su pastor',
  member_pastor_full_name : 'Buscar miembros por nombres y apellidos de su pastor',
  member_copastor_names : 'Buscar miembros por nombres de su co_pastor',
  member_copastor_last_names : 'Buscar miembros por apellidos de su co_pastor',
  member_copastor_full_name : 'Buscar miembros por nombres y apellidos de su co_pastor',
  member_supervisor_names : 'Buscar miembros por nombres de su supervisor',
  member_supervisor_last_names : 'Buscar miembros por apellidos de su supervisor',
  member_supervisor_full_name : 'Buscar miembros por nombres y apellidos de su supervisor',
  member_preacher_names : 'Buscar miembros por nombres de su predicador',
  member_preacher_last_names : 'Buscar miembros por apellidos de su predicador',
  member_preacher_full_name : 'Buscar miembros por nombres y apellidos de su predicador',
  member_names : 'Buscar miembros por sus propios nombres',
  member_last_names : 'Buscar miembros por sus propios apellidos',
  member_full_name : 'Buscar miembros por sus propios nombres y apellidos',

  //* Pastor
  pastor_names: 'Buscar pastores por sus nombres', 
  pastor_last_names: 'Buscar pastores por sus apellidos', 
  pastor_full_name: 'Buscar pastores por sus nombres y apellidos', 

  //* Copastor
  copastor_pastor_names : 'Buscar co-pastores por nombres de su pastor',
  copastor_pastor_last_names : 'Buscar co-pastores por apellidos de su pastor',
  copastor_pastor_full_name : 'Buscar co-pastores por nombres y apellidos de su pastor',
  copastor_names : 'Buscar co-pastores por sus propios nombres',
  copastor_last_names : 'Buscar co-pastores por sus propios apellidos',
  copastor_full_name : 'Buscar co-pastores por sus propios nombres y apellidos',

  //* Leaders
  leader_pastor_names : 'Buscar lideres por nombres de su pastor',
  leader_pastor_last_names : 'Buscar lideres por apellidos de su pastor',
  leader_pastor_full_name : 'Buscar lideres por nombres y apellidos de su pastor',
  leader_copastor_names: 'Buscar lideres por nombres de su co_pastor',
  leader_copastor_last_names: 'Buscar lideres por apellidos de su co_pastor',
  leader_copastor_full_name: 'Buscar lideres por nombres y apellidos de su co_pastor',
  leader_supervisor_names: 'Buscar lideres por nombres de su supervisor',
  leader_supervisor_last_names: 'Buscar lideres por apellidos de su supervisor',
  leader_supervisor_full_name: 'Buscar lideres por nombres y apellidos de su supervisor',
  leader_names: 'Buscar lideres por sus propios nombres',
  leader_last_names: 'Buscar lideres por sus propios apellidos',
  leader_full_name: 'Buscar lideres por sus propios nombres y apellidos',

  //* Family House
  family_house_pastor_names: 'Buscar casas por nombres de su pastor',
  family_house_pastor_last_names: 'Buscar casas por apellidos de su pastor',
  family_house_pastor_full_name: 'Buscar casas por nombres y apellidos de su pastor',
  family_house_copastor_names: 'Buscar casas por nombres de su co_pastor',
  family_house_copastor_last_names: 'Buscar casas por apellidos de su co_pastor',
  family_house_copastor_full_name: 'Buscar casas por nombres y apellidos de su co_pastor',
  family_house_supervisor_names: 'Buscar casas por nombres de su supervisor',
  family_house_supervisor_last_names: 'Buscar casas por apellidos de su supervisor',
  family_house_supervisor_full_name: 'Buscar casas por nombres y apellidos de su supervisor',
  family_house_preacher_names: 'Buscar casas por nombres de su predicador',
  family_house_preacher_last_names: 'Buscar casas por apellidos de su predicador',
  family_house_preacher_full_name: 'Buscar casas por nombres y apellidos de su predicador',

  //* Tithe
  tithe_names: 'Buscar diezmos por nombres',
  tithe_last_names: 'Buscar diezmos por apellidos',
  tithe_full_names: 'Buscar diezmos por nombres y apellidos',
  tithe_date: 'Buscar diezmos por fecha',
  tithe_date_names: 'Buscar diezmos por nombres y fecha',
  tithe_date_last_names: 'Buscar diezmos por apellidos y fechas',
  tithe_date_full_name: 'Buscar diezmos por nombres, apellidos y fecha',


  //* Offering
  //* Sunday Worship, Family House, Fasting Zonal, Fasting General, Vigil Zonal, vigilia General, Ground Church, Activities, Youngs
  offering_date: 'Buscar ofrendas por fecha',

  //* Sunday Worship, youngs, school sunday
  offering_shift: 'Buscar ofrendas por turno',
  offering_date_shift: 'Buscar ofrendas por fecha y turno',


  //* Family House, Fasting Zonal, Vigil Zonal
  offering_zone: 'Buscar ofrendas por zona',
  offering_date_zone: 'Buscar ofrendas por zona y fecha',

  //* Family House
  offering_preacher_names: 'Buscar ofrendas por nombres de predicador',
  offering_preacher_last_names: 'Buscar ofrendas por apellidos de predicador',
  offering_preacher_full_name: 'Buscar ofrendas por nombres y apellidos de predicador',
  offering_code_house: 'Buscar ofrendas por código',
  offering_date_code_house: 'Buscar ofrendas por código y fecha',

  //* Offering Ayuno Zonal y Vigilia Zonal
  offering_copastor_names: 'Buscar ofrendas por nombres de co-pastor',
  offering_copastor_last_names: 'Buscar ofrendas por apellidos de co-pastor',
  offering_copastor_full_name: 'Buscar ofrendas por nombres y apellidos de co-pastor',

  //* Offering Ground Church and Special
  offering_names: 'Buscar ofrendas por nombres',
  offering_last_names: 'Buscar ofrendas por apellidos',
  offering_full_names: 'Buscar ofrendas por nombres y apellidos',

  //* Users
  user_names : 'Buscar usuarios por sus propios nombres',
  user_last_names: 'Buscar usuarios por sus propios apellidos',
  user_last_full_name: 'Buscar usuarios por sus propios nombres y apellidos',
  user_roles: 'Buscar usuarios por sus roles' // multi-select

}


//! Colocar buscar por nombres apellidos o full
// NOTE : tomar esto para hacer los search en el backend
//* Diezmo por subtipo por nombre, apellido, full, fecha sola (rango), fecha con fullname, con nombre y apellido. /
//* Culto dominical mostrar input fecha y select de turno, ambos son opcionales (si no manda fecha busca general). / Hacer búsqueda por turno, por fecha y combinado, hacer un DTO de los query que vienen validar y si existen hacer cierta consulta en DB.
//* Casa familiar es por subtipo, fecha(rango), código, predicador, zona, por fecha y code, fecha y zona.
//* Ayuno general mostrar input fecha (rango).
//* Ayuno Zonal es por subtipo, fecha(rango), zona, copastor, por fecha y zona.
//* Vigilia general mostrar input fecha (rango).
//* Vigilia Zonal es por subtipo, fecha (rango), zona, copastor, por fecha y zona.
//* Escuela Dominical mostrar input fecha y select de turno, ambos son opcionales (si no manda fecha busca general).
//* Culto Jóvenes mostrar input fecha (rango).
//* Actividades mostrar input fecha (rango).
//* Terreno Iglesia es por fecha(rango), nombre, apellido, o full name.
//* Especial es por fecha(rango), nombre apellido, full name.

// TODO : usar react select para tener un select y poder escribir al mismo tiempo. (validar con el schema)