/* eslint-disable no-useless-escape */
/* eslint-disable prefer-regex-literals */

import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email({
    message: 'El correo no es valido.',
  }),

  password: z.string(),
});
