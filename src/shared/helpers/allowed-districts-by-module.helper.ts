import { DistrictNames } from '@/shared/enums/district.enum';

// ? Allowed Districts by module
//* Church
export const ChurchModuleDistrictsAllowed = [
  DistrictNames.Independencia,
];

//* Disciple - Pastor - Copastor - Supervisor - Preacher
export const MemberModuleDistrictsAllowed = [
 DistrictNames.Independencia,
 DistrictNames['Puente Piedra'],
 DistrictNames.Comas,
 DistrictNames.Carabayllo,
 DistrictNames['Los Olivos'],
];

//* Family group
export const FamilyGroupModuleDistrictsAllowed = [
  DistrictNames.Independencia,
  DistrictNames['Puente Piedra'],
];


//* Zone
export const ZoneModuleDistrictsAllowed = [
  DistrictNames.Independencia,
];
