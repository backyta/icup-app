import * as z from 'zod';

export const dashBoardSearchFormSchema = z
  .object({
    churchId: z.string({required_error: 
      'Por favor elige una iglesia.'}).optional(),
  })

