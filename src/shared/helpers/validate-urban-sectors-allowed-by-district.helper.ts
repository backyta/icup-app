

import { District, UrbanSectorNames, } from '@/shared/enums';
import { 
 UrbanSectorsIndependenciaAllowed, 
 UrbanSectorsPuentePiedraAllowed
} from "@/shared/helpers";

interface DisabledUrbanSectorsResult {
  disabledUrbanSectors: string[];
}

// TODO : mejorar esto junto con agregar mas distritos y sectores urbanos
export const validateUrbanSectorsAllowedByDistrict = ( district: string): DisabledUrbanSectorsResult | undefined => {
  
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
