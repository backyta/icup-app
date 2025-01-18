import * as z from 'zod';

import { Country } from '@/shared/enums/country.enum';
import { District } from '@/shared/enums/district.enum';
import { Province } from '@/shared/enums/province.enum';
import { Department } from '@/shared/enums/department.enum';
import { UrbanSector } from '@/shared/enums/urban-sector.enum';
import { RecordStatus } from '@/shared/enums/record-status.enum';
import { FamilyGroupServiceTime } from '@/modules/family-group/enums/family-group-service-time.enum';

export const familyGroupFormSchema = z.object({
  familyGroupName: z
    .string()
    .min(5, { message: 'El campo debe contener al menos 5 carácter.' })
    .max(25, { message: 'El campo debe contener máximo 25 caracteres.' }),

  serviceTime: z
    .string(
      z.nativeEnum(FamilyGroupServiceTime, {
        required_error: 'Debe seleccionar una opción.',
      })
    )
    .refine((value) => value !== undefined && value.trim() !== '', {
      message: 'Debe seleccionar una opción.',
    }),

  country: z
    .string(
      z.nativeEnum(Country, {
        required_error: 'El país es requerido.',
      })
    )
    .refine((value) => value !== undefined && value.trim() !== '', {
      message: 'El país es requerido.',
    }),

  department: z
    .string(
      z.nativeEnum(Department, {
        required_error: 'El departamento es requerido.',
      })
    )
    .refine((value) => value !== undefined && value.trim() !== '', {
      message: 'El departamento es requerido.',
    }),

  province: z
    .string(
      z.nativeEnum(Province, {
        required_error: 'Debe seleccionar una opción.',
      })
    )
    .refine((value) => value !== undefined && value.trim() !== '', {
      message: 'Debe seleccionar una opción.',
    }),

  district: z
    .string(
      z.nativeEnum(District, {
        required_error: 'El distrito es requerido.',
      })
    )
    .refine((value) => value !== undefined && value.trim() !== '', {
      message: 'El distrito es requerido.',
    }),

  urbanSector: z
    .string(
      z.nativeEnum(UrbanSector, {
        required_error: 'El sector urbano es requerido.',
      })
    )
    .refine((value) => value !== undefined && value.trim() !== '', {
      message: 'El sector urbano es requerido.',
    }),

  address: z
    .string()
    .min(5, { message: 'El campo debe contener al menos 5 caracteres.' })
    .max(80, { message: 'El campo debe contener máximo 80 caracteres.' }),

  referenceAddress: z
    .string()
    .min(5, { message: 'El campo debe contener al menos 5 carácter.' })
    .max(150, { message: 'El campo debe contener máximo 150 caracteres.' }),

  theirPreacher: z.string({ required_error: 'Debe asignar un Predicador.' }).optional(),

  theirZone: z.string({ required_error: 'Debe asignar una Zona.' }).optional(),

  recordStatus: z
    .string(
      z.nativeEnum(RecordStatus, {
        required_error: 'El estado de registro es requerido.',
      })
    )
    .optional(),
});
