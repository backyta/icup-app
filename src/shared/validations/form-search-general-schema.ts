import * as z from 'zod';
import { RecordOrder } from '@/shared/enums';

export const formSearchGeneralSchema = z
  .object({
    order: z.string(z.nativeEnum(RecordOrder, {
      required_error: "Seleccione un orden para al consulta.",
    })),

    limit: z.string().refine(limit => {
      const parsedLimit = parseInt(limit);
      return !isNaN(parsedLimit) && parsedLimit > 0;
    },{
      message: 'Limite debe ser un numero mayor a 0'
    }).optional(),

    offset: z.string().refine(offset => {
      const parsedOffset = parseInt(offset);
      return !isNaN(parsedOffset) && parsedOffset >= 0;
    },{
      message: 'Desplaz. debe ser un numero mayor o igual a 0'
    }).optional(),

    limitAll: z.any().optional(),
   
  })

  
