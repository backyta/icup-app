import * as z from 'zod';

export const dashBoardSearchFormSchema = z.object({
  churchId: z.string({ required_error: 'Seleccione una iglesia.' }).optional(),
});
