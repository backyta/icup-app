/* eslint-disable no-useless-escape */
/* eslint-disable prefer-regex-literals */


import * as z from 'zod';

import { UserRole } from '@/app/user/enums';

import { Gender, RecordStatus } from '@/shared/enums';

export const userFormSchema = z
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
  
    email: z.string().email({ message: "Email invalido." }),

    password: z.string()
      .regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$"), 
      'La contraseña no cumple con los requisitos mínimos').optional(),
      
    passwordConfirm: z.string()
      .regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$"), 
      'La contraseña no cumple con los requisitos mínimos').optional(),

    roles: z.array(z.nativeEnum(UserRole),{
      required_error: "Tienes que seleccionar al menos un rol",
    }).refine((value) => value.some((item) => item), {
      message: "Tienes que seleccionar al menos un rol",
    }),

    recordStatus: z.string(z.nativeEnum(RecordStatus, {
      required_error: "Por favor seleccione una opción.",
    })).optional(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: 'Las contraseñas no coinciden',
      path: ['passwordConfirm'],
    }
  )

