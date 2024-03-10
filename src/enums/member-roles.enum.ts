export enum MemberRoles {
  member = 'member',
  pastor = 'pastor',
  copastor = 'copastor',
  supervisor = 'supervisor',
  preacher = 'preacher',
  treasurer = 'treasurer',
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

