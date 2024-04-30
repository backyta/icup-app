
import * as z from 'zod';

export const formZoneSchema = z
  .object({
    zoneName: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.'})
    .max(20, { message: 'El campo debe contener máximo 20 caracteres.'}),

    country: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.'})
    .max(30, { message: 'El campo debe contener máximo 30 caracteres.'}),

    department: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.'})
    .max(30, { message: 'El campo debe contener máximo 30 caracteres.'}),

    province: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.'})
    .max(30, { message: 'El campo debe contener máximo 30 caracteres.'}),

    district: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.'})
    .max(30, {message: 'El campo debe contener máximo 30 caracteres.'}),

    theirSupervisor: z.string({required_error: 
      'Por favor asigne un Supervisor.'})
  
  })