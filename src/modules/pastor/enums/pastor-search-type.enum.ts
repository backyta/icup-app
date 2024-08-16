export enum PastorSearchType {
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

export const PastorSearchTypeNames: Record<PastorSearchType, string> = {
  [PastorSearchType.FirstName]: 'Nombres',
  [PastorSearchType.LastName]: 'Apellidos',
  [PastorSearchType.FullName]: 'Nombres y Apellidos',
  [PastorSearchType.BirthDate]: 'Fecha de nacimiento',
  [PastorSearchType.BirthMonth]: 'Mes de nacimiento',
  [PastorSearchType.Gender]: 'Género',
  [PastorSearchType.MaritalStatus]: 'Estado civil',
  [PastorSearchType.OriginCountry]: 'País de origen',
  [PastorSearchType.Department]: 'Departamento',
  [PastorSearchType.Province]: 'Provincia',
  [PastorSearchType.District]: 'Distrito',
  [PastorSearchType.UrbanSector]: 'Sector Urbano',
  [PastorSearchType.Address]: 'Dirección',
  [PastorSearchType.RecordStatus]: 'Estado de registro',
};

// TODO : rol de consejo de ancianos ?? esta por encima del pastor o hacer rol extra en tabla (para que cresa el sistema)