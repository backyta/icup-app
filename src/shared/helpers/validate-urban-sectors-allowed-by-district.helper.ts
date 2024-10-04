import { 
  UrbanSectorsPuentePiedraAllowed,
  UrbanSectorsIndependenciaAllowed,
  UrbanSectorsComasAllowed,
  UrbanSectorsLosOlivosAllowed,
  UrbanSectorsCarabaylloAllowed, 
} from '@/shared/helpers';
import { District, UrbanSectorNames, } from '@/shared/enums';

interface DisabledUrbanSectorsResult {
  disabledUrbanSectors: string[];
}

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

  if (district === District.Comas) {
      return {
        disabledUrbanSectors: [ ...Object.values(UrbanSectorNames).filter(value => !UrbanSectorsComasAllowed.includes(value)) ]   
    }

  }

  if (district === District.LosOlivos) {
      return {
        disabledUrbanSectors: [ ...Object.values(UrbanSectorNames).filter(value => !UrbanSectorsLosOlivosAllowed.includes(value)) ]   
    }
  }

  if (district === District.Carabayllo) {
      return {
        disabledUrbanSectors: [ ...Object.values(UrbanSectorNames).filter(value => !UrbanSectorsCarabaylloAllowed.includes(value)) ]   
    }
  }
  
}
