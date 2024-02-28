export enum MemberTypeSearch {

  //* Members, Pastor, Copastor, Supervisor, Preacher, Offering, User
  firstName = 'first_name',
  lastName = 'last_name',
  fullName = 'full_name',

  //* Members, Pastor, Copastor, Supervisor, Preacher
  date_birth = 'date_birth', // mes de nacimiento, comparar con DB.
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
  offering_sunday_worship = 'offering_sunday_worship',
  offering_family_house = 'offering_family_house',
  offering_general_fasting = 'offering_general_fasting',
  offering_general_vigil = 'offering_general_vigil',
  offering_zonal_fasting = 'offering_zonal_fasting',
  offering_zonal_vigil = 'offering_zonal_vigil',
  offering_sunday_school = 'offering_sunday_school',
  offering_youth_worship = 'offering_youth_worship',
  offering_activities = 'offering_activities',
  offering_church_ground = 'offering_church_ground',
  offering_special = 'offering_special',
  tithe = 'tithe',

}


export const MemberTypeSearchNames: Record<MemberTypeSearch, string> =  {
  
  first_name : 'Nombres',
  last_name : 'Apellidos',
  full_name : 'Nombres y Apellidos',

  date_birth: 'Mes de nacimiento',
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
  is_active : 'Estado',
  
  roles : 'Roles',

  tithe : 'Diezmo',
  offering_sunday_worship: 'Ofrenda Culto Dominical',
  offering_family_house: 'Ofrenda Casa Familiar',
  offering_general_fasting: 'Ofrenda Ayuno General',
  offering_general_vigil: 'Ofrenda Vigilia General',
  offering_zonal_fasting: 'Ofrenda Ayuno Zonal',
  offering_zonal_vigil: 'Ofrenda Vigilia Zonal',
  offering_sunday_school: 'Ofrenda Escuela Dominical',
  offering_youth_worship: 'Ofrenda Culto Jóvenes',
  offering_activities: 'Ofrenda Actividades',
  offering_church_ground: 'Ofrenda Terreno Iglesia',
  offering_special: 'Ofrenda Especial',

  
}
