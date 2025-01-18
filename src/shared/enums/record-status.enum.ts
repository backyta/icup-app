export enum RecordStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export const RecordStatusNames: Record<RecordStatus, string> = {
  [RecordStatus.Active]: 'Activo',
  [RecordStatus.Inactive]: 'Inactivo',
};
