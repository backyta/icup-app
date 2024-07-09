import * as z from 'zod';

export const formSearchZoneSchema = z
  .object({
    zoneName: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter. '})
    .max(8, { message: 'El campo debe contener máximo 8 caracteres. '}),
  })
