/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';
import { 
  Country, 
  Department, 
  District, 
  Gender,
  MaritalStatus, 
  MemberRoles, 
  Province, 
  Status, 
  UrbanSector 
} from '@/shared/enums';

export const supervisorFormSchema = z
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
      message: 'El campo debe contener un numero positivo'
    }).refine(number => {
      const parsedNumber = parseInt(number);
      return !isNaN(parsedNumber) && parsedNumber >= 0;
    }, {
      message: 'El campo debe contener un numero positivo'
    }),
    
    conversionDate: z.date({
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

    roles: z.array(z.nativeEnum(MemberRoles),{
      required_error: "Debes seleccionar al menos un rol.",
    }).refine((value) => value.some((item) => item), {
      message: "Debes seleccionar al menos un rol.",
    }),

    status: z.string(z.nativeEnum(Status, {
      required_error: "Por favor seleccione una opción.",
    })).optional(),

    isDirectRelationToPastor: z.boolean().optional(),

    //* Relations
    theirCopastor: z.string({required_error: 
      'Por favor asigne un Pastor.'}).optional(),

    theirPastor: z.string({required_error: 
      'Por favor asigne una Iglesia.'}).optional(),
  })
  .refine(
    (data) => {
      if (data.roles.includes(MemberRoles.Supervisor) && data.roles.includes(MemberRoles.Disciple)) {
        return !!data.theirCopastor; 
      }
      return true;
    },
    {
      message: 'Es necesario asignar un Co-Pastor.',
      path: ['theirCopastor'],
    }
  )
  .refine(
    (data) => {
      if (data.roles.includes(MemberRoles.Copastor) && data.roles.includes(MemberRoles.Disciple)) {
        return !!data.theirPastor; 
      }
      return true;
    },
    {
      message: 'Es necesario asignar un Pastor.',
      path: ['theirPastor'],
    }
  )
 
