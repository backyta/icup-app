/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';

import { RecordOrder } from '@/shared/enums';
import { ZoneSearchType } from '@/modules/zone/enums';

export const zoneSearchByTermFormSchema = z 
  .object({
    searchType: z.nativeEnum(ZoneSearchType,{
      required_error: "Por favor seleccione un tipo.",
    }),
    
    inputTerm: z.string().max(30).optional(),
    selectTerm: z.string().max(30).optional(),

    limit: z.string().refine(limit => {
      return /^\d+$/.test(limit);
    }, {
      message: 'El límite debe ser un número positivo'
    }).refine(limit => {
      const parsedLimit = parseInt(limit);
      return !isNaN(parsedLimit) && parsedLimit > 0;
    }, {
      message: 'El límite debe ser un número mayor a 0'
    }).optional(),

    order: z.string(z.nativeEnum(RecordOrder, {
      required_error: "Seleccione un orden para al consulta.",
    })),

    churchId: z.string().max(40).optional(),

    all: z.boolean().optional(),
   
  })
  .refine(
    (data) => {
      if (data.searchType === ZoneSearchType.ZoneName ||
        data.searchType === ZoneSearchType.Country ||
        data.searchType === ZoneSearchType.Department ||
        data.searchType === ZoneSearchType.Province ||
        data.searchType === ZoneSearchType.District
        ) {
        return !!data.inputTerm; 
      }
      return true;
    },
    {
      message: 'El Término es requerido.',
      path: ['inputTerm'],
    }
  )
  .refine(
    (data) => {
      if (
          data.searchType === ZoneSearchType.RecordStatus
        ) {
        return !!data.selectTerm; 
      }
      return true;
    },
    {
      message: 'Por favor seleccione una opción.',
      path: ['selectTerm'],
    }
  )
  

  

