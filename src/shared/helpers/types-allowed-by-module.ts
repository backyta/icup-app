import { TypesSearchNames } from "@/shared/enums";

// ? Allowed Types by module
//* Disciples
// search, search by type and update
export const TypesDiscipleAllowed = [ 
  TypesSearchNames.first_name,
  TypesSearchNames.last_name,
  TypesSearchNames.full_name,
  TypesSearchNames.month_birth,
  TypesSearchNames.date_birth,
  TypesSearchNames.gender,
  TypesSearchNames.marital_status,
  TypesSearchNames.zone,
  TypesSearchNames.code_house,
  TypesSearchNames.name_house,
  TypesSearchNames.address,
  TypesSearchNames.origin_country,
  TypesSearchNames.department,
  TypesSearchNames.province,
  TypesSearchNames.district,
  TypesSearchNames.status,
];

// delete
export const TypesDisciplesAllowedOnDeletePage = [ 
  TypesSearchNames.first_name,
  TypesSearchNames.last_name,
  TypesSearchNames.full_name,
  TypesSearchNames.month_birth,
  TypesSearchNames.date_birth,
  TypesSearchNames.gender,
  TypesSearchNames.marital_status,
  TypesSearchNames.zone,
  TypesSearchNames.code_house,
  TypesSearchNames.name_house,
  TypesSearchNames.address,
  TypesSearchNames.origin_country,
  TypesSearchNames.department,
  TypesSearchNames.province,
  TypesSearchNames.district,
];

//* Pastors
// search, search by type and update
export const TypesPastorAllowed = [    
  TypesSearchNames.first_name,
  TypesSearchNames.last_name,
  TypesSearchNames.full_name,
  TypesSearchNames.month_birth,
  TypesSearchNames.date_birth,
  TypesSearchNames.gender,
  TypesSearchNames.marital_status,
  TypesSearchNames.address,
  TypesSearchNames.origin_country,
  TypesSearchNames.department,
  TypesSearchNames.province,
  TypesSearchNames.district,
  TypesSearchNames.status,
];

// delete
export const TypesPastorAllowedOnDeletePage = [    
  TypesSearchNames.first_name,
  TypesSearchNames.last_name,
  TypesSearchNames.full_name,
  TypesSearchNames.month_birth,
  TypesSearchNames.date_birth,
  TypesSearchNames.gender,
  TypesSearchNames.marital_status,
  TypesSearchNames.address,
  TypesSearchNames.origin_country,
  TypesSearchNames.department,
  TypesSearchNames.province,
  TypesSearchNames.district,
];

//* Co-pastors
// search, search by type and update
export const TypesCopastorAllowed = [
  TypesSearchNames.first_name,
  TypesSearchNames.last_name,
  TypesSearchNames.full_name,
  TypesSearchNames.month_birth,
  TypesSearchNames.date_birth,
  TypesSearchNames.gender,
  TypesSearchNames.marital_status,
  TypesSearchNames.address,
  TypesSearchNames.origin_country,
  TypesSearchNames.department,
  TypesSearchNames.province,
  TypesSearchNames.district,
  TypesSearchNames.status,
];

// delete
export const TypesCopastorAllowedOnDeletePage = [
  TypesSearchNames.first_name,
  TypesSearchNames.last_name,
  TypesSearchNames.full_name,
  TypesSearchNames.month_birth,
  TypesSearchNames.date_birth,
  TypesSearchNames.gender,
  TypesSearchNames.marital_status,
  TypesSearchNames.address,
  TypesSearchNames.origin_country,
  TypesSearchNames.department,
  TypesSearchNames.province,
  TypesSearchNames.district,
];

//* Preachers
// search, search by type and update
export const TypesLeaderAllowed = [    
  TypesSearchNames.first_name,
  TypesSearchNames.last_name,
  TypesSearchNames.full_name,
  TypesSearchNames.month_birth,
  TypesSearchNames.date_birth,
  TypesSearchNames.gender,
  TypesSearchNames.marital_status,
  TypesSearchNames.zone,
  TypesSearchNames.code_house,
  TypesSearchNames.name_house,
  TypesSearchNames.address,
  TypesSearchNames.origin_country,
  TypesSearchNames.department,
  TypesSearchNames.province,
  TypesSearchNames.district,
  TypesSearchNames.status,
];

