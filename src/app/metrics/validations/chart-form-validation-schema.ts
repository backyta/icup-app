/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';


export const chartFormValidationSchema = z
  .object({
    
    date: z.object({from: z.date(), to: z.date().optional()}, {
      required_error: "Por favor seleccione un rango de fechas.",
    }).refine(date =>  {
      return date.to !== undefined},{
      message: 'Debes seleccionar un rango de fechas'
    }).optional(),

    zone: z.string({required_error: 
      'Por favor asigne un Zona.'}).optional(),

  })
 
