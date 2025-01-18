export enum Gender {
  Male = 'male',
  Female = 'female',
}

export const GenderNames: Record<Gender, string> = {
  [Gender.Male]: 'Masculino',
  [Gender.Female]: 'Femenino',
};
