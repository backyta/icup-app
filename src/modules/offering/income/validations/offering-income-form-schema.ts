/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';

import { 
  MemberType, 
  OfferingIncomeCreationType, 
  OfferingIncomeCreationSubType, 
  OfferingIncomeCreationShiftType 
} from '@/modules/offering/income/enums';

import { RecordStatus } from '@/shared/enums';
import { CurrencyType  } from '@/modules/offering/shared/enums';

export const offeringIncomeFormSchema = z
  .object({
    type: z.string(z.nativeEnum(OfferingIncomeCreationType,{
      required_error: "Por favor seleccione un tipo.",
    })),

    subType: z.string(z.nativeEnum(OfferingIncomeCreationSubType,{
      required_error: "Por favor seleccione una opción.",
    })).optional(),

    shift: z.string(z.nativeEnum(OfferingIncomeCreationShiftType,{
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
    .max(500, {message: 'El campo debe contener máximo 500 caracteres'})
    .optional(),   
     
    fileNames: z.array(z.string()).optional(),
    imageUrls: z.array(z.string()).optional(),

    memberType: z.string(z.nativeEnum(MemberType, {
      required_error: "Por favor seleccione una opción válida.",
    })).optional(),

    churchId: z.string().optional(),
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
      if (data.type === OfferingIncomeCreationType.Offering && 
        (data.subType === OfferingIncomeCreationSubType.Special || 
          data.subType === OfferingIncomeCreationSubType.ChurchGround)) 
      {
        return !!data.memberId; 
      }
      return true;
    },
    {
      message: 'El discípulo es requerido.',
      path: ['memberId'],
    }
  )
  .refine(
    (data) => {
      if (data.type === OfferingIncomeCreationType.Offering && 
        data.subType === OfferingIncomeCreationSubType.ZonalFasting) 
      {
        return !!data.zoneId; 
      }
      return true;
    },
    {
      message: 'Por favor elige una zona',
      path: ['zoneId'],
    }
  )
  .refine(
    (data) => {
      if (data.type === OfferingIncomeCreationType.Offering && 
        data.subType === OfferingIncomeCreationSubType.ZonalVigil) 
      {
        return !!data.zoneId; 
      }
      return true;
    },
    {
      message: 'Por favor elige una zona',
      path: ['zoneId'],
    }
  )
  .refine(
    (data) => {
      if (data.type === OfferingIncomeCreationType.Offering && 
        data.subType === OfferingIncomeCreationSubType.FamilyGroup) 
      {
        return !!data.familyGroupId; 
      }
      return true;
    },
    {
      message: 'Por favor elige un grupo familiar',
      path: ['familyGroupId'],
    }
  )
  .refine(
    (data) => {
      if ((data.type === OfferingIncomeCreationType.IncomeAdjustment ||
        (data.type === OfferingIncomeCreationType.Offering &&
          (data.subType === OfferingIncomeCreationSubType.SundaySchool ||
            data.subType === OfferingIncomeCreationSubType.SundayService ||
            data.subType === OfferingIncomeCreationSubType.Activities ||
            data.subType === OfferingIncomeCreationSubType.GeneralFasting ||
            data.subType === OfferingIncomeCreationSubType.GeneralVigil ||
            data.subType === OfferingIncomeCreationSubType.UnitedService ||
            data.subType === OfferingIncomeCreationSubType.YouthService))) 
      ) 
      {
        return !!data.churchId; 
      }
      return true;
    },
    {
      message: 'Por favor elige una iglesia',
      path: ['churchId'],
    }
  );


