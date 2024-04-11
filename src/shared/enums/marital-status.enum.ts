export enum MaritalStatus {
  Single = 'single',
  Married = 'married',
  Widowed = 'widowed',
  Divorced = 'divorced',
  Other = 'other',
}

export const MaritalStatusNames: Record<MaritalStatus, string> = {
  single : 'Soltero(a)',
  married : 'Casado(a)',
  widowed : 'Viudo(a)',
  divorced : 'Divorciada(a)',
  other : 'Otro',

}