import { 
  ZoneModuleDistrictsAllowed,
  MemberModuleDistrictsAllowed,
  ChurchModuleDistrictsAllowed,
  FamilyGroupModuleDistrictsAllowed,
} from '@/shared/helpers';
import { DistrictNames } from '@/shared/enums';

interface DisabledDistrictsResult {
  districtsDataResult: string[];
}

export const validateDistrictsAllowedByModule = ( path: string): DisabledDistrictsResult | undefined => {

  //* Disabled Districts
  if (path === '/disciples/create' || 
       path === '/disciples/update' ||
       path === '/pastors/create' ||
       path === '/pastors/update' ||
       path === '/copastors/create' ||
       path === '/copastors/update' ||
       path === '/supervisors/create' ||
       path === '/supervisors/update' ||
       path === '/preachers/create' ||
       path === '/preachers/update' 
  ) {
      return {
        districtsDataResult: [ ...Object.values(DistrictNames).filter(value => !MemberModuleDistrictsAllowed.includes(value)) ]   
    }
  }

  if (path === '/churches/create' || path === '/churches/update') {
      return {
        districtsDataResult: [ ...Object.values(DistrictNames).filter(value => !ChurchModuleDistrictsAllowed.includes(value)) ]
    }
  }

  if (path === '/family-groups/create' || path === '/family-groups/update') {
      return {
        districtsDataResult: [ ...Object.values(DistrictNames).filter(value => !FamilyGroupModuleDistrictsAllowed.includes(value)) ]
    }
  }

  if (path === '/zones/create' || path === '/zones/update') {
      return {
        districtsDataResult: [ ...Object.values(DistrictNames).filter(value => !ZoneModuleDistrictsAllowed.includes(value)) ]
    }
  }
}
