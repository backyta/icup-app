export enum UserSearchType {
  FirstNames = 'first_names',
  LastNames = 'last_names',
  FullName = 'full_name',
  Gender = 'gender',
  Roles = 'roles',
  RecordStatus = 'record_status',
}

export const UserSearchTypeNames: Record<UserSearchType, string> =  {
  [UserSearchType.FirstNames]: 'Nombres',
  [UserSearchType.LastNames]: 'Apellidos',
  [UserSearchType.FullName]: 'Nombres y Apellidos',
  [UserSearchType.Gender]: 'Género',
  [UserSearchType.Roles]: 'Roles',
  [UserSearchType.RecordStatus]: 'Estado de registro',
}
