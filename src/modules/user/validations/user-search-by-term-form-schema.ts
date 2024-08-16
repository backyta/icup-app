/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';

import { RecordOrder } from '@/shared/enums';
import { UserRole, UserSearchType } from '@/modules/user/enums';

export const userSearchByTermFormSchema = z
  .object({
    searchType: z.nativeEnum(UserSearchType,{
      required_error: "Por favor seleccione un tipo.",
    }),
    
    multiSelectTerm: z.array(z.nativeEnum(UserRole),{
      required_error: "Tienes que seleccionar al menos un rol.",
    }).refine((value) => value.some((item) => item), {
      message: "Tienes que seleccionar al menos un rol.",
    }).optional(),

    selectTerm: z.string().max(30).optional(),

    namesTerm: z.string().max(30).optional(),

    lastNamesTerm: z.string().max(30).optional(),

    limit: z.string().refine(limit => {
      return /^\d+$/.test(limit);
    }, {
      message: 'El límite debe ser un número positivo'
    }).refine(limit => {
      const parsedLimit = parseInt(limit);
      return !isNaN(parsedLimit) && parsedLimit > 0;
    }, {
      message: 'El límite debe ser un número mayor a 0'
    }).optional(),

    order: z.string(z.nativeEnum(RecordOrder, {
      required_error: "Seleccione un orden para al consulta.",
    })),

    all: z.boolean().optional(),
   
  })
  .refine(
    (data) => {
      if (
        data.searchType === UserSearchType.FirstName
      ) {
        return !!data.namesTerm; 
      }
      return true;
    },
    {
      message: 'El nombre es requerido.',
      path: ['namesTerm'],
    }
  )
  .refine(
    (data) => {
      if (
        data.searchType === UserSearchType.LastName
      ) {
        return !!data.lastNamesTerm;
      }
      return true;
    },
    {
      message: 'El apellido es requerido.',
      path: ['lastNamesTerm'],
    }
  )
  //* Full name
  .refine(
    (data) => {
      if (
        data.searchType === UserSearchType.FullName
      ) {
        return !!data.lastNamesTerm; 
      }
      return true;
    },
    {
      message: 'El nombre es requerido.',
      path: ['lastNamesTerm'],
    }
  )
  .refine(
    (data) => {
      if (
        data.searchType === UserSearchType.FullName
      ) {
        return !!data.namesTerm; 
      }
      return true;
    },
    {
      message: 'El apellido es requerido.',
      path: ['namesTerm'],
    }
  )
  .refine(
    (data) => {
      if (
          data.searchType === UserSearchType.Gender ||
          data.searchType === UserSearchType.RecordStatus
        ) {
        return !!data.selectTerm; 
      }
      return true;
    },
    {
      message: 'Por favor seleccione una opción.',
      path: ['selectTerm'],
    }
  )
  .refine(
    (data) => {
      if ( 
        data.searchType === UserSearchType.Roles
      ) {
        return !!data.multiSelectTerm; 
      }
      return true;
    },
    {
      message: 'Por favor seleccione al menos un rol.',
      path: ['multiSelectTerm'],
    }
  )
 

  

  

