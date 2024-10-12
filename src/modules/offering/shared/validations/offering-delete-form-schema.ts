/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { z } from "zod";
import { ExchangeCurrencyType } from "@/modules/offering/income/enums";

export const offeringDeleteFormSchema = z
.object({
  reasonEliminationType: z.string()
  .min(1, {message: 'El campo debe contener al menos 1 carácter.'})
  .max(40, {message: 'El campo debe contener máximo 40 caracteres'}),

  exchangeRate: z.string().optional().refine(value => {
    if (!value) return true;
    return /^\d{1,2}\.\d{2}$/.test(value);
  }, {
    message: 'Debe ser un número con 2 decimales.'
  }),

  exchangeCurrencyType: z.string().optional()
    .refine(value => value === '' || Object.values(ExchangeCurrencyType).includes(value as ExchangeCurrencyType),
      { message: "Por favor seleccione una opción." }
    )
   
})   