/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';

import { RecordStatus } from '@/shared/enums';

import { CurrencyType  } from '@/modules/offering/shared/enums';
import { OfferingExpenseSearchType, OfferingExpenseSearchSubType } from '@/modules/offering/expense/enums';


export const offeringExpenseFormSchema = z
  .object({
    
    type: z.string(z.nativeEnum(OfferingExpenseSearchType,{
      required_error: "Por favor seleccione un tipo.",
    })),

    subType: z.string(z.nativeEnum(OfferingExpenseSearchSubType,{
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

    fileNames: z.array(z.string()).optional(),
    urlFile: z.array(z.string()).optional(),
    
    status: z.string(z.nativeEnum(RecordStatus, {
      required_error: "Por favor seleccione una opción.",
    })).optional(),
    
    comments: z.string()
    .max(300, {message: 'El campo debe contener máximo 100 caracteres'})
    .optional(),   

    churchId: z.string().optional(),

    recordStatus: z.string(z.nativeEnum(RecordStatus, {
      required_error: "Por favor seleccione una opción.",
    })).optional(),
  })



