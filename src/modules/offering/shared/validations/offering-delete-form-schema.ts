import { z } from "zod";

export const offeringDeleteFormSchema = z
.object({
  reasonEliminationType: z.string()
  .min(1, {message: 'El campo debe contener al menos 1 carácter.'})
  .max(40, {message: 'El campo debe contener máximo 40 caracteres'}),
})   