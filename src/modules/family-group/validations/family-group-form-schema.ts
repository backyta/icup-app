import * as z from 'zod';
import { Country, Department, District, Province, RecordStatus, UrbanSector } from '@/shared/enums';

export const familyGroupFormSchema = z
  .object({
    familyGroupName: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.'})
    .max(25, { message: 'El campo debe contener máximo 25 caracteres.'}),
    
    serviceTime: z.string(),

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
      .max(100, { message: 'El campo debe contener máximo 50 caracteres.' })
      ,

    theirPreacher: z.string({required_error: 
      'Por favor asigne un Predicador.'}).optional(),

    theirZone: z.string({required_error: 
      'Por favor asigne una Zona.'}).optional(),

    recordStatus: z.string(z.nativeEnum(RecordStatus, {
      required_error: "Por favor seleccione una opción.",
    })).optional(),
  })

  





  

