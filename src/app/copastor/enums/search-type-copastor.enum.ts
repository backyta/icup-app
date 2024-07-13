export enum SearchTypeCopastor {
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
  Status = 'status',

}

export const SearchTypeCopastorKeys: Record<SearchTypeCopastor, string> =  {
  first_name : 'Nombres',
  last_name : 'Apellidos',
  full_name : 'Nombres y Apellidos',
  birth_date: 'Fecha de nacimiento',
  birth_month: 'Mes de nacimiento',
  gender : 'Genero',
  marital_status : 'Estado civil',
  origin_country : 'País de origen' ,
  department : 'Departamento',
  province : 'Provincia',
  district : 'Distrito',
  urban_sector: 'Sector Urbano',
  address : 'Dirección',
  status : 'Estado de registro',
}
