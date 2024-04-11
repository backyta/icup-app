export enum SubTypeSearch {

  //! Member
  MemberPastorNames = 'member_pastor_names',
  MemberPastorLastNames = 'member_pastor_last_names',
  MemberPastorFullName = 'member_pastor_full_name',
  MemberCopastorNames = 'member_copastor_names',
  MemberCopastorLastNames = 'member_copastor_last_names',
  MemberCopastorFullName = 'member_copastor_full_name',
  MemberSupervisorNames = 'member_supervisor_names',
  MemberSupervisorLastNames = 'member_supervisor_last_names',
  MemberSupervisorFullName = 'member_supervisor_full_name',
  MemberPreacherNames = 'member_preacher_names',
  MemberPreacherLastNames = 'member_preacher_last_names',
  MemberPreacherFullName = 'member_preacher_full_name',
  MemberNames = 'member_names',
  MemberLastNames = 'member_last_names',
  MemberFullName = 'member_full_name',

  //! Pastor
  PastorNames = 'pastor_names',
  PastorLastNames = 'pastor_last_names',
  PastorFullName = 'pastor_full_name',

  //! Copastor
  CopastorPastorNames = 'copastor_pastor_names',
  CopastorPastorLastNames = 'copastor_pastor_last_names',
  CopastorPastorFullName = 'copastor_pastor_full_name',
  CopastorNames = 'copastor_names',
  CopastorLastNames = 'copastor_last_names',
  CopastorFullName = 'copastor_full_name',

  //! Leaders
  LeaderPastorNames = 'leader_pastor_names',
  LeaderPastorLastNames = 'leader_pastor_last_names',
  LeaderPastorFullName = 'leader_pastor_full_name',
  LeaderCopastorNames = 'leader_copastor_names',
  LeaderCopastorLastNames = 'leader_copastor_last_names',
  LeaderCopastorFullName = 'leader_copastor_full_name',
  LeaderSupervisorNames = 'leader_supervisor_names',
  LeaderSupervisorLastNames = 'leader_supervisor_last_names',
  LeaderSupervisorFullName = 'leader_supervisor_full_name',
  LeaderNames = 'leader_names',
  LeaderLastNames = 'leader_last_names',
  LeaderFullName = 'leader_full_name',


  //! Module Family Home
  FamilyHousePastorNames = 'family_house_pastor_names',
  FamilyHousePastorLastName = 'family_house_pastor_last_names',
  FamilyHousePastorFullName = 'family_house_pastor_full_name',
  FamilyHouseCopastorNames = 'family_house_copastor_names',
  FamilyHouseCopastorLastaNames = 'family_house_copastor_last_names',
  FamilyHouseCopastorFullName = 'family_house_copastor_full_name',
  FamilyHouseSupervisorNames = 'family_house_supervisor_names',
  FamilyHouseSupervisorLastNames = 'family_house_supervisor_last_names',
  FamilyHouseSupervisorFullName = 'family_house_supervisor_full_name',
  FamilyHousePreacherNames = 'family_house_preacher_names',
  FamilyHousePreacherLastNames = 'family_house_preacher_last_names',
  FamilyHousePreacherFullName = 'family_house_preacher_full_name',

  //! Tithe
  TitheNames = 'tithe_names',
  TitheLastNames = 'tithe_last_names',
  TitheFullNames = 'tithe_full_names',
  TitheDate = 'tithe_date',
  TitheDateNames = 'tithe_date_names',
  TitheDateLastNames = 'tithe_date_last_names',
  TitheDateFullName = 'tithe_date_full_name',

  //! Offering
  //* Family House, Fasting Zonal, Fasting General, Vigil Zonal, vigilia General, Ground Church, Activities, Youngs
  OfferingDate = 'offering_date',

  //* Sunday Worship, youngs, school sunday
  OfferingShift = 'offering_shift',
  OfferingDateShift = 'offering_date_shift',

  //* Family House, Fasting Zonal, Vigil Zonal
  OfferingZone = 'offering_zone', 
  OfferingDateZone = 'offering_date_zone',

  //* Offering Family House
  OfferingDateCodeHouse = 'offering_date_code_house',
  OfferingCodeHouse = 'offering_code_house',
  OfferingPreacherNames = 'offering_preacher_names',
  OfferingPreacherLastNames = 'offering_preacher_last_names',
  OfferingPreacherFullName = 'offering_preacher_full_name',

  //* Offering Ayuno y Vigilia Zonal
  OfferingCopastorNames = 'offering_copastor_names',
  OfferingCopastorLastNames = 'offering_copastor_last_names',
  OfferingCopastorFullName = 'offering_copastor_full_name',

  //* Offering Ground Church and Special
  OfferingNames = 'offering_names',
  OfferingLastNames = 'offering_last_names',
  OfferingFullNames = 'offering_full_names',

  //* Users
  UserNames = 'user_names',
  UserLastNames = 'user_last_names',
  UserFullName = 'user_full_name',
  UserRoles = 'user_roles' // multi-select


}

