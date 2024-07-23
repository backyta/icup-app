import * as z from 'zod';

import { ChurchWorshipTime } from '@/app/church/enums';
import { Country, Department, District, Province, RecordStatus, UrbanSector } from '@/shared/enums';

export const churchFormSchema = z
.object({
    //* General Info
    churchName: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.'})
    .max(40, { message: 'El campo debe contener máximo 50 caracteres.'}),

    isAnexe: z.boolean().optional(),
    
    worshipTimes: z.array(z.nativeEnum(ChurchWorshipTime),{
      required_error: "Tienes que seleccionar al menos un horario.",
    }).refine((value) => value.some((item) => item), {
      message: "Tienes que seleccionar al menos un horario.",
    }),

    foundingDate: z.date({
      required_error: "Por favor selecciona una fecha.",
    }),

    //* Contact Info and status
    email: z.string().email({ message: "Email invalido." }),

    phoneNumber:z.string()
    .min(6, { message: 'El campo debe tener al menos 6 caracteres.' })
    .max(20, { message: 'El campo debe tener un máximo de 20 caracteres.' })
    .refine(value => {
      return /^[0-9+\-\s]+$/.test(value);
    }, {
      message: 'El campo solo debe contener números, "+", "-" y espacios',
    }),
    
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

    urbanSector: z.string(z.nativeEnum(UrbanSector, {
      required_error: "Por favor seleccione una opción válida.",
    })).refine((value) => value !== undefined && value.trim() !== '',
      { message: "Por favor seleccione una opción válida." }
    ),
      
    address: z.string()
      .min(1, { message: 'El campo debe contener al menos 1 carácter.' })
      .max(50, { message: 'El campo debe contener máximo 50 caracteres.' }),

    referenceAddress: z.string()
      .min(1, { message: 'El campo debe contener al menos 1 carácter.' })
      .max(100, { message: 'El campo debe contener máximo 50 caracteres.' }),

    recordStatus: z.string(z.nativeEnum(RecordStatus, {
      required_error: "Por favor seleccione una opción.",
      })).optional(),
      
    //* Relations
    theirMainChurch: z.string({required_error: 
      'Por favor asigne una Iglesia Principal.'}).optional(),
  })

  





  

