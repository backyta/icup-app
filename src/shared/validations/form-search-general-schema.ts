import * as z from 'zod';
import { RecordOrder } from '@/shared/enums';

export const formSearchGeneralSchema = z
  .object({
    orderRecord: z.string(z.nativeEnum(RecordOrder, {
      required_error: "Seleccione un orden para al consulta.", 
    })),

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

    offset: z.string().refine(offset => {
      return /^\d+$/.test(offset);
    }, {
      message: 'Desplaz. debe ser un numero mayor o igual a 0'
    }).refine(offset => {
      const parsedOffset = parseInt(offset);
      return !isNaN(parsedOffset) && parsedOffset >= 0;
    }, {
      message: 'Desplaz. debe ser un numero mayor o igual a 0'
    }).optional(),

    all: z.boolean().optional(),
   
  })


