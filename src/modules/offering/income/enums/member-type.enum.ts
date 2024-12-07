export enum MemberType {
  Disciple = 'disciple',
  Preacher = 'preacher',
  Supervisor = 'supervisor',
  Copastor = 'copastor',
  Pastor = 'pastor',
  ExternalDonor = 'external-donor',
}

export const MemberTypeNames: Record<MemberType, string> = {
  [MemberType.Disciple]: 'Discípulo',
  [MemberType.Preacher]: 'Predicador',
  [MemberType.Supervisor]: 'Supervisor',
  [MemberType.Copastor]: 'Co-Pastor',
  [MemberType.Pastor]: 'Pastor',
  [MemberType.ExternalDonor]: 'Donador Externo',
};
