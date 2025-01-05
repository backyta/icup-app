import { DistrictNames } from '@/shared/enums/district.enum';

// ? Allowed Districts by module
//* Church
export const ChurchModuleDistrictsAllowed = [
  DistrictNames.Independencia,
];

//* Disciple - Pastor - Copastor - Supervisor - Preacher
export const MemberModuleDistrictsAllowed = [
 DistrictNames.Comas,
 DistrictNames.Independencia,
 DistrictNames['Los Olivos'],
 //  DistrictNames.Carabayllo,
 DistrictNames['Puente Piedra'],
];

//* Family group
export const FamilyGroupModuleDistrictsAllowed = [
  DistrictNames.Independencia,
  // DistrictNames['Puente Piedra'],
];


//* Zone
export const ZoneModuleDistrictsAllowed = [
  DistrictNames.Independencia,
];
