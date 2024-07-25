export enum FamilyGroupSearchType {
  FirstName = 'first_name',
  LastName = 'last_name',
  FullName = 'full_name',
  ZoneName = 'zone_name',
  FamilyGroupCode = 'family_group_code',
  FamilyGroupName = 'family_group_name',
  Department = 'department',
  Province = 'province',
  District = 'district',
  UrbanSector = 'urban_sector',
  Address = 'address',
  RecordStatus = 'record_status',
}

export const FamilyGroupSearchTypeNames: Record<FamilyGroupSearchType, string> =  {
  [FamilyGroupSearchType.FirstName]: 'Nombres',
  [FamilyGroupSearchType.LastName]: 'Apellidos',
  [FamilyGroupSearchType.FullName]: 'Nombres y Apellidos',
  [FamilyGroupSearchType.ZoneName]: 'Nombre de Zona',
  [FamilyGroupSearchType.FamilyGroupCode]: 'Código de grupo familiar',
  [FamilyGroupSearchType.FamilyGroupName]: 'Nombre de grupo familiar',
  [FamilyGroupSearchType.Department]: 'Departamento',
  [FamilyGroupSearchType.Province]: 'Provincia',
  [FamilyGroupSearchType.District]: 'Distrito',
  [FamilyGroupSearchType.UrbanSector]: 'Sector Urbano',
  [FamilyGroupSearchType.Address]: 'Dirección',
  [FamilyGroupSearchType.RecordStatus]: 'Estado de registro',
}
