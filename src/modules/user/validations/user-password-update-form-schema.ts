/* eslint-disable no-useless-escape */
/* eslint-disable prefer-regex-literals */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';

export const userUpdatePasswordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .regex(
        new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,15}$'),
        'La contraseña no cumple con los requisitos mínimos'
      ),

    newPassword: z
      .string()
      .regex(
        new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,15}$'),
        'La contraseña no cumple con los requisitos mínimos'
      ),

    newPasswordConfirm: z
      .string()
      .regex(
        new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,15}$'),
        'La contraseña no cumple con los requisitos mínimos'
      )
      .optional(),
  })
  .refine(
    (data) => {
      return data.newPassword === data.newPasswordConfirm;
    },
    {
      message: 'Las contraseñas no coinciden.',
      path: ['newPasswordConfirm'],
    }
  );
