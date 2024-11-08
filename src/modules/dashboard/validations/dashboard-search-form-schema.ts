import * as z from 'zod';

export const dashBoardSearchFormSchema = z
  .object({
    church: z.string({required_error: 
      'Por favor elige una iglesia.'}).optional(),
  })

