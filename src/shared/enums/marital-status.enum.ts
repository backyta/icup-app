export enum MaritalStatus {
  Single = 'single',
  Married = 'married',
  Widowed = 'widowed',
  Divorced = 'divorced',
  Other = 'other',
}

export const MaritalStatusNames: Record<MaritalStatus, string> = {
  [MaritalStatus.Single]: 'Soltero(a)',
  [MaritalStatus.Married]: 'Casado(a)',
  [MaritalStatus.Widowed]: 'Viudo(a)',
  [MaritalStatus.Divorced]: 'Divorciado(a)',
  [MaritalStatus.Other]: 'Otro',
};
