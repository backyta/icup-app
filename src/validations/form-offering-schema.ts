/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';
import { CurrencyType, SubTypesOffering } from '@/enums';

export const formOfferingSchema = z
  .object({
    type: z.enum(['tithe', 'offering'],{
      required_error: "Por favor seleccione un tipo.",
    }),
    subType: z.nativeEnum(SubTypesOffering,{
      required_error: "Por favor seleccione una opción.",
    }).optional(),
    amount: z.string().refine(amount => !isNaN(parseFloat(amount)),{
      message: 'El monto de la ofrenda debe ser un numero'
    }),
    currency: z.nativeEnum(CurrencyType,{
      required_error: "Por favor seleccione una opción.",
    }),
    comments: z.string().optional(),
        
    urlFile: z.array(z.string()).optional(),


    familyHouseID: z.string().optional(),
    memberID: z.string().optional(),
    copastorID: z.string().optional(),

  })
  .refine(
    (data) => {
      if (data.type === 'offering') {
        return !!data.subType; 
      }
      return true;
    },
    {
      message: 'El sub-Tipo es requerido',
      path: ['subType'],
    }
  )
  .refine(
    (data) => {
      if (data.type === 'tithe') {
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
      if (data.type === 'offering' && (data.subType === SubTypesOffering.special || data.subType === SubTypesOffering.churchGround)) {
        return !!data.memberID; 
      }
      return true;
    },
    {
      message: 'Por favor elige un miembro',
      path: ['memberID'],
    }
  )
  .refine(
    (data) => {
      if (data.type === 'offering' && data.subType === SubTypesOffering.zonalFasting) {
        return !!data.copastorID; 
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
      if (data.type === 'offering' && data.subType === SubTypesOffering.zonalVigil) {
        return !!data.copastorID; 
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
      if (data.type === 'offering' && data.subType === SubTypesOffering.familyHouse) {
        return !!data.familyHouseID; 
      }
      return true;
    },
    {
      message: 'Por favor elige una casa familiar',
      path: ['familyHomeID'],
    }
  );

