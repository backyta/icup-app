export enum TypeSearch {

  //* Members, Pastor, Copastor, Supervisor, Preacher, Offering, User
  FirstName = 'first_name',
  LastName = 'last_name',
  FullName = 'full_name',

  //* Members, Pastor, Copastor, Supervisor, Preacher
  DateBirth = 'date_birth', 
  MonthBirth = 'month_birth', 
  Gender = 'gender',
  MaritalStatus = 'marital_status',

  //* Members, Supervisor, Preacher, Family House
  Zone = 'zone',
  
  //* Members, Supervisor, Preacher, Fam. House, 
  Code = 'code',
  Name_house = 'name_house',

  //* Members, Pastor, Copastor, Sup, Preacher, Family House
  Address = 'address',
  
  //* Members, Pastor, Copastor, Supervisor, Preacher.
  OriginCountry = 'origin_country' ,

  //* Members, Pastor, Copastor, Supervisor, Preacher, Family House
  Department = 'department',
  Province = 'province',
  District = 'district',

  //* Members, Pastor, Copastor, Supervisor, Preacher, Fam. House, Offering, User
  Status = 'status',
  
  //* Members, User
  Roles = 'roles',

  //* Offering (buscar ofrendas por diezmo y ofrenda)
  Tithe = 'tithe',
  Sunday_worship = 'sunday_worship',
  Family_house = 'family_house',
  General_fasting = 'general_fasting',
  General_vigil = 'general_vigil',
  Zonal_fasting = 'zonal_fasting',
  Zonal_vigil = 'zonal_vigil',
  Sunday_school = 'sunday_school',
  Youth_worship = 'youth_worship',
  Activities = 'activities',
  Church_ground = 'church_ground',
  Special = 'special',
}


export const TypeSearchNames: Record<TypeSearch, string> =  {
  
  first_name : 'Nombres',
  last_name : 'Apellidos',
  full_name : 'Nombres y Apellidos',

  date_birth: 'Fecha de nacimiento',
  month_birth: 'Mes de nacimiento',
  gender : 'Genero',
  marital_status : 'Estado civil',

  zone : 'Zona',

  code : 'Código de casa familiar',
  name_house : 'Nombre de casa familiar',

  address : 'Dirección',
  
  origin_country : 'País de origen' ,
  department : 'Departamento',
  province : 'Provincia',
  district : 'Distrito',

  roles : 'Roles',

  status : 'Estado',

  tithe : 'Diezmo',
  sunday_worship: 'Ofrenda Culto Dominical',
  family_house: 'Ofrenda Casa Familiar',
  general_fasting: 'Ofrenda Ayuno General',
  zonal_fasting: 'Ofrenda Ayuno Zonal',
  general_vigil: 'Ofrenda Vigilia General',
  zonal_vigil: 'Ofrenda Vigilia Zonal',
  sunday_school: 'Ofrenda Escuela Dominical',
  youth_worship: 'Ofrenda Culto Jóvenes',
  activities: 'Ofrenda Actividades',
  church_ground: 'Ofrenda Terreno Iglesia',
  special: 'Ofrenda Especial',

  
}
