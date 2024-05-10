/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { DistrictNames } from '@/shared/enums';
import { 
  DistrictsFamilyHouseModuleAllowed,
  DistrictsMemberModuleAllowed,
} from "@/shared/helpers";


export const validateDistrictsAllowedByModule = ( path: string) => {

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
