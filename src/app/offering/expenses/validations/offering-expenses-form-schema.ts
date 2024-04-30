/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';

import { TypesOfferingExpenses, SubTypesOfferingExpenses } from '@/app/offering/expenses/enums';
import { CurrencyType  } from '@/app/offering/shared/enums';

import { Status } from '@/shared/enums';

export const offeringExpensesFormSchema = z
  .object({
    
    type: z.string(z.nativeEnum(TypesOfferingExpenses,{
      required_error: "Por favor seleccione un tipo.",
    })),

    subType: z.string(z.nativeEnum(SubTypesOfferingExpenses,{
      required_error: "Por favor seleccione una opción.",
    })).optional(),

    amount: z.string().refine(amount => {
      return /^\d+(\.\d+)?$/.test(amount);
    }, {
      message: 'El monto debe ser un número'
    }).refine(amount => {
      const parsedAmount = parseFloat(amount);
      return !isNaN(parsedAmount) && parsedAmount >= 0;
    }, {
      message: 'El monto debe ser un número mayor o igual a 0'
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
    .max(100, {message: 'El campo debe contener máximo 100 caracteres'})
    .optional(),   
  })



