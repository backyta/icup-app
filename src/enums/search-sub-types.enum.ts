export enum MemberSubTypeSearch {

  memberPastor = 'member-pastor',
  memberCopastor = 'member-copastor',
  memberSupervisor = 'member-supervisor',
  memberPreacher = 'member-preacher',
  memberMember = 'member-member',
}


export const SubTypeMembersSearchNames: Record<MemberSubTypeSearch, string> =  {
  
  'member-pastor' : 'Buscar por nombres de su pastor.',
  'member-copastor' : 'Buscar por nombres de su co-pastor.',
  'member-supervisor' : 'Buscar por nombres de su supervisor.',
  'member-preacher' : 'Buscar por nombres de su predicador.',
  'member-member' : 'Buscar por sus propios nombres.',

}
