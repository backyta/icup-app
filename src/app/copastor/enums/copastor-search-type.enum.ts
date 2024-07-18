export enum CopastorSearchType {
  FirstName = 'first_name',
  LastName = 'last_name',
  FullName = 'full_name',
  BirthDate = 'birth_date', 
  BirthMonth = 'birth_month', 
  Gender = 'gender',
  MaritalStatus = 'marital_status',
  OriginCountry = 'origin_country' ,
  Department = 'department',
  Province = 'province',
  District = 'district',
  UrbanSector = 'urban_sector',
  Address = 'address',
  RecordStatus = 'record_status',

}

export const CopastorSearchTypeNames: Record<CopastorSearchType, string> = {
  [CopastorSearchType.FirstName]: 'Nombres',
  [CopastorSearchType.LastName]: 'Apellidos',
  [CopastorSearchType.FullName]: 'Nombres y Apellidos',
  [CopastorSearchType.BirthDate]: 'Fecha de nacimiento',
  [CopastorSearchType.BirthMonth]: 'Mes de nacimiento',
  [CopastorSearchType.Gender]: 'Género',
  [CopastorSearchType.MaritalStatus]: 'Estado civil',
  [CopastorSearchType.OriginCountry]: 'País de origen',
  [CopastorSearchType.Department]: 'Departamento',
  [CopastorSearchType.Province]: 'Provincia',
  [CopastorSearchType.District]: 'Distrito',
  [CopastorSearchType.UrbanSector]: 'Sector Urbano',
  [CopastorSearchType.Address]: 'Dirección',
  [CopastorSearchType.RecordStatus]: 'Estado de registro',
};
