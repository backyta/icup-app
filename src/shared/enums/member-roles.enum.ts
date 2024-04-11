export enum MemberRoles {
  Member = 'member',
  Pastor = 'pastor',
  Copastor = 'copastor',
  Supervisor = 'supervisor',
  Preacher = 'preacher',
  Treasurer = 'treasurer',
}

export const MemberRoleNames: Record<MemberRoles, string> = {
  member: 'Miembro',
  pastor: 'Pastor',
  copastor: 'Co-pastor',
  supervisor: 'Supervisor',
  preacher: 'Predicador',
  treasurer: 'Tesorero',
};

// Note: Serán llamados discípulos todos, pero en los roles (cargos) se diferencian por roles.

