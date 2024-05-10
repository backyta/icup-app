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
      'Por favor elige un zona.'}).optional(),

    copastor: z.string({required_error: 
      'Por favor elige un co-pastor.'}).optional(),

    district: z.string({required_error: 
      'Por favor elige un co-pastor.'}).optional(),

    month: z.string({required_error: 
      'Por favor elige un co-pastor.'}).optional(),

    year: z.string({required_error: 
      'Por favor elige un co-pastor.'}).optional(),

    all: z.boolean().optional(),

  })
 
