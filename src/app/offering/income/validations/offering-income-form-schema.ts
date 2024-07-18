/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';

import { SubTypesOfferingIncome, TypesOfferingIncome, TypesShiftOfferingIncome } from '@/app/offering/income/enums';

import { CurrencyType  } from '@/app/offering/shared/enums';

import { RecordStatus } from '@/shared/enums';

export const offeringIncomeFormSchema = z
  .object({
    
    type: z.string(z.nativeEnum(TypesOfferingIncome,{
      required_error: "Por favor seleccione un tipo.",
    })),

    subType: z.string(z.nativeEnum(SubTypesOfferingIncome,{
      required_error: "Por favor seleccione una opción.",
    })).optional(),

    shift: z.string(z.nativeEnum(TypesShiftOfferingIncome,{
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
     
    urlFile: z.array(z.string()).optional(),

    familyHouseID: z.string().optional(),
    memberID: z.string().optional(),
    zoneID: z.string().optional(),
    
    status: z.string(z.nativeEnum(RecordStatus, {
      required_error: "Por favor seleccione una opción.",
    })).optional(),
    
  })
  .refine(
    (data) => {
      if (data.type === 'offering') {
        return !!data.subType; 
      }
      return true;
    },
    {
      message: 'El sub-tipo es requerido',
      path: ['subType'],
    }
  )
  .refine(
    (data) => {
      if (data.type === TypesOfferingIncome.Tithe) {
        return !!data.memberID; 
      }
      return true;
    },
    {
      message: 'Member ID es requerido',
      path: ['memberID'],
    }
  )
  .refine(
    (data) => {
      if (data.type === TypesOfferingIncome.Offering && 
        (data.subType === SubTypesOfferingIncome.Special || 
          data.subType === SubTypesOfferingIncome.ChurchGround)) 
      {
        return !!data.memberID; 
      }
      return true;
    },
    {
      message: 'Por favor elige un discípulo',
      path: ['memberID'],
    }
  )
  .refine(
    (data) => {
      if (data.type === TypesOfferingIncome.Offering && 
        data.subType === SubTypesOfferingIncome.ZonalFasting) 
      {
        return !!data.zoneID; 
      }
      return true;
    },
    {
      message: 'Por favor elige un copastor',
      path: ['copastorID'],
    }
  )
  .refine(
    (data) => {
      if (data.type === TypesOfferingIncome.Offering && 
        data.subType === SubTypesOfferingIncome.ZonalVigil) 
      {
        return !!data.zoneID; 
      }
      return true;
    },
    {
      message: 'Por favor elige un copastor',
      path: ['copastorID'],
    }
  )
  .refine(
    (data) => {
      if (data.type === TypesOfferingIncome.Offering && 
        data.subType === SubTypesOfferingIncome.FamilyHouse) 
      {
        return !!data.familyHouseID; 
      }
      return true;
    },
    {
      message: 'Por favor elige una casa familiar',
      path: ['familyHomeID'],
    }
  );


