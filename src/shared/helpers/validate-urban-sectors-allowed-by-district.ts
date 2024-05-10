/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { District, UrbanSectorNames, } from '@/shared/enums';
import { 
 UrbanSectorsIndependenciaAllowed, 
 UrbanSectorsPuentePiedraAllowed
} from "@/shared/helpers";


export const validateUrbanSectorsAllowedByDistrict = ( district: string) => {
  
  //* Disabled Urban Sectors
  if (district === District.Independencia) {
      return {
        disabledUrbanSectors: [ ...Object.values(UrbanSectorNames).filter(value => !UrbanSectorsIndependenciaAllowed.includes(value)) ]   
    }
  }

  if (district === District.PuentePiedra) {
      return {
        disabledUrbanSectors: [ ...Object.values(UrbanSectorNames).filter(value => !UrbanSectorsPuentePiedraAllowed.includes(value)) ]   
    }
  }
  
}
