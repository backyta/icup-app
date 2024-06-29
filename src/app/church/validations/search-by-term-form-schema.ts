/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';
import { SearchType, RecordOrder } from '@/shared/enums';

export const churchFormTermSearchSchema = z
  .object({
    searchType: z.nativeEnum(SearchType,{
      required_error: "Por favor seleccione un tipo.",
    }),
    
    inputTerm: z.string().max(30).optional(),
    selectTerm: z.string().max(30).optional(),

    dateTerm: z.object({from: z.date(), to: z.date().optional()}, {
      required_error: "Por favor seleccione una fecha.",
    }).optional(),

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

    all: z.boolean().optional(),
   
  })
  .refine(
    (data) => {
      if (data.searchType === SearchType.ChurchName ||
        data.searchType === SearchType.Department ||
        data.searchType === SearchType.Province ||
        data.searchType === SearchType.District ||
        data.searchType === SearchType.UrbanSector ||
        data.searchType === SearchType.Address 
        ) {
        return !!data.inputTerm; 
      }
      return true;
    },
    {
      message: 'El termino es requerido',
      path: ['inputTerm'],
    }
  )
  .refine(
    (data) => {
      if (
          data.searchType === SearchType.Status
        ) {
        return !!data.selectTerm; 
      }
      return true;
    },
    {
      message: 'Por favor seleccione una opción',
      path: ['selectTerm'],
    }
  )
  .refine(
    (data) => {
      if ( 
        data.searchType === SearchType.FoundingDate 
      ) {
        return !!data.dateTerm; 
      }
      return true;
    },
    {
      message: 'Por favor seleccione una fecha',
      path: ['dateTerm'],
    }
  )
  

  

