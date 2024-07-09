
import { Country, Department, District, Province } from '@/shared/enums';
import * as z from 'zod';

export const formZoneSchema = z
  .object({
    zoneName: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.'})
    .max(20, { message: 'El campo debe contener máximo 20 caracteres.'}),

    country: z.string(z.nativeEnum(Country, {
      required_error: "Por favor seleccione una opción válida.",
    })).refine((value) => value !== undefined && value.trim() !== '',
      { message: "Por favor seleccione una opción válida." }
    ),

    department: z.string(z.nativeEnum(Department, {
      required_error: "Por favor seleccione una opción válida.",
    })).refine((value) => value !== undefined && value.trim() !== '',
      { message: "Por favor seleccione una opción válida." }
    ),

    province: z.string(z.nativeEnum(Province, {
      required_error: "Por favor seleccione una opción válida.",
    })).refine((value) => value !== undefined && value.trim() !== '',
      { message: "Por favor seleccione una opción válida." }
    ),

    district: z.string(z.nativeEnum(District, {
      required_error: "Por favor seleccione una opción válida.",
    })).refine((value) => value !== undefined && value.trim() !== '',
      { message: "Por favor seleccione una opción válida." }
    ),

    theirSupervisor: z.string({required_error: 
      'Por favor asigne un Supervisor.'})
  
  })