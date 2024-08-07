import { SearchTypeNames } from '@/shared/enums';

// ? Allowed Types by module

//* Church
// search, search by type and update
export const SearchTypesChurchModuleAllowed = [ 
  SearchTypeNames.church_name,
  SearchTypeNames.founding_date,
  SearchTypeNames.department,
  SearchTypeNames.province,
  SearchTypeNames.district,
  SearchTypeNames.urban_sector,
  SearchTypeNames.address,
  SearchTypeNames.status,
];

// delete
export const SearchTypeChurchModuleAllowedOnDeletePage = [ 
  SearchTypeNames.church_name,
  SearchTypeNames.founding_date,
  SearchTypeNames.department,
  SearchTypeNames.province,
  SearchTypeNames.district,
  SearchTypeNames.urban_sector,
  SearchTypeNames.address,

];

//* Disciples
// search, search by type and update
export const SearchTypesDiscipleModuleAllowed = [ 
  SearchTypeNames.first_name,
  SearchTypeNames.last_name,
  SearchTypeNames.full_name,
  SearchTypeNames.birth_month,
  SearchTypeNames.birth_date,
  SearchTypeNames.gender,
  SearchTypeNames.marital_status,
  SearchTypeNames.zone,
  SearchTypeNames.code_house,
  SearchTypeNames.name_house,
  SearchTypeNames.address,
  SearchTypeNames.origin_country,
  SearchTypeNames.department,
  SearchTypeNames.province,
  SearchTypeNames.district,
  SearchTypeNames.urban_sector,
  SearchTypeNames.status,
];

// delete
export const SearchTypeDisciplesModuleAllowedOnDeletePage = [ 
  SearchTypeNames.first_name,
  SearchTypeNames.last_name,
  SearchTypeNames.full_name,
  SearchTypeNames.birth_month,
  SearchTypeNames.birth_date,
  SearchTypeNames.gender,
  SearchTypeNames.marital_status,
  SearchTypeNames.zone,
  SearchTypeNames.code_house,
  SearchTypeNames.name_house,
  SearchTypeNames.address,
  SearchTypeNames.origin_country,
  SearchTypeNames.department,
  SearchTypeNames.province,
  SearchTypeNames.district,
  SearchTypeNames.urban_sector,
];

//* Pastors
// search, search by type and update
export const SearchTypesPastorModuleAllowed = [    
  SearchTypeNames.first_name,
  SearchTypeNames.last_name,
  SearchTypeNames.full_name,
  SearchTypeNames.birth_month,
  SearchTypeNames.birth_date,
  SearchTypeNames.gender,
  SearchTypeNames.marital_status,
  SearchTypeNames.address,
  SearchTypeNames.origin_country,
  SearchTypeNames.department,
  SearchTypeNames.province,
  SearchTypeNames.district,
  SearchTypeNames.urban_sector,
  SearchTypeNames.status,
];

// delete
export const SearchTypesPastorModuleAllowedOnDeletePage = [    
  SearchTypeNames.first_name,
  SearchTypeNames.last_name,
  SearchTypeNames.full_name,
  SearchTypeNames.birth_month,
  SearchTypeNames.birth_date,
  SearchTypeNames.gender,
  SearchTypeNames.marital_status,
  SearchTypeNames.address,
  SearchTypeNames.origin_country,
  SearchTypeNames.department,
  SearchTypeNames.province,
  SearchTypeNames.urban_sector,
  SearchTypeNames.district,
];

//* Co-pastors
// search, search by type and update
export const SearchTypesCopastorModuleAllowed = [
  SearchTypeNames.first_name,
  SearchTypeNames.last_name,
  SearchTypeNames.full_name,
  SearchTypeNames.birth_month,
  SearchTypeNames.birth_date,
  SearchTypeNames.gender,
  SearchTypeNames.marital_status,
  SearchTypeNames.address,
  SearchTypeNames.origin_country,
  SearchTypeNames.department,
  SearchTypeNames.province,
  SearchTypeNames.district,
  SearchTypeNames.urban_sector,
  SearchTypeNames.status,
];