export const SubTypeSearchNames: Record<SubTypeSearch, string> =  {

  //* Member
  'member_pastor_names' : 'Buscar por nombres de su pastor',
  'member_pastor_last_names' : 'Buscar por apellidos de su pastor',
  'member_pastor_full_name' : 'Buscar por nombres y apellidos de su pastor',
  'member_copastor_names' : 'Buscar por nombres de su co_pastor',
  'member_copastor_last_names' : 'Buscar por apellidos de su co_pastor',
  'member_copastor_full_name' : 'Buscar por nombres y apellidos de su co_pastor',
  'member_supervisor_names' : 'Buscar por nombres de su supervisor',
  'member_supervisor_last_names' : 'Buscar por apellidos de su supervisor',
  'member_supervisor_full_name' : 'Buscar por nombres y apellidos de su supervisor',
  'member_preacher_names' : 'Buscar por nombres de su predicador',
  'member_preacher_last_names' : 'Buscar por apellidos de su predicador',
  'member_preacher_full_name' : 'Buscar por nombres y apellidos de su predicador',
  'member_names' : 'Buscar por sus propios nombres',
  'member_last_names' : 'Buscar por sus propios apellidos',
  'member_full_name' : 'Buscar por sus propios nombres y apellidos',

  //* Pastor
  'pastor_names': 'Buscar por sus nombres', 
  'pastor_last_names': 'Buscar por sus apellidos', 
  'pastor_full_name': 'Buscar por sus nombres y apellidos', 

  //* Copastor
  'copastor_pastor_names' : 'Buscar por nombres de su pastor',
  'copastor_pastor_last_names' : 'Buscar por apellidos de su pastor',
  'copastor_pastor_full_name' : 'Buscar por nombres y apellidos de su pastor',
  'copastor_names' : 'Buscar por sus propios nombres',
  'copastor_last_names' : 'Buscar por sus propios apellidos',
  'copastor_full_name' : 'Buscar por sus propios nombres y apellidos',

  //* Leaders
  'leader_pastor_names' : 'Buscar por nombres de su pastor',
  'leader_pastor_last_names' : 'Buscar por apellidos de su pastor',
  'leader_pastor_full_name' : 'Buscar por nombres y apellidos de su pastor',
  'leader_copastor_names': 'Buscar por nombres de su co_pastor',
  'leader_copastor_last_names': 'Buscar por apellidos de su co_pastor',
  'leader_copastor_full_name': 'Buscar por nombres y apellidos de su co_pastor',
  'leader_supervisor_names': 'Buscar por nombres de su supervisor',
  'leader_supervisor_last_names': 'Buscar por apellidos de su supervisor',
  'leader_supervisor_full_name': 'Buscar por nombres y apellidos de su supervisor',
  'leader_names': 'Buscar por sus propios nombres',
  'leader_last_names': 'Buscar por sus propios apellidos',
  'leader_full_name': 'Buscar por sus propios nombres y apellidos',

  //* Family House
  'family_house_pastor_names': 'Buscar por nombres de su pastor',
  'family_house_pastor_last_names': 'Buscar por apellidos de su pastor',
  'family_house_pastor_full_name': 'Buscar por nombres y apellidos de su pastor',
  'family_house_copastor_names': 'Buscar por nombres de su co_pastor',
  'family_house_copastor_last_names': 'Buscar por apellidos de su co_pastor',
  'family_house_copastor_full_name': 'Buscar por nombres y apellidos de su co_pastor',
  'family_house_supervisor_names': 'Buscar por nombres de su supervisor',
  'family_house_supervisor_last_names': 'Buscar por apellidos de su supervisor',
  'family_house_supervisor_full_name': 'Buscar por nombres y apellidos de su supervisor',
  'family_house_preacher_names': 'Buscar por nombres de su predicador',
  'family_house_preacher_last_names': 'Buscar por apellidos de su predicador',
  'family_house_preacher_full_name': 'Buscar por nombres y apellidos de su predicador',

  //* Tithe
  'tithe_names': 'Buscar por nombres',
  'tithe_last_names': 'Buscar por apellidos',
  'tithe_full_names': 'Buscar por nombres y apellidos',
  'tithe_date': 'Buscar por fecha',
  'tithe_date_names': 'Buscar por nombres y fecha',
  'tithe_date_last_names': 'Buscar por apellidos y fechas',
  'tithe_date_full_name': 'Buscar por nombres, apellidos y fecha',


  //* Offering
  //* Sunday Worship, Family House, Fasting Zonal, Fasting General, Vigil Zonal, vigilia General, Ground Church, Activities, Youngs
  'offering_date': 'Buscar por fecha',

  //* Sunday Worship, youngs, school sunday
  'offering_shift': 'Buscar por turno',
  'offering_date_shift': 'Buscar por fecha y turno',


  //* Family House, Fasting Zonal, Vigil Zonal
  'offering_zone': 'Buscar por zona',
  'offering_date_zone': 'Buscar por zona y fecha',

  //* Family House
  'offering_preacher_names': 'Buscar por nombres de predicador',
  'offering_preacher_last_names': 'Buscar por apellidos de predicador',
  'offering_preacher_full_name': 'Buscar por nombres y apellidos de predicador',
  'offering_code_house': 'Buscar por código de casa',
  'offering_date_code_house': 'Buscar por código y fecha',

  //* Offering Ayuno Zonal y Vigilia Zonal
  'offering_copastor_names': 'Buscar por nombres de co-pastor',
  'offering_copastor_last_names': 'Buscar por apellidos de co-pastor',
  'offering_copastor_full_name': 'Buscar por nombres y apellidos de co-pastor',

  //* Offering Ground Church and Special
  'offering_names': 'Buscar por nombres',
  'offering_last_names': 'Buscar por apellidos',
  'offering_full_names': 'Buscar por nombres y apellidos',

  //* Users
  'user_names' : 'Buscar por sus propios nombres',
  'user_last_names': 'Buscar por sus propios apellidos',
  'user_full_name': 'Buscar por sus propios nombres y apellidos',
  'user_roles': 'Buscar por sus roles' // multi-select

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

