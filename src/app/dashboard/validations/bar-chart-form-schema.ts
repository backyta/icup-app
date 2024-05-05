import * as z from 'zod';

export const barChartFormSchema = z
  .object({
    termDate: z.object({from: z.date(), to: z.date().optional()}, {
      required_error: "Por favor seleccione un rango de fechas.",
    }).refine(date =>  {
      return date.to !== undefined},{
      message: 'Debes seleccionar un rango de fechas'
    }),
  })

  // TODO : ver si esto se usara desde shared para schema form chart global
  

