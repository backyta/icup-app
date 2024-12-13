import * as z from 'zod';

import { Country } from '@/shared/enums/country.enum';
import { District } from '@/shared/enums/district.enum';
import { Province } from '@/shared/enums/province.enum';
import { Department } from '@/shared/enums/department.enum';
import { RecordStatus } from '@/shared/enums/record-status.enum';

export const zoneFormSchema = z
.object({
    //* General Info
    zoneName: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.'})
    .max(40, { message: 'El campo debe contener máximo 50 caracteres.'}),

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

    recordStatus: z.string(z.nativeEnum(RecordStatus, {
      required_error: "Por favor seleccione una opción.",
      })).optional(),
      
    //* Relations
    theirSupervisor: z.string({required_error: 
      'Por favor asigne un Supervisor.'}).optional(),
  })

  





  

