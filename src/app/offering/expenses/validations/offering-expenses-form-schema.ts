import { TypesOfferingExpenses, SubTypesOfferingExpenses } from '@/app/offering/expenses/enums';
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';

import { Status } from '@/shared/enums';
import { CurrencyType  } from '@/app/offering/shared/enums';


export const offeringExpensesFormSchema = z
  .object({
    
    type: z.string(z.nativeEnum(TypesOfferingExpenses,{
      required_error: "Por favor seleccione un tipo.",
    })),

    subType: z.string(z.nativeEnum(SubTypesOfferingExpenses,{
      required_error: "Por favor seleccione una opción.",
    })).optional(),

    amount: z.string().refine(amount => !isNaN(parseFloat(amount)),{
      message: 'El monto de la ofrenda debe ser un numero'
    }),
    currency: z.string(z.nativeEnum(CurrencyType,{
      required_error: "Por favor seleccione una opción.",
    })),

    date: z.date({
      required_error: "Por favor selecciona una fecha.",
    }),

    urlFile: z.array(z.string()).optional(),
    
    status: z.string(z.nativeEnum(Status, {
      required_error: "Por favor seleccione una opción.",
    })).optional(),
    
    comments: z.string()
    .max(80, {message: 'El campo debe contener máximo 80 caracteres'})
    .optional(),   
  })



