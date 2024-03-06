/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';
import { SubTypeSearch, TypeSearch, UserRoles } from '@/enums';

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
      if (data.type === TypeSearch.firstName || data.type === TypeSearch.lastName || data.type === TypeSearch.fullName || data.type === TypeSearch.tithe ) {
    
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
      if (data.type === TypeSearch.firstName || data.subType === SubTypeSearch.titheNames) {
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
      if (data.type === TypeSearch.lastName || data.subType === SubTypeSearch.titheLastNames) {
        return !!data.termLastNames; /* //true */
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
      if (data.type === TypeSearch.fullName || data.subType === SubTypeSearch.titheFullNames ) {
        return !!data.termLastNames; /* //true */
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
      if (data.type === TypeSearch.fullName || data.subType === SubTypeSearch.titheFullNames  ) {
        return !!data.termNames; /* //true */
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
      if (data.type !== TypeSearch.lastName && data.type !== TypeSearch.firstName && data.type !== TypeSearch.fullName && data.type !== TypeSearch.monthBirth &&   
          data.type !== TypeSearch.gender && data.type !== TypeSearch.maritalStatus && data.type !== TypeSearch.isActive && data.type !== TypeSearch.dateBirth && 
          data.type !== TypeSearch.tithe && data.type !== TypeSearch.sunday_worship && data.type !== TypeSearch.family_house && data.type !== TypeSearch.zonal_fasting &&
          data.type !== TypeSearch.general_fasting && data.type !== TypeSearch.general_vigil && data.type !== TypeSearch.zonal_vigil && data.type !== TypeSearch.youth_worship && 
          data.type !== TypeSearch.sunday_school && data.type !== TypeSearch.activities && data.type !== TypeSearch.church_ground && data.type !== TypeSearch.special  && data.type !== TypeSearch.roles   
          ) {
        return !!data.termInput; /* //true */
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
      if (data.type === TypeSearch.monthBirth || data.type === TypeSearch.gender ||
          data.type === TypeSearch.maritalStatus || data.type === TypeSearch.isActive  ) {
        return !!data.termSelect; /* //true */
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
      if ( data.type === TypeSearch.dateBirth || data.subType === SubTypeSearch.titheDate ) {
        return !!data.termDate; /* //true */
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
      if ( data.type === TypeSearch.roles  ) {
        return !!data.termMultiSelect; /* //true */
      }
      return true;
    },
    {
      message: 'Por favor seleccione una opción',
      path: ['termMultiSelect'],
    }
  )

  

// TODO : agregar indices a todos los filtros en el backend
