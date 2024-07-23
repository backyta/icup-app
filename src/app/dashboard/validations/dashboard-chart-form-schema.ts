import * as z from 'zod';

export const dashBoardChartFormSchema = z
  .object({
    year: z.string({required_error: 
      'Por favor elige un año.'}).optional(),
  })

// TODO : ver si esto se usara desde shared para schema form chart global
  