// delete
export const SearchTypesCopastorModuleAllowedOnDeletePage = [
  SearchTypeNames.first_name,
  SearchTypeNames.last_name,
  SearchTypeNames.full_name,
  SearchTypeNames.birth_month,
  SearchTypeNames.birth_date,
  SearchTypeNames.gender,
  SearchTypeNames.marital_status,
  SearchTypeNames.address,
  SearchTypeNames.origin_country,
  SearchTypeNames.department,
  SearchTypeNames.province,
  SearchTypeNames.district,
  SearchTypeNames.urban_sector,
];

//* Supervisor
// search, search by type and update
export const SearchTypesSupervisorModuleAllowed = [    
  SearchTypeNames.first_name,
  SearchTypeNames.last_name,
  SearchTypeNames.full_name,
  SearchTypeNames.birth_month,
  SearchTypeNames.birth_date,
  SearchTypeNames.gender,
  SearchTypeNames.marital_status,
  SearchTypeNames.zone,
  SearchTypeNames.address,
  SearchTypeNames.origin_country,
  SearchTypeNames.department,
  SearchTypeNames.province,
  SearchTypeNames.district,
  SearchTypeNames.urban_sector,
  SearchTypeNames.status,
];

// delete
export const SearchTypesSupervisorModuleAllowedOnDeletePage = [    
  SearchTypeNames.first_name,
  SearchTypeNames.last_name,
  SearchTypeNames.full_name,
  SearchTypeNames.birth_month,
  SearchTypeNames.birth_date,
  SearchTypeNames.gender,
  SearchTypeNames.marital_status,
  SearchTypeNames.zone,
  SearchTypeNames.address,
  SearchTypeNames.origin_country,
  SearchTypeNames.department,
  SearchTypeNames.province,
  SearchTypeNames.urban_sector,
  SearchTypeNames.district,
];

//* Preacher
// search, search by type and update
export const SearchTypesPreacherModuleAllowed = [    
  SearchTypeNames.first_name,
  SearchTypeNames.last_name,
  SearchTypeNames.full_name,
  SearchTypeNames.birth_month,
  SearchTypeNames.birth_date,
  SearchTypeNames.gender,
  SearchTypeNames.marital_status,
  SearchTypeNames.zone,
  SearchTypeNames.code_house,
  SearchTypeNames.name_house,
  SearchTypeNames.address,
  SearchTypeNames.origin_country,
  SearchTypeNames.department,
  SearchTypeNames.province,
  SearchTypeNames.district,
  SearchTypeNames.urban_sector,
  SearchTypeNames.status,
];

// delete
export const SearchTypesPreacherModuleAllowedOnDeletePage = [    
  SearchTypeNames.first_name,
  SearchTypeNames.last_name,
  SearchTypeNames.full_name,
  SearchTypeNames.birth_month,
  SearchTypeNames.birth_date,
  SearchTypeNames.gender,
  SearchTypeNames.marital_status,
  SearchTypeNames.zone,
  SearchTypeNames.code_house,
  SearchTypeNames.name_house,
  SearchTypeNames.address,
  SearchTypeNames.origin_country,
  SearchTypeNames.department,
  SearchTypeNames.province,
  SearchTypeNames.urban_sector,
  SearchTypeNames.district,
];


//* Leader
// search, search by type and update
export const SearchTypesLeaderModuleAllowed = [    
  SearchTypeNames.first_name,
  SearchTypeNames.last_name,
  SearchTypeNames.full_name,
  SearchTypeNames.birth_month,
  SearchTypeNames.birth_date,
  SearchTypeNames.gender,
  SearchTypeNames.marital_status,
  SearchTypeNames.zone,
  SearchTypeNames.code_house,
  SearchTypeNames.name_house,
  SearchTypeNames.address,
  SearchTypeNames.origin_country,
  SearchTypeNames.department,
  SearchTypeNames.province,
  SearchTypeNames.district,
  SearchTypeNames.urban_sector,
  SearchTypeNames.status,
];

// delete
export const SearchTypesLeaderModuleAllowedOnDeletePage = [    
  SearchTypeNames.first_name,
  SearchTypeNames.last_name,
  SearchTypeNames.full_name,
  SearchTypeNames.birth_month,
  SearchTypeNames.birth_date,
  SearchTypeNames.gender,
  SearchTypeNames.marital_status,
  SearchTypeNames.zone,
  SearchTypeNames.code_house,
  SearchTypeNames.name_house,
  SearchTypeNames.address,
  SearchTypeNames.origin_country,
  SearchTypeNames.department,
  SearchTypeNames.province,
  SearchTypeNames.urban_sector,
  SearchTypeNames.district,
];

