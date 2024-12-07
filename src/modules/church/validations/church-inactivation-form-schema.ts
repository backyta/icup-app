/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { z } from "zod";

export const churchInactivationFormSchema = z
.object({
  churchInactivationCategory: z.string()
  .min(1, {message: 'El campo debe contener al menos 1 carácter.'})
  .max(50, {message: 'El campo debe contener máximo 50 caracteres'}),

  churchInactivationReason: z.string()
  .min(1, {message: 'El campo debe contener al menos 1 carácter.'})
  .max(100, {message: 'El campo debe contener máximo 100 caracteres'}),
})   