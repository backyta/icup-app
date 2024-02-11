export enum MemberRoles {
  member = 'member',
  pastor = 'pastor',
  copastor = 'copastor',
  preacher = 'preacher',
  supervisor = 'supervisor',
  treasurer = 'treasurer',
}

export const roleNames: Record<MemberRoles, string> = {
  member: 'Miembro',
  pastor: 'Pastor',
  copastor: 'Co-pastor',
  preacher: 'Predicador',
  supervisor: 'Supervisor',
  treasurer: 'Tesorero',
};

// Note: Serán llamados discípulos todos, pero en los roles (cargos) se diferencian por roles
