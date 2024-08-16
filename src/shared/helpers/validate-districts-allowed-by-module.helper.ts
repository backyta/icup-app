import { DistrictNames } from '@/shared/enums';
import { 
  FamilyGroupModuleDistrictsAllowed,
  MemberModuleDistrictsAllowed,
  ZoneModuleDistrictsAllowed,
} from '@/shared/helpers';

interface DisabledDistrictsResult {
  disabledDistricts: string[];
}

export const validateDistrictsAllowedByModule = ( path: string): DisabledDistrictsResult | undefined => {

  //* Disabled Districts
  if (path === '/disciples/create-disciple' || 
       path === '/disciples/update-disciple' ||
       path === '/pastors/create-pastor' ||
       path === '/pastors/update-pastor' ||
       path === '/copastors/create-copastor' ||
       path === '/copastors/update-copastor' ||
       path === '/supervisors/create-supervisor' ||
       path === '/supervisors/update-supervisor' ||
       path === '/preachers/create-preacher' ||
       path === '/preachers/update-preacher' 
  ) {
      return {
        disabledDistricts: [ ...Object.values(DistrictNames).filter(value => !MemberModuleDistrictsAllowed.includes(value)) ]   
    }
  }

  if (path === '/family-groups/create-family-groups' || path === '/family-groups/update-family-groups') {
      return {
        disabledDistricts: [ ...Object.values(DistrictNames).filter(value => !FamilyGroupModuleDistrictsAllowed.includes(value)) ]
    }
  }

  if (path === '/zones/create-zone' || path === '/zones/update-zone') {
      return {
        disabledDistricts: [ ...Object.values(DistrictNames).filter(value => !ZoneModuleDistrictsAllowed.includes(value)) ]
    }
  }
  
}
