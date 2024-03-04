import * as z from 'zod';


export const formSearchGeneralSchema = z
  .object({
    limit: z.string().refine(limit => {
      const parsedLimit = parseInt(limit);
      return !isNaN(parsedLimit) && parsedLimit > 0;
    },{
      message: 'Limite debe ser un numero mayor a 0'
    }).optional(),
    offset:z.string().refine(offset => !isNaN(parseInt(offset)),{
      message: 'Desplaz. debe ser un numero.'
    }).optional(),
    order: z.enum(['ASC', 'DESC'], {
      required_error: "Seleccione un orden para al consulta.",
    }),
    limitAll: z.any().optional(),
   
  })

  