//* Family Group
// search, search by type and update
export const SearchTypesFamilyHouseModuleAllowed = [
  SearchTypeNames.first_name,
  SearchTypeNames.last_name,
  SearchTypeNames.full_name,
  SearchTypeNames.zone,
  SearchTypeNames.code_house,
  SearchTypeNames.name_house,
  SearchTypeNames.address,
  SearchTypeNames.department,
  SearchTypeNames.province,
  SearchTypeNames.district,
  SearchTypeNames.urban_sector,
  SearchTypeNames.status,
];

// delete
export const SearchTypesFamilyHouseModuleAllowedOnDeletePage = [
  SearchTypeNames.first_name,
  SearchTypeNames.last_name,
  SearchTypeNames.full_name,
  SearchTypeNames.zone,
  SearchTypeNames.code_house,
  SearchTypeNames.name_house,
  SearchTypeNames.address,
  SearchTypeNames.department,
  SearchTypeNames.province,
  SearchTypeNames.district,
  SearchTypeNames.urban_sector,
];

//* Offerings Income
// search, search by type and update
export const SearchTypesOfferingIncomeModuleAllowed = [
  SearchTypeNames.tithe,
  SearchTypeNames.sunday_worship,
  SearchTypeNames.family_house,
  SearchTypeNames.general_fasting,
  SearchTypeNames.zonal_fasting,
  SearchTypeNames.general_vigil,
  SearchTypeNames.zonal_vigil,
  SearchTypeNames.sunday_school,
  SearchTypeNames.youth_worship,
  SearchTypeNames.united_worship,
  SearchTypeNames.income_adjustment,
  SearchTypeNames.activities,
  SearchTypeNames.church_ground,
  SearchTypeNames.special,
  SearchTypeNames.status,
];

// delete
export const SearchTypesOfferingIncomeModuleAllowedOnDeleteAndUpdatePage = [
  SearchTypeNames.tithe,
  SearchTypeNames.sunday_worship,
  SearchTypeNames.family_house,
  SearchTypeNames.general_fasting,
  SearchTypeNames.zonal_fasting,
  SearchTypeNames.general_vigil,
  SearchTypeNames.zonal_vigil,
  SearchTypeNames.sunday_school,
  SearchTypeNames.youth_worship,
  SearchTypeNames.united_worship,
  SearchTypeNames.income_adjustment,
  SearchTypeNames.activities,
  SearchTypeNames.church_ground,
  SearchTypeNames.special,
];

//* Offering Expenses
// search, search by type and update
export const SearchTypesOfferingExpensesModuleAllowed = [
  SearchTypeNames.operative_expenses,
  SearchTypeNames.maintenance_and_repair_expenses,
  SearchTypeNames.decoration_expenses,
  SearchTypeNames.equipment_and_technology_expenses,
  SearchTypeNames.supplies_expenses,
  SearchTypeNames.activities_and_events_expenses,
  SearchTypeNames.expenses_adjustment,
  SearchTypeNames.status,
];

// delete
export const SearchTypesOfferingExpensesModuleAllowedOnDeleteAndUpdatePage = [
  SearchTypeNames.operative_expenses,
  SearchTypeNames.maintenance_and_repair_expenses,
  SearchTypeNames.decoration_expenses,
  SearchTypeNames.equipment_and_technology_expenses,
  SearchTypeNames.supplies_expenses,
  SearchTypeNames.activities_and_events_expenses,
  SearchTypeNames.expenses_adjustment,
];

//* Users
// search, search by type and update
export const SearchTypesUserModuleAllowed = [
  SearchTypeNames.first_name,
  SearchTypeNames.last_name,
  SearchTypeNames.full_name,
  SearchTypeNames.roles,
  SearchTypeNames.status,
];

// delete
export const SearchTypesUserModuleAllowedOnDeletePage = [
  SearchTypeNames.first_name,
  SearchTypeNames.last_name,
  SearchTypeNames.full_name,
  SearchTypeNames.roles,
];