export enum UserSearchType {
  FirstName = 'first_name',
  LastName = 'last_name',
  FullName = 'full_name',
  Gender = 'gender',
  Roles = 'roles',
  RecordStatus = 'record_status',
}

export const UserSearchTypeNames: Record<UserSearchType, string> =  {
  [UserSearchType.FirstName]: 'Nombres',
  [UserSearchType.LastName]: 'Apellidos',
  [UserSearchType.FullName]: 'Nombres y Apellidos',
  [UserSearchType.Gender]: 'Género',
  [UserSearchType.Roles]: 'Roles',
  [UserSearchType.RecordStatus]: 'Estado de registro',
}
