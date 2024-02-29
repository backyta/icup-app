export enum SubTypeSearch {

  //* Member
  memberPastor = 'member_pastor',
  memberCopastor = 'member_copastor',
  memberSupervisor = 'member_supervisor',
  memberPreacher = 'member_preacher',
  memberNames = 'member_names',

  //* Pastor
  pastorNames = 'pastor_names',

  //* Copastor
  copastorPastor = 'copastor_pastor',
  copastorNames = 'copastor_names',

  //* Leaders
  leaderPastor = 'leader_pastor',
  leaderCopastor = 'leader_copastor',
  leaderSupervisor = 'leader_supervisor',
  supervisorNames = 'leader_names',


  //* Module Family Home
  familyHousePastor = 'family_house_pastor',
  familyHouseCopastor = 'family_house_copastor',
  familyHouseSupervisor = 'family_house_supervisor',
  familyHousePreacher = 'family_house_preacher',
  familyHouseName = 'family_house_name',

  //* Offering

  offeringCopastor = 'offering_copastor', // ver si se pone el house para preacher y copastor.
  offeringPreacher = 'offering_preacher',
  offeringMember = 'offering_member',

  //* Tithe
  titheNames = 'tithe_names',
  titheLastNames = 'tithe_last_names',
  titheFullNames = 'tithe_full_names',
  titheDate = 'tithe_date',
  titheDateNames = 'tithe_date_names',
  titheDateLastNames = 'tithe_date_last_names',
  titheDateFullName = 'tithe_date_full_name',

  //* Offering Dominical y Escuela Dominical
    //! No tiene es directo con el type
  
  //* Offering Family House
  offeringZone = 'offering_zone', // ayuno zonal, vigilia zonal 
  offeringDate = 'offering_date', // ayuno zonal, ayuno general, vigilia zonal, vigilia general, terreno iglesia, actividades, jóvenes
  offeringDateZone = 'offering_date_zone', // ayuno zonal, vigilia zonal
  offeringDateCodeHouse = 'offering_date_code_house',
  offeringCodeHouse = 'offering_code_house',
  offeringPreacherNames = 'offering_preacher_names',
  offeringPreacherLastNames = 'offering_preacher_last_names',

  //* Offering Ayuno, Vigilia general, Culto de Jóvenes, Actividades
    //! No tiene es directo con el type

  //* Offering Ayuno y Vigilia Zonal
    offeringCopastorNames = 'offering_copastor_names',
    offeringCopastorLastNames = 'offering_copastor_last_names',

  //* Offering Terrero Iglesia y Especial
    OfferingNames = 'offering_names',
    OfferingLastNames = 'offering_last_names',
    OfferingFullNames = 'offering_full_names',


  //* Users
  userName = 'user_names'

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



}


export const SubTypeSearchNames: Record<SubTypeSearch, string> =  {
  
  // TODO : mejorar por nombres ya apellidos para mejor legibilidad (like offering)
  //* Member
  member_pastor : 'Buscar miembros por nombres de su pastor',
  member_copastor : 'Buscar miembros por nombres de su co_pastor',
  member_supervisor : 'Buscar miembros por nombres de su supervisor',
  member_preacher : 'Buscar miembros por nombres de su predicador',
  member_names : 'Buscar miembros por sus propios nombres',

  //* Pastor
  pastor_names: 'Buscar pastores por sus propios nombres', 

  //* Copastor
  copastor_pastor : 'Buscar co_pastores por nombres de su pastor',
  copastor_names : 'Buscar co_pastores por sus propios nombres ',

  //* Leaders
  leader_pastor : 'Buscar lideres por nombres de su pastor',
  leader_copastor: 'Buscar lideres por nombres de su co_pastor',
  leader_supervisor: 'Buscar lideres por nombres de su supervisor',
  leader_names: 'Buscar lideres por sus propios nombres',


  //* Family House
  family_house_pastor: 'Buscar casas por nombres de su pastor',
  family_house_copastor: 'Buscar casas por nombres de su co_pastor',
  family_house_supervisor: 'Buscar casas por nombres de su supervisor',
  family_house_preacher: 'Buscar casas por nombres de su predicador',
  family_house_name: 'Buscar casas por su propio nombre',

  //* Offering
  offering_copastor : 'Buscar ofrendas por nombres de su co_pastor',
  offering_preacher : 'Buscar ofrendas por nombres de su predicador',
  offering_member : 'Buscar ofrendas por nombres de miembro',

  //* Users
  user_names : 'Buscar usuarios por sus propios nombres',

  offering_date : 'Buscar ofrendas por rango de fecha', // range
}