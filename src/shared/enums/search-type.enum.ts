export enum SearchType {

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
  CodeHouse = 'code_house',
  NameHouse = 'name_house',

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

  //* Offering Income (tithe and offering)
  Tithe = 'tithe',
  SundayWorship = 'sunday_worship',
  FamilyHouse = 'family_house',
  GeneralFasting = 'general_fasting',
  GeneralVigil = 'general_vigil',
  ZonalFasting = 'zonal_fasting',
  ZonalVigil = 'zonal_vigil',
  SundaySchool = 'sunday_school',
  YouthWorship = 'youth_worship',
  UnitedWorship = 'united_worship',
  Activities = 'activities',
  ChurchGround = 'church_ground',
  Special = 'special',
  IncomeAdjustment = 'income_adjustment',
  
  //* Offering Expenses
  OperationalExpenses = "operative_expenses",
  MaintenanceAndRepairExpenses = "maintenance_and_repair_expenses",
  DecorationExpenses = "decoration_expenses",
  EquipmentAndTechnologyExpenses = "equipment_and_technology_expenses",
  SuppliesExpenses = "supplies_expenses",
  ActivitiesAndEventsExpenses = "activities_and_events_expenses",
  ExpensesAdjustment = 'expenses_adjustment',
}

export const SearchTypeNames: Record<SearchType, string> =  {
  
  first_name : 'Nombres',
  last_name : 'Apellidos',
  full_name : 'Nombres y Apellidos',

  date_birth: 'Fecha de nacimiento',
  month_birth: 'Mes de nacimiento',
  gender : 'Genero',
  marital_status : 'Estado civil',

  zone : 'Zona',

  code_house : 'Código de casa familiar',
  name_house : 'Nombre de casa familiar',

  address : 'Dirección',
  
  origin_country : 'País de origen' ,
  department : 'Departamento',
  province : 'Provincia',
  district : 'Distrito',

  roles : 'Roles',

  sunday_worship: 'Ofrendas - Culto Dominical',
  family_house: 'Ofrendas - Casa Familiar',
  general_fasting: 'Ofrendas - Ayuno General',
  zonal_fasting: 'Ofrenda - Ayuno Zonal',
  general_vigil: 'Ofrenda - Vigilia General',
  zonal_vigil: 'Ofrendas - Vigilia Zonal',
  sunday_school: 'Ofrendas - Escuela Dominical',
  youth_worship: 'Ofrendas - Culto Jóvenes',
  united_worship: 'Ofrendas - Culto Unido',
  activities: 'Ofrendas - Actividades',
  church_ground: 'Ofrendas - Terreno Iglesia',
  special: 'Ofrendas - Especial',
  
  tithe : 'Diezmos',
  
  operative_expenses : 'Gastos de operación',
  maintenance_and_repair_expenses : 'Gastos de reparación y mantenimiento',
  decoration_expenses : 'Gastos de decoración',
  equipment_and_technology_expenses : 'Gastos de equipamiento y tecnología',
  supplies_expenses : 'Gastos de suministros',
  activities_and_events_expenses : 'Gastos de actividades y eventos',
  
  status : 'Estado de registro',
  income_adjustment: 'Ajustes por Ingreso',
  expenses_adjustment: 'Ajustes por Salida',
}
