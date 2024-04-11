/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';
import { SubTypeSearch, TypeSearch, UserRoles } from '@/shared/enums';

export const formSearchByTermSchema = z
  .object({
    type: z.nativeEnum(TypeSearch,{
      required_error: "Por favor seleccione un tipo.",
    }),
    subType: z.string(z.nativeEnum(SubTypeSearch ,{
      required_error: "Por favor seleccione una opción.",
    })).optional(),

    termInput: z.string().max(30).optional(),
    termSelect: z.string().max(30).optional(),

    termMultiSelect: z.array(z.nativeEnum(UserRoles),{
      required_error: "Tienes que seleccionar al menos un rol.",
    }).refine((value) => value.some((item) => item), {
      message: "Tienes que seleccionar al menos un rol.",
    }).optional(),

    termDate: z.object({from: z.date(), to: z.date().optional()}, {
      required_error: "Por favor seleccione una fecha.",
    }).optional(),

    termNames: z.string().max(30).optional(),
    termLastNames: z.string().max(30).optional(),

    limit: z.string().refine(limit => {
      const parsedLimit = parseInt(limit);
      return !isNaN(parsedLimit) && parsedLimit > 0;
    },{
      message: 'Limite debe ser un numero mayor a 0'
    }).optional(),
    
    order: z.enum(['ASC', 'DESC'], {
      required_error: "Seleccione un orden para al consulta.",
    }),
    limitAll: z.any().optional(),
   
  })
  .refine(
    (data) => {
      if (data.type === TypeSearch.FirstName || data.type === TypeSearch.LastName || data.type === TypeSearch.FullName || data.type === TypeSearch.Tithe ) {
    
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
      if (data.type === TypeSearch.FirstName || data.subType === SubTypeSearch.TitheNames) {
        return !!data.termNames; 
      }
      return true;
    },
    {
      message: 'El termino es requerido',
      path: ['termNames'],
    }
  )
  .refine(
    (data) => {
      if (data.type === TypeSearch.LastName || data.subType === SubTypeSearch.TitheLastNames) {
        return !!data.termLastNames;
      }
      return true;
    },
    {
      message: 'El termino de  es requerido',
      path: ['termLastNames'],
    }
  )
  .refine(
    (data) => {
      if (data.type === TypeSearch.FullName || data.subType === SubTypeSearch.TitheFullNames ) {
        return !!data.termLastNames; 
      }
      return true;
    },
    {
      message: 'El termino de  es requerido',
      path: ['termLastNames'],
    }
  )
  .refine(
    (data) => {
      if (data.type === TypeSearch.FullName || data.subType === SubTypeSearch.TitheFullNames  ) {
        return !!data.termNames; 
      }
      return true;
    },
    {
      message: 'El termino de  es requerido',
      path: ['termNames'],
    }
  )
  .refine(
    (data) => {
      if (data.type !== TypeSearch.LastName && data.type !== TypeSearch.FirstName && data.type !== TypeSearch.FullName && data.type !== TypeSearch.MonthBirth &&   
          data.type !== TypeSearch.Gender && data.type !== TypeSearch.MaritalStatus && data.type !== TypeSearch.IsActive && data.type !== TypeSearch.DateBirth && 
          data.type !== TypeSearch.Tithe && data.type !== TypeSearch.Sunday_worship && data.type !== TypeSearch.Family_house && data.type !== TypeSearch.Zonal_fasting &&
          data.type !== TypeSearch.General_fasting && data.type !== TypeSearch.General_vigil && data.type !== TypeSearch.Zonal_vigil && data.type !== TypeSearch.Youth_worship && 
          data.type !== TypeSearch.Sunday_school && data.type !== TypeSearch.Activities && data.type !== TypeSearch.Church_ground && data.type !== TypeSearch.Special  && data.type !== TypeSearch.Roles   
          ) {
        return !!data.termInput; 
      }
      return true;
    },
    {
      message: 'El termino es requerido',
      path: ['termInput'],
    }
  )
  .refine(
    (data) => {
      if (data.type === TypeSearch.MonthBirth || data.type === TypeSearch.Gender ||
          data.type === TypeSearch.MaritalStatus || data.type === TypeSearch.IsActive  ) {
        return !!data.termSelect; 
      }
      return true;
    },
    {
      message: 'Por favor seleccione una opción',
      path: ['termSelect'],
    }
  )
  .refine(
    (data) => {
      if ( data.type === TypeSearch.DateBirth || data.subType === SubTypeSearch.TitheDate ) {
        return !!data.termDate; 
      }
      return true;
    },
    {
      message: 'Por favor seleccione una fecha',
      path: ['termDate'],
    }
  )
  .refine(
    (data) => {
      if ( data.type === TypeSearch.Roles  ) {
        return !!data.termMultiSelect; 
      }
      return true;
    },
    {
      message: 'Por favor seleccione una opción',
      path: ['termMultiSelect'],
    }
  )

  

