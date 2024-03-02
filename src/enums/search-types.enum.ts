export enum TypeSearch {

  //* Members, Pastor, Copastor, Supervisor, Preacher, Offering, User
  firstName = 'first_name',
  lastName = 'last_name',
  fullName = 'full_name',

  //* Members, Pastor, Copastor, Supervisor, Preacher
  dateBirth = 'date_birth', // rango
  monthBirth = 'month_birth', // mes de nacimiento, comparar con DB.
  gender = 'gender',
  maritalStatus = 'marital_status',

  //* Members, Supervisor, Preacher, Family House
  zone = 'zone',
  
  //* Members, Supervisor, Preacher, Fam. House, 
  code = 'code',
  name_house = 'name_house',

  //* Members, Pastor, Copastor, Sup, Preacher, Family House
  address = 'address',
  
  //* Members, Pastor, Copastor, Supervisor, Preacher.
  originCountry = 'origin_country' ,

  //* Members, Pastor, Copastor, Supervisor, Preacher, Family House
  department = 'department',
  province = 'province',
  district = 'district',

  //* Members, Pastor, Copastor, Supervisor, Preacher, Fam. House, Offering, User
  isActive = 'is_active',
  
  //* Members, User
  roles = 'roles',

  //* Offering (buscar ofrendas por diezmo y ofrenda)
  tithe = 'tithe',
  sunday_worship = 'sunday_worship',
  family_house = 'family_house',
  general_fasting = 'general_fasting',
  general_vigil = 'general_vigil',
  zonal_fasting = 'zonal_fasting',
  zonal_vigil = 'zonal_vigil',
  sunday_school = 'sunday_school',
  youth_worship = 'youth_worship',
  activities = 'activities',
  church_ground = 'church_ground',
  special = 'special',


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

  is_active : 'Estado',

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
  special: 'Especial',

  
}
