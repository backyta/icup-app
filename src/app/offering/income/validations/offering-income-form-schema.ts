/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';

import { RecordStatus } from '@/shared/enums';
import { CurrencyType  } from '@/app/offering/shared/enums';
import { OfferingIncomeCreateSubType, OfferingIncomeCreateType, TypeShiftOfferingIncome } from '@/app/offering/income/enums';


export const offeringIncomeFormSchema = z
  .object({
    searchType: z.string(z.nativeEnum(OfferingIncomeCreateType,{
      required_error: "Por favor seleccione un tipo.",
    })),

    searchSubType: z.string(z.nativeEnum(OfferingIncomeCreateSubType,{
      required_error: "Por favor seleccione una opción.",
    })).optional(),

    shift: z.string(z.nativeEnum(TypeShiftOfferingIncome,{
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

    comments: z.string()
    .max(100, {message: 'El campo debe contener máximo 100 caracteres'})
    .optional(),   
     
    urlFiles: z.array(z.string()).optional(),

    theirFamilyGroup: z.string().optional(),
    theirDisciple: z.string().optional(),
    theirZone: z.string().optional(),
    
    status: z.string(z.nativeEnum(RecordStatus, {
      required_error: "Por favor seleccione una opción.",
    })).optional(),
    
  })
  .refine(
    (data) => {
      if (data.searchType === 'offering') {
        return !!data.searchSubType; 
      }
      return true;
    },
    {
      message: 'El sub-tipo es requerido.',
      path: ['subType'],
    }
  )
  .refine(
    (data) => {
      if (data.searchType === OfferingIncomeCreateType.Tithe) {
        return !!data.theirDisciple; 
      }
      return true;
    },
    {
      message: 'El discípulo es requerido.',
      path: ['discipleId'],
    }
  )
  .refine(
    (data) => {
      if (data.searchType === OfferingIncomeCreateType.Offering && 
        (data.searchSubType === OfferingIncomeCreateSubType.Special || 
          data.searchSubType === OfferingIncomeCreateSubType.ChurchGround)) 
      {
        return !!data.theirDisciple; 
      }
      return true;
    },
    {
      message: 'El discípulo es requerido.',
      path: ['discipleId'],
    }
  )
  .refine(
    (data) => {
      if (data.searchType === OfferingIncomeCreateType.Offering && 
        data.searchSubType === OfferingIncomeCreateSubType.ZonalFasting) 
      {
        return !!data.theirZone; 
      }
      return true;
    },
    {
      message: 'Por favor elige un copastor',
      path: ['copastorId'],
    }
  )
  .refine(
    (data) => {
      if (data.searchType === OfferingIncomeCreateType.Offering && 
        data.searchSubType === OfferingIncomeCreateSubType.ZonalVigil) 
      {
        return !!data.theirZone; 
      }
      return true;
    },
    {
      message: 'Por favor elige un copastor',
      path: ['copastorId'],
    }
  )
  .refine(
    (data) => {
      if (data.searchType === OfferingIncomeCreateType.Offering && 
        data.searchSubType === OfferingIncomeCreateSubType.FamilyGroup) 
      {
        return !!data.theirFamilyGroup; 
      }
      return true;
    },
    {
      message: 'Por favor elige una casa familiar',
      path: ['familyGroupId'],
    }
  );


