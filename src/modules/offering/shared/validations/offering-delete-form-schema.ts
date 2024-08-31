import { z } from "zod";

export const offeringDeleteFormSchema = z
.object({
  reasonType: z.string()
  .min(1, {message: 'El campo debe contener al menos 1 carácter.'})
  .max(60, {message: 'El campo debe contener máximo 40 caracteres'}),

  date: z.date({
    required_error: "Por favor selecciona una fecha.",
  }).optional(),
  
  userID: z.string().optional(),

})   