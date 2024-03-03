/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';
import { SubTypeSearch, TypeSearch } from '@/enums';

export const formSearchByTermSchema = z
  .object({
    type: z.nativeEnum(TypeSearch,{
      required_error: "Por favor seleccione un tipo.",
    }),
    subType: z.nativeEnum(SubTypeSearch,{
      required_error: "Por favor seleccione una opción.",
    }).optional(),

    termInput: z.string().max(30).optional(),
    termSelect: z.string().max(30).optional(),
    // termDate: z.any(),
    termDate: z.object({from: z.date(), to: z.date().optional()}, {
      required_error: "Por favor seleccione una fecha.",
    }).optional(),

    termNames: z.string().max(30).optional(),
    termLastNames: z.string().max(30).optional(),

    limit: z.string().refine(limit => !isNaN(parseInt(limit)),{
      message: 'Limite debe ser un numero.'
    }).optional(),
    // offset:z.string().refine(offset => !isNaN(parseInt(offset)),{
    //   message: 'Desplaz. debe ser un numero.'
    // }).optional(),
    order: z.enum(['ASC', 'DESC'], {
      required_error: "Seleccione un orden para al consulta.",
    }),
   
  })
  .refine(
    (data) => {
      if (data.type === TypeSearch.firstName || data.type === TypeSearch.lastName || data.type === TypeSearch.fullName ) {
        return !!data.subType; /* //true */
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
      if (data.type === TypeSearch.firstName ) {
        return !!data.termNames; /* //true */
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
      if (data.type === TypeSearch.lastName) {
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
      if (data.type === TypeSearch.fullName  ) {
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
      if (data.type === TypeSearch.fullName  ) {
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
          data.type !== TypeSearch.gender && data.type !== TypeSearch.maritalStatus && data.type !== TypeSearch.isActive && data.type !== TypeSearch.dateBirth  ) {
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
      if ( data.type === TypeSearch.dateBirth ) {
        return !!data.termDate; /* //true */
      }
      return true;
    },
    {
      message: 'Por favor seleccione una fecha',
      path: ['termDate'],
    }
  )

  

// TODO : agregar indices a todos los filtros en el backend
