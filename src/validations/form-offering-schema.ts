/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { SubTypesOffering } from '@/enums/sub-type-offering.enum';
import * as z from 'zod';

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
    currency: z.string().min(1, { message: 
        'El campo debe contener al menos 1 carácter.'}).max(20),
    comments: z.string().min(1, { message: 
        'El campo debe contener al menos 1 carácter.'}).max(20),
    urlFile: z.array(z.string()).optional(),


    familyHouseID: z.string().optional(),
    memberID: z.string().optional(),
    copastorID: z.string().optional(),

  })
  .refine(
    (data) => {
      if (data.type === 'offering') {
        return !!data.subType; /* //true */
      }
      return true;
    },
    {
      message: 'Sub-Tipo es requerido',
      path: ['subType'],
    }
  )
  .refine(
    (data) => {
      if (data.type === 'tithe') {
        return !!data.memberID; /* //true */
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
        return !!data.memberID; /* //true */
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
        return !!data.copastorID; /* //true */
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
        return !!data.copastorID; /* //true */
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
      if (data.type === 'offering' && data.subType === SubTypesOffering.familyHome) {
        return !!data.familyHouseID; /* //true */
      }
      return true;
    },
    {
      message: 'Por favor elige una casa familiar',
      path: ['familyHomeID'],
    }
  );

  // type: string;
  // sub_type?: string;
  // amount: number;
  // currency: string;
  // comments?: string;
  // url_file?: string;

  // //* Relations
  // family_home_id?: string;
  // member_id?: string;
  // copastor_id?: string;