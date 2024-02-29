export enum MaritalStatus {
  single = 'single',
  married = 'married',
  widowed = 'widowed',
  divorced = 'divorced',
  other = 'other',
}


export const MaritalStatusNames: Record<MaritalStatus, string> = {
  single : 'Soltero(a)',
  married : 'Casado(a)',
  widowed : 'Viudo(a)',
  divorced : 'Divorciada(a)',
  other : 'Otro',

}