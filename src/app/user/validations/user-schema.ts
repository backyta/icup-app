/* eslint-disable no-useless-escape */
/* eslint-disable prefer-regex-literals */


import * as z from 'zod';

import { UserRoles } from '@/app/user/enums';

import { Status } from '@/shared/enums';

export const userSchema = z
  .object({
    firstName: z.string({ required_error: 'xd'})
      .min(1, {message: 'El campo debe contener al menos 1 carácter.'})
      .max(40, {message: 'El campo debe contener máximo 40 caracteres'}),

    lastName: z.string()
      .min(1, {message: 'El campo debe contener al menos 1 carácter.'})
      .max(40, {message: 'El campo debe contener máximo 40 caracteres'}),
      

    emailAddress: z.string().email({ message: "Email invalido." }),

    password: z.string()
      .regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$"), 
      'La contraseña no cumple con los requisitos mínimos'),
      
    passwordConfirm: z.string()
      .regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$"), 
      'La contraseña no cumple con los requisitos mínimos'),

    roles: z.array(z.nativeEnum(UserRoles),{
      required_error: "Tienes que seleccionar al menos un elemento",
    }).refine((value) => value.some((item) => item), {
      message: "Tienes que seleccionar al menos un elemento",
    }),

    status: z.string(z.nativeEnum(Status, {
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

