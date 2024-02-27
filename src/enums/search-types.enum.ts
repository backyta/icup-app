export enum MemberTypeSearch {

  firstName = 'first_name',
  lastName = 'last_name',
  fullName = 'full_name',

  gender = 'gender',
  maritalStatus = 'marital_status',
  roles = 'roles',
  
  code = 'code',
  zone = 'zone',
  
  originCountry = 'origin_country' ,
  department = 'department',
  province = 'province',
  district = 'district',
  isActive = 'is_active',

}


export const MemberTypeSearchNames: Record<MemberTypeSearch, string> =  {
  
  first_name : 'Nombres',
  last_name : 'Apellidos',
  full_name : 'Nombres y Apellidos',

  gender : 'Genero',
  marital_status : 'Estado Civil',
  
  roles : 'Roles',
  code : 'Código de casa familiar',
  zone : 'Zona',
  
  origin_country : 'País de origen' ,
  department : 'Departamento',
  province : 'Provincia',
  district : 'Distrito',
  is_active : 'Estado',

}
