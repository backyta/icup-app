import { DistrictNames } from '@/shared/enums';
import { 
  DistrictsFamilyHouseModuleAllowed,
  DistrictsMemberModuleAllowed,
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
       path === '/leaders/create-leader' ||
       path === '/leaders/update-leader' 
  ) {
      return {
        disabledDistricts: [ ...Object.values(DistrictNames).filter(value => !DistrictsMemberModuleAllowed.includes(value)) ]   
    }
  }

  if (path === '/family-houses/create-family-house' || path === '/family-houses/update-family-house') {
      return {
        disabledDistricts: [ ...Object.values(DistrictNames).filter(value => !DistrictsFamilyHouseModuleAllowed.includes(value)) ]   
    }
  }
  
}
