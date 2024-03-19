/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { UserRoles } from '@/enums/user-roles.enum';
import * as z from 'zod';


export const userSchema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),

    emailAddress: z.string().email(),
    password: z.string().min(3), // agregar REGEX para mejorar la validación aunque eso hay en el back ya
    passwordConfirm: z.string(),

    roles: z.array(z.nativeEnum(UserRoles),{
      required_error: "Tienes que seleccionar al menos un elemento.",
    }).refine((value) => value.some((item) => item), {
      message: "Tienes que seleccionar al menos un elemento.",
    }),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: 'Passwords do not match',
      path: ['passwordConfirm'],
    }
  )


