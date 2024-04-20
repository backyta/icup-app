import { Status } from '@/shared/enums';
import * as z from 'zod';

export const formFamilyHouseSchema = z
  .object({
    
    houseName: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.'})
    .max(25, { message: 'El campo debe contener máximo 25 caracteres.'}),
    
    country: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.'})
    .max(20, { message: 'El campo debe contener máximo 20 caracteres.'}), 

    department: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.'})
    .max(20, { message: 'El campo debe contener máximo20 caracteres.'}),

    province: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.' })
    .max(20, { message: 'El campo debe contener máximo 20 caracteres.'}),
    
    district: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.'})
    .max(20, { message: 'El campo debe contener máximo 20 caracteres.'}),
    
    address: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.'})
    .max(50, { message: 'El campo debe contener máximo 50 caracteres.'}),

    theirPreacher: z.string({required_error: 
      'Por favor asigne un Predicador.'}),

    zoneName: z.string({required_error: 
      'Por favor asigne un Zona.'}),

    status: z.string(z.nativeEnum(Status, {
      required_error: "Por favor seleccione una opción.",
    })).optional(),
  })

  
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

export const formSearchZoneSchema = z
  .object({
    zoneName: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter. '})
    .max(8, { message: 'El campo debe contener máximo 8 caracteres. '}),
  })



  

