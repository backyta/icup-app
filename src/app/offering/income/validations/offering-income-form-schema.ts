/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';

import { 
  MemberType, 
  OfferingIncomeCreateSubType, 
  OfferingIncomeCreateType, 
  OfferingIncomeShiftType 
} from '@/app/offering/income/enums';

import { RecordStatus } from '@/shared/enums';
import { CurrencyType  } from '@/app/offering/shared/enums';



export const offeringIncomeFormSchema = z
  .object({
    type: z.string(z.nativeEnum(OfferingIncomeCreateType,{
      required_error: "Por favor seleccione un tipo.",
    })),

    subType: z.string(z.nativeEnum(OfferingIncomeCreateSubType,{
      required_error: "Por favor seleccione una opción.",
    })).optional(),

    shift: z.string(z.nativeEnum(OfferingIncomeShiftType,{
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
     
    fileNames: z.array(z.string()).optional(),
    imageUrls: z.array(z.string()).optional(),

    memberType: z.string(z.nativeEnum(MemberType, {
      required_error: "Por favor seleccione una opción válida.",
    })).optional(),

    familyGroupId: z.string().optional(),
    memberId: z.string().optional(),
    zoneId: z.string().optional(),
    
    recordStatus: z.string(z.nativeEnum(RecordStatus, {
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
      message: 'El sub-tipo es requerido.',
      path: ['subType'],
    }
  )
  .refine(
    (data) => {
      if (data.type === OfferingIncomeCreateType.Offering && 
        (data.subType === OfferingIncomeCreateSubType.Special || 
          data.subType === OfferingIncomeCreateSubType.ChurchGround)) 
      {
        return !!data.memberId; 
      }
      return true;
    },
    {
      message: 'El discípulo es requerido.',
      path: ['member'],
    }
  )
  .refine(
    (data) => {
      if (data.type === OfferingIncomeCreateType.Offering && 
        data.subType === OfferingIncomeCreateSubType.ZonalFasting) 
      {
        return !!data.zoneId; 
      }
      return true;
    },
    {
      message: 'Por favor elige una zona',
      path: ['zone'],
    }
  )
  .refine(
    (data) => {
      if (data.type === OfferingIncomeCreateType.Offering && 
        data.subType === OfferingIncomeCreateSubType.ZonalVigil) 
      {
        return !!data.zoneId; 
      }
      return true;
    },
    {
      message: 'Por favor elige una zona',
      path: ['zone'],
    }
  )
  .refine(
    (data) => {
      if (data.type === OfferingIncomeCreateType.Offering && 
        data.subType === OfferingIncomeCreateSubType.FamilyGroup) 
      {
        return !!data.familyGroupId; 
      }
      return true;
    },
    {
      message: 'Por favor elige un grupo familiar',
      path: ['familyGroup'],
    }
  );


