export enum UserSearchSelectOption {
  //* Gender
  Male = 'male',
  Female = 'female',

  //* Record Status
  Inactive = 'inactive',
}

export const UserSearchSelectOptionNames: Record<UserSearchSelectOption, string> = {
  //* Gender
  [UserSearchSelectOption.Male]: 'Masculino',
  [UserSearchSelectOption.Female]: 'Femenino',

  //* Record Status
  [UserSearchSelectOption.Inactive]: 'Inactivo',
};

//* Status
export enum UserSearchByRecordStatus {
  Inactive = 'inactive',
}

export const UserSearchNamesByRecordStatus: Record<UserSearchByRecordStatus, string> = {
  [UserSearchByRecordStatus.Inactive]: 'Inactivo',
};

//* Gender
export enum UserSearchByGender {
  Male = 'male',
  Female = 'female',
}

export const UserSearchNamesByGender: Record<UserSearchByGender, string> = {
  [UserSearchByGender.Male]: 'Masculino',
  [UserSearchByGender.Female]: 'Femenino',
};
