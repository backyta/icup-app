/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';
import { 
  Gender,
  Country, 
  Province, 
  District, 
  MemberRole, 
  Department, 
  UrbanSector, 
  RecordStatus, 
  MaritalStatus, 
} from '@/shared/enums';

export const pastorFormSchema = z
  .object({
    firstName: z.string()
      .min(1, {message: 'El campo debe contener al menos 1 carácter.'})
      .max(40, {message: 'El campo debe contener máximo 40 caracteres'}),

    lastName: z.string()
      .min(1, {message: 'El campo debe contener al menos 1 carácter.'})
      .max(40, {message: 'El campo debe contener máximo 40 caracteres'}),
      
    gender: z.string(z.nativeEnum(Gender, {
      required_error: "Por favor seleccione una opción válida.",
    })).refine((value) => value !== undefined && value.trim() !== '',
      { message: "Por favor seleccione una opción válida." }
    ),

    originCountry: z.string()
      .min(1, {message: 'El campo debe contener al menos 1 carácter.'})
      .max(20, {message: 'El campo debe contener máximo 20 caracteres.'}),

    birthDate: z.date({
      required_error: "Por favor selecciona una fecha.",
    }),

    maritalStatus: z.string( z.nativeEnum(MaritalStatus,{
      required_error: "Por favor seleccione una opción válida.",
    })).refine((value) => value !== undefined && value.trim() !== '',
      { message: "Por favor seleccione una opción válida." }
    ),

    numberChildren: z.string().refine(number => {
      return /^\d+$/.test(number);
    }, {
      message: 'El campo debe contener un número positivo'
    }).refine(number => {
      const parsedNumber = parseInt(number);
      return !isNaN(parsedNumber) && parsedNumber >= 0;
    }, {
      message: 'El campo debe contener un número positivo'
    }),
    
    conversionDate: z.date({
      required_error: "Por favor selecciona una fecha.",
    }),
    
    //* Contact Info and status
    email: z.string().email({ message: "Email invalido." }),

    phoneNumber:z.string()
    .min(6, { message: 'El campo debe tener al menos 6 dígitos.' })
    .max(20, { message: 'El campo debe tener un máximo de 20 dígitos.' })
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
      .max(80, { message: 'El campo debe contener máximo 80 caracteres.' }),

    referenceAddress: z.string()
      .min(1, { message: 'El campo debe contener al menos 1 carácter.' })
      .max(150, { message: 'El campo debe contener máximo 150 caracteres.' }),

    roles: z.array(z.nativeEnum(MemberRole),{
      required_error: "Debes seleccionar al menos un rol.",
    }).refine((value) => value.some((item) => item), {
      message: "Debes seleccionar al menos un rol.",
    }),

    recordStatus: z.string(z.nativeEnum(RecordStatus, {
      required_error: "Por favor seleccione una opción.",
    })).optional(),

    //* Relations
    theirChurch: z.string({required_error: 
      'Por favor asigne una Iglesia Principal.'}).optional(),
  })
  .refine(
    (data) => {
      if (data.roles.includes(MemberRole.Pastor) && data.roles.includes(MemberRole.Disciple)) {
        return !!data.theirChurch; 
      }
      return true;
    },
    {
      message: 'Es necesario asignar una Iglesia.',
      path: ['theirChurch'],
    }
  )
 
