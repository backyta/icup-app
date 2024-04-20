/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';
import { CurrencyType, SubTypesOffering, TypesOffering } from '@/app/offering/enums';
import { Status } from '@/shared/enums';

export const formOfferingSchema = z
  .object({
    
    type: z.string(z.nativeEnum(TypesOffering,{
      required_error: "Por favor seleccione un tipo.",
    })),

    subType: z.string(z.nativeEnum(SubTypesOffering,{
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

    comments: z.string()
    .min(1, {message: 'El campo debe contener al menos 1 carácter.'})
    .max(50, {message: 'El campo debe contener máximo 40 caracteres'})
    .optional(),   
     
    urlFile: z.array(z.string()).optional(),

    familyHouseID: z.string().optional(),
    memberID: z.string().optional(),
    zoneID: z.string().optional(),
    
    status: z.string(z.nativeEnum(Status, {
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
      if (data.type === TypesOffering.Tithe) {
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
      if (data.type === TypesOffering.Offering && (data.subType === SubTypesOffering.Special || data.subType === SubTypesOffering.ChurchGround)) {
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
      if (data.type === TypesOffering.Offering && data.subType === SubTypesOffering.ZonalFasting) {
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
      if (data.type === TypesOffering.Offering && data.subType === SubTypesOffering.ZonalVigil) {
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
      if (data.type === TypesOffering.Offering && data.subType === SubTypesOffering.FamilyHouse) {
        return !!data.familyHouseID; 
      }
      return true;
    },
    {
      message: 'Por favor elige una casa familiar',
      path: ['familyHomeID'],
    }
  );


export const formDeleteOffering = z
.object({
  reasonType: z.string()
  .min(1, {message: 'El campo debe contener al menos 1 carácter.'})
  .max(60, {message: 'El campo debe contener máximo 40 caracteres'}),

  date: z.date({
    required_error: "Por favor selecciona una fecha.",
  }).optional(),
  
  userID: z.string().optional(),

})