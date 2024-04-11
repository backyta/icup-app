import { UserRoles } from '@/shared/enums/user-roles.enum';
import * as z from 'zod';


// TODO : corregir para el login pass, and user o correo simple (solo colocar estos)
export const loginSchema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),

    emailAddress: z.string().email(),
    password: z.string().min(3),
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