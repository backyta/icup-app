/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';

import { RecordOrder } from '@/shared/enums';
import { FamilyGroupSearchSubType, FamilyGroupSearchType } from '@/modules/family-group/enums';

export const familyGroupSearchByTermFormSchema = z
  .object({
    searchType: z.nativeEnum(FamilyGroupSearchType,{
      required_error: "Por favor seleccione un tipo.",
    }),

    searchSubType: z.nativeEnum(FamilyGroupSearchSubType ,{
      message: 'Por favor seleccione una opción.',
      required_error: "Por favor seleccione una opción.",
    }).optional(),
    
    inputTerm: z.string().max(30).optional(),
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
        data.searchType === FamilyGroupSearchType.FirstName || 
        data.searchType === FamilyGroupSearchType.LastName || 
        data.searchType === FamilyGroupSearchType.FullName 
      ) {
        return !!data.searchSubType; 
      }
      return true;
    },
    {
      message: 'El sub-tipo es requerido',
      path: ['searchSubType'],
    }
  )
  .refine(
    (data) => {
      if (
        data.searchType === FamilyGroupSearchType.FirstName
      ) {
        return !!data.namesTerm; 
      }
      return true;
    },
    {
      message: 'El nombre es requerido',
      path: ['namesTerm'],
    }
  )
  .refine(
    (data) => {
      if (
        data.searchType === FamilyGroupSearchType.LastName
      ) {
        return !!data.lastNamesTerm;
      }
      return true;
    },
    {
      message: 'El apellido es requerido',
      path: ['lastNamesTerm'],
    }
  )
  //* Full name
  .refine(
    (data) => {
      if (
        data.searchType === FamilyGroupSearchType.FullName
      ) {
        return !!data.lastNamesTerm; 
      }
      return true;
    },
    {
      message: 'El nombre es requerido',
      path: ['lastNamesTerm'],
    }
  )
  .refine(
    (data) => {
      if (
        data.searchType === FamilyGroupSearchType.FullName
      ) {
        return !!data.namesTerm; 
      }
      return true;
    },
    {
      message: 'El apellido es requerido',
      path: ['namesTerm'],
    }
  )
  .refine(
    (data) => {
      if (data.searchType === FamilyGroupSearchType.Department || 
          data.searchType === FamilyGroupSearchType.Province || 
          data.searchType === FamilyGroupSearchType.District || 
          data.searchType === FamilyGroupSearchType.UrbanSector || 
          data.searchType === FamilyGroupSearchType.Address
          ) {
        return !!data.inputTerm; 
      }
      return true;
    },
    {
      message: 'El termino es requerido',
      path: ['inputTerm'],
    }
  )
  .refine(
    (data) => {
      if (data.searchType === FamilyGroupSearchType.RecordStatus
        ) {
        return !!data.selectTerm; 
      }
      return true;
    },
    {
      message: 'Por favor seleccione una opción',
      path: ['selectTerm'],
    }
  )
 

  

  

