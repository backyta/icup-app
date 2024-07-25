/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';

import { RecordOrder } from '@/shared/enums';
import { DiscipleSearchSubType, DiscipleSearchType } from '@/app/disciple/enums';

export const discipleSearchByTermFormSchema = z
  .object({
    searchType: z.nativeEnum(DiscipleSearchType,{
      required_error: "Por favor seleccione un tipo.",
    }),

    searchSubType: z.nativeEnum(DiscipleSearchSubType ,{
      required_error: "Por favor seleccione una opción.",
    }).optional(),
    
    inputTerm: z.string().max(30).optional(),
    selectTerm: z.string().max(30).optional(),

    dateTerm: z.object({from: z.date(), to: z.date().optional()}, {
      required_error: "Por favor seleccione una fecha.",
    }).optional(),

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
        data.searchType === DiscipleSearchType.FirstName || 
        data.searchType === DiscipleSearchType.LastName || 
        data.searchType === DiscipleSearchType.FullName 
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
        data.searchType === DiscipleSearchType.FirstName
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
        data.searchType === DiscipleSearchType.LastName
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
        data.searchType === DiscipleSearchType.FullName
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
        data.searchType === DiscipleSearchType.FullName
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
      if (data.searchType === DiscipleSearchType.OriginCountry ||
          data.searchType === DiscipleSearchType.Department || 
          data.searchType === DiscipleSearchType.Province || 
          data.searchType === DiscipleSearchType.District || 
          data.searchType === DiscipleSearchType.UrbanSector || 
          data.searchType === DiscipleSearchType.Address
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
      if (
          data.searchType === DiscipleSearchType.BirthMonth ||
          data.searchType === DiscipleSearchType.Gender ||
          data.searchType === DiscipleSearchType.MaritalStatus || 
          data.searchType === DiscipleSearchType.RecordStatus
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
  .refine(
    (data) => {
      if ( 
        data.searchType === DiscipleSearchType.BirthDate
      ) {
        return !!data.dateTerm; 
      }
      return true;
    },
    {
      message: 'Por favor seleccione una fecha',
      path: ['dateTerm'],
    }
  )
 

  

  

