export enum MemberType {
  Disciple = 'disciple',
  Preacher = 'preacher',
  Supervisor = 'supervisor',
  Copastor = 'copastor',
  Pastor = 'pastor',
}

export const MemberTypeNames: Record<MemberType, string> = {
  [MemberType.Disciple]: 'Discípulo',
  [MemberType.Preacher]: 'Predicador',
  [MemberType.Supervisor]: 'Supervisor',
  [MemberType.Copastor]: 'Copastor',
  [MemberType.Pastor]: 'Pastor',
};