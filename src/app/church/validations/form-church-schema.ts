import * as z from 'zod';
import { Country, Department, District, Province, Status, UrbanSector } from '@/shared/enums';
import { WorshipTimes } from '../enums/worship-times.enum';

export const formChurchSchema = z
.object({
    //* General Info
    nameChurch: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.'})
    .max(40, { message: 'El campo debe contener máximo 50 caracteres.'}),

    isAnexe: z.boolean().optional(),
    
    worshipTimes: z.array(z.nativeEnum(WorshipTimes),{
      required_error: "Tienes que seleccionar al menos un horario.",
    }).refine((value) => value.some((item) => item), {
      message: "Tienes que seleccionar al menos un horario.",
    }),

    foundingDate: z.date({
      required_error: "Por favor selecciona una fecha.",
    }),

    //* Contact Info and status
    emailAddress: z.string().email({ message: "Email invalido." }),

    phoneNumber: z.string().refine(limit => {
      return /^\d+$/.test(limit);
    }, {
      message: 'El campo debe contener un numero'
    }).refine(limit => {
      const parsedLimit = parseInt(limit);
      return !isNaN(parsedLimit) && parsedLimit >= 0;
    }, {
      message: 'El campo debe contener un numero'
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

    addressReference: z.string()
      .min(1, { message: 'El campo debe contener al menos 1 carácter.' })
      .max(100, { message: 'El campo debe contener máximo 50 caracteres.' }),

    status: z.string(z.nativeEnum(Status, {
      required_error: "Por favor seleccione una opción.",
      })).optional(),
      
    //* Roles
    theirMainChurch: z.string({required_error: 
      'Por favor asigne una Iglesia Principal.'}).optional(),
  })

  





  

