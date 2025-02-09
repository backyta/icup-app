/* eslint-disable no-useless-escape */
/* eslint-disable prefer-regex-literals */

import * as z from 'zod';

import { Gender } from '@/shared/enums/gender.enum';
import { RecordStatus } from '@/shared/enums/record-status.enum';

import { UserRole } from '@/modules/user/enums/user-role.enum';

export const userFormSchema = z
  .object({
    firstNames: z
      .string()
      .min(1, { message: 'El campo debe contener al menos 1 carácter.' })
      .max(40, { message: 'El campo debe contener máximo 40 caracteres' }),

    lastNames: z
      .string()
      .min(1, { message: 'El campo debe contener al menos 1 carácter.' })
      .max(40, { message: 'El campo debe contener máximo 40 caracteres' }),

    gender: z
      .string(
        z.nativeEnum(Gender, {
          required_error: 'El género es requerido.',
        })
      )
      .refine((value) => value !== undefined && value.trim() !== '', {
        message: 'El género es requerido.',
      }),

    email: z.string().email({ message: 'E-mail invalido.' }),

    password: z
      .string()
      .regex(
        new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$'),
        'La contraseña no cumple con los requisitos mínimos'
      )
      .optional(),

    passwordConfirm: z
      .string()
      .regex(
        new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$'),
        'La contraseña no cumple con los requisitos mínimos'
      )
      .optional(),

    roles: z
      .array(z.nativeEnum(UserRole), {
        required_error: 'Debes seleccionar al menos un rol',
      })
      .refine((value) => value.some((item) => item), {
        message: 'Debes seleccionar al menos un rol',
      }),

    recordStatus: z
      .string(
        z.nativeEnum(RecordStatus, {
          required_error: 'El estado de registro es requerido.',
        })
      )
      .optional(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: 'Las contraseñas no coinciden.',
      path: ['passwordConfirm'],
    }
  );