// delete
export const TypesLeaderAllowedOnDeletePage = [    
  TypesSearchNames.first_name,
  TypesSearchNames.last_name,
  TypesSearchNames.full_name,
  TypesSearchNames.month_birth,
  TypesSearchNames.date_birth,
  TypesSearchNames.gender,
  TypesSearchNames.marital_status,
  TypesSearchNames.zone,
  TypesSearchNames.code_house,
  TypesSearchNames.name_house,
  TypesSearchNames.address,
  TypesSearchNames.origin_country,
  TypesSearchNames.department,
  TypesSearchNames.province,
  TypesSearchNames.district,
];

//* Family House
// search, search by type and update
export const TypesFamilyHouseAllowed = [
  TypesSearchNames.first_name,
  TypesSearchNames.last_name,
  TypesSearchNames.full_name,
  TypesSearchNames.zone,
  TypesSearchNames.code_house,
  TypesSearchNames.name_house,
  TypesSearchNames.address,
  TypesSearchNames.department,
  TypesSearchNames.province,
  TypesSearchNames.district,
  TypesSearchNames.status,
];

// delete
export const TypesFamilyHouseAllowedOnDeletePage = [
  TypesSearchNames.first_name,
  TypesSearchNames.last_name,
  TypesSearchNames.full_name,
  TypesSearchNames.zone,
  TypesSearchNames.code_house,
  TypesSearchNames.name_house,
  TypesSearchNames.address,
  TypesSearchNames.department,
  TypesSearchNames.province,
  TypesSearchNames.district,
];

//* Offerings Income
// search, search by type and update
export const TypesOfferingIncomeAllowed = [
  TypesSearchNames.tithe,
  TypesSearchNames.sunday_worship,
  TypesSearchNames.family_house,
  TypesSearchNames.general_fasting,
  TypesSearchNames.zonal_fasting,
  TypesSearchNames.general_vigil,
  TypesSearchNames.zonal_vigil,
  TypesSearchNames.sunday_school,
  TypesSearchNames.youth_worship,
  TypesSearchNames.activities,
  TypesSearchNames.church_ground,
  TypesSearchNames.special,
  TypesSearchNames.status,
];

// delete
export const TypesOfferingIncomeAllowedOnDeleteAndUpdatePage = [
  TypesSearchNames.tithe,
  TypesSearchNames.sunday_worship,
  TypesSearchNames.family_house,
  TypesSearchNames.general_fasting,
  TypesSearchNames.zonal_fasting,
  TypesSearchNames.general_vigil,
  TypesSearchNames.zonal_vigil,
  TypesSearchNames.sunday_school,
  TypesSearchNames.youth_worship,
  TypesSearchNames.activities,
  TypesSearchNames.church_ground,
  TypesSearchNames.special,
];

//* Offering Expenses
// search, search by type and update
export const TypesOfferingExpensesAllowed = [
  TypesSearchNames.operative_expenses,
  TypesSearchNames.maintenance_and_repair_expenses,
  TypesSearchNames.decoration_expenses,
  TypesSearchNames.equipment_and_technology_expenses,
  TypesSearchNames.supplies_expenses,
  TypesSearchNames.activities_and_events_expenses,
  TypesSearchNames.status,
];

// delete
export const TypesOfferingExpensesAllowedOnDeleteAndUpdatePage = [
  TypesSearchNames.operative_expenses,
  TypesSearchNames.maintenance_and_repair_expenses,
  TypesSearchNames.decoration_expenses,
  TypesSearchNames.equipment_and_technology_expenses,
  TypesSearchNames.supplies_expenses,
  TypesSearchNames.activities_and_events_expenses,
];


//* Users
// search, search by type and update
export const TypesUserAllowed = [
  TypesSearchNames.first_name,
  TypesSearchNames.last_name,
  TypesSearchNames.full_name,
  TypesSearchNames.roles,
  TypesSearchNames.status,
];

// delete
export const TypesUserAllowedOnDeletePage = [
  TypesSearchNames.first_name,
  TypesSearchNames.last_name,
  TypesSearchNames.full_name,
  TypesSearchNames.roles,
];