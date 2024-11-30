export enum MemberRole {
  //* Main Roles
  Pastor = 'pastor',
  Copastor = 'copastor',
  Supervisor = 'supervisor',
  Preacher = 'preacher',
  Treasurer = 'treasurer',
  Disciple = 'disciple',

  //* Council of Elders Roles
  Presbyter = 'presbyter',

  //* Ministries Roles
  WorshipMinistryLeader='worship_ministry_leader',
  KidsMinistryLeader='kids_ministry_leader',
  YouthMinistryLeader='youth_ministry_leader',
  IntercessionMinistryLeader='intercession_ministry_leader',
  EvangelismMinistryLeader='evangelism_ministry_leader',
  TechnologyMinistryLeader='technology_ministry_leader',
  DiscipleshipMinistryLeader='discipleship_ministry_leader',

  KidsMinistryTeamMember='kids_ministry_team_member',
  YouthMinistryTeamMember='youth_ministry_team_member',
  WorshipMinistryTeamMember='worship_ministry_team_member',
  IntercessionMinistryTeamMember='intercession_ministry_team_member',
  TechnologyMinistryTeamMember='technology_ministry_team_member',
  DiscipleshipMinistryTeamMember='discipleship_ministry_team_member',
  EvangelismMinistryTeamMember='evangelism_ministry_team_member',
}

export const MemberRoleNames: Record<MemberRole, string> = {
  //* Main Roles
  [MemberRole.Pastor]: 'Pastor(a)',
  [MemberRole.Copastor]: 'Co-Pastor(a)',
  [MemberRole.Supervisor]: 'Supervisor(a)',
  [MemberRole.Preacher]: 'Predicador(a)',
  [MemberRole.Treasurer]: 'Tesorero(a)',
  [MemberRole.Disciple]: 'Discípulo',

  //* Council of Elders Roles
  [MemberRole.Presbyter]: 'Presbítero(a)',

  //* Ministries
  [MemberRole.KidsMinistryLeader]: 'Min. Niños (Líder)',
  [MemberRole.KidsMinistryTeamMember]: 'Min. Niños (Integrante)',
  [MemberRole.YouthMinistryLeader] :'Min. Jóvenes (Líder)',
  [MemberRole.YouthMinistryTeamMember] :'Min. Jóvenes (Integrante)',
  [MemberRole.IntercessionMinistryLeader] :'Min. Intercesión (Líder)',
  [MemberRole.IntercessionMinistryTeamMember] :'Min. Intercesión (Integrante)',
  [MemberRole.EvangelismMinistryLeader] :'Min. Evangelismo (Líder)',
  [MemberRole.EvangelismMinistryTeamMember] :'Min. Evangelismo (Integrante)',
  [MemberRole.TechnologyMinistryLeader] :'Min. Tecnología (Líder)',
  [MemberRole.TechnologyMinistryTeamMember] :'Min. Tecnología (Integrante)',
  [MemberRole.DiscipleshipMinistryLeader] :'Min. Discipulado (Líder)',
  [MemberRole.DiscipleshipMinistryTeamMember] :'Min. Discipulado (Integrante)',
  [MemberRole.WorshipMinistryLeader] :'Min. Alabanza (Líder)',
  [MemberRole.WorshipMinistryTeamMember] :'Min. Alabanza (Integrante)',
};



