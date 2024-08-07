export enum OfferingIncomeSearchType {
  FirstName = 'first_name',
  LastName = 'last_name',
  FullName = 'full_name',
  BirthDate = 'birth_date', 
  BirthMonth = 'birth_month', 
  Gender = 'gender',
  MaritalStatus = 'marital_status',
  OriginCountry = 'origin_country' ,
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

export const OfferingIncomeSearchTypeNames: Record<OfferingIncomeSearchType, string> =  {
  [OfferingIncomeSearchType.FirstName]: 'Nombres',
  [OfferingIncomeSearchType.LastName]: 'Apellidos',
  [OfferingIncomeSearchType.FullName]: 'Nombres y Apellidos',
  [OfferingIncomeSearchType.BirthDate]: 'Fecha de nacimiento',
  [OfferingIncomeSearchType.BirthMonth]: 'Mes de nacimiento',
  [OfferingIncomeSearchType.Gender]: 'Género',
  [OfferingIncomeSearchType.MaritalStatus]: 'Estado civil',
  [OfferingIncomeSearchType.OriginCountry]: 'País de origen',
  [OfferingIncomeSearchType.ZoneName]: 'Nombre de Zona',
  [OfferingIncomeSearchType.FamilyGroupCode]: 'Código de grupo familiar',
  [OfferingIncomeSearchType.FamilyGroupName]: 'Nombre de grupo familiar',
  [OfferingIncomeSearchType.Department]: 'Departamento',
  [OfferingIncomeSearchType.Province]: 'Provincia',
  [OfferingIncomeSearchType.District]: 'Distrito',
  [OfferingIncomeSearchType.UrbanSector]: 'Sector Urbano',
  [OfferingIncomeSearchType.Address]: 'Dirección',
  [OfferingIncomeSearchType.RecordStatus]: 'Estado de registro',
}

// TODO : cambiar los ofering types y subtypes