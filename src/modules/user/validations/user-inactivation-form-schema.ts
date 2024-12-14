/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { z } from "zod";

export const userInactivationFormSchema = z
.object({
  userInactivationCategory: z.string()
  .min(1, {message: 'El campo debe contener al menos 1 carácter.'})
  .max(50, {message: 'El campo debe contener máximo 50 caracteres'}),

  userInactivationReason: z.string()
  .min(1, {message: 'El campo debe contener al menos 1 carácter.'})
  .max(100, {message: 'El campo debe contener máximo 100 caracteres'}),
})   