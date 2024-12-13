/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';

import { RecordStatus } from '@/shared/enums/record-status.enum';

import { CurrencyType  } from '@/modules/offering/shared/enums/currency-type.enum';
import { OfferingExpenseSearchType } from '@/modules/offering/expense/enums/offering-expense-search-type.enum';
import { OfferingExpenseSearchSubType } from '@/modules/offering/expense/enums/offering-expense-search-sub-type.enum';


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
    .min(5, {message: 'El campo debe contener mínimo 5 caracteres.'})
    .max(500, {message: 'El campo debe contener máximo 500 caracteres.'}),   

    churchId: z.string().optional(),

    recordStatus: z.string(z.nativeEnum(RecordStatus, {
      required_error: "Por favor seleccione una opción.",
    })).optional(),
  })



