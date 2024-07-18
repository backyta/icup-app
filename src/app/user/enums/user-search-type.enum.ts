export enum UserSearchType {
  FirstName = 'first_name',
  LastName = 'last_name',
  FullName = 'full_name',
  Roles = 'roles',
  RecordStatus = 'record_status',
}

export const UserSearchTypeNames: Record<UserSearchType, string> =  {
  [UserSearchType.FirstName]: 'Nombres',
  [UserSearchType.LastName]: 'Apellidos',
  [UserSearchType.FullName]: 'Nombres y Apellidos',
  [UserSearchType.Roles]: 'Roles',
  [UserSearchType.RecordStatus]: 'Estado de registro',
}
