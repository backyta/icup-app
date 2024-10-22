import * as z from 'zod';

export const dashBoardSearchFormSchema = z
  .object({
    year: z.string({required_error: 
      'Por favor elige un año.'}).optional(),

    church: z.string({required_error: 
      'Por favor elige una iglesia.'}).optional(),
  })

