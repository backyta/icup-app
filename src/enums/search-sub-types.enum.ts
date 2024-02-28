export enum MemberSubTypeSearch {

  //* Member
  memberPastor = 'member-pastor',
  memberCopastor = 'member-copastor',
  memberSupervisor = 'member-supervisor',
  memberPreacher = 'member-preacher',
  memberNames = 'member-names',

  //* Pastor
  pastorNames = 'pastor-names',

  //* Copastor
  copastorPastor = 'copastor-pastor',
  copastorNames = 'copastor-names',

  //* Leaders
  leaderPastor = 'leader-pastor',
  leaderCopastor = 'leader-copastor',
  leaderSupervisor = 'leader-supervisor',
  supervisorNames = 'leader-names',


  //* Module Family Home
  familyHousePastor = 'family-house-pastor',
  familyHouseCopastor = 'family-house-copastor',
  familyHouseSupervisor = 'family-house-supervisor',
  familyHousePreacher = 'family-house-preacher',
  familyHouseName = 'family-house-name',

  //* Offering
  offeringCopastor = 'offering-house-copastor',
  offeringPreacher = 'offering-house-preacher',
  offeringMember = 'offering-member',

  date = 'offering-date', // range

  //* Users
  userName = 'user-names'


}


export const SubTypeMembersSearchNames: Record<MemberSubTypeSearch, string> =  {
  
  //* Member
  'member-pastor' : 'Buscar miembros por nombres de su pastor',
  'member-copastor' : 'Buscar miembros por nombres de su co-pastor',
  'member-supervisor' : 'Buscar miembros por nombres de su supervisor',
  'member-preacher' : 'Buscar miembros por nombres de su predicador',
  'member-names' : 'Buscar miembros por sus propios nombres',

  //* Pastor
  'pastor-names': 'Buscar pastores por sus propios nombres', 

  //* Copastor
  'copastor-pastor' : 'Buscar co-pastores por nombres de su pastor',
  'copastor-names' : 'Buscar co-pastores por sus propios nombres ',

  //* Leaders
  'leader-pastor' : 'Buscar lideres por nombres de su pastor',
  'leader-copastor': 'Buscar lideres por nombres de su co-pastor',
  'leader-supervisor': 'Buscar lideres por nombres de su supervisor',
  'leader-names': 'Buscar lideres por sus propios nombres',


  //* Family House
  'family-house-pastor': 'Buscar casas por nombres de su pastor',
  'family-house-copastor': 'Buscar casas por nombres de su co-pastor',
  'family-house-supervisor': 'Buscar casas por nombres de su supervisor',
  'family-house-preacher': 'Buscar casas por nombres de su predicador',
  'family-house-name': 'Buscar casas por su propio nombre',

  //* Offering
  'offering-house-copastor': 'Buscar ofrendas por nombres de su co-pastor',
  'offering-house-preacher': 'Buscar ofrendas por nombres de su predicador',
  'offering-member': 'Buscar ofrendas por nombres de miembro',

  //* Users
  'user-names' : 'Buscar usuarios por sus propios nombres',

  'offering-date': 'Buscar ofrendas por rango de fecha', // range
}