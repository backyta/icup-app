/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';

import { RecordOrder } from '@/shared/enums';
import { PreacherSearchSubType, PreacherSearchType } from '@/modules/preacher/enums';

export const preacherSearchByTermFormSchema = z
  .object({
    searchType: z.nativeEnum(PreacherSearchType,{
      required_error: "Por favor seleccione un tipo.",
    }),

    searchSubType: z.nativeEnum(PreacherSearchSubType ,{
      message: 'Por favor seleccione una opción.',
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
        data.searchType === PreacherSearchType.FirstName || 
        data.searchType === PreacherSearchType.LastName || 
        data.searchType === PreacherSearchType.FullName 
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
        data.searchType === PreacherSearchType.FirstName
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
        data.searchType === PreacherSearchType.LastName
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
        data.searchType === PreacherSearchType.FullName
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
        data.searchType === PreacherSearchType.FullName
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
      if (data.searchType === PreacherSearchType.OriginCountry ||
          data.searchType === PreacherSearchType.ZoneName ||
          data.searchType === PreacherSearchType.FamilyGroupCode ||
          data.searchType === PreacherSearchType.FamilyGroupName ||
          data.searchType === PreacherSearchType.Department || 
          data.searchType === PreacherSearchType.Province || 
          data.searchType === PreacherSearchType.District || 
          data.searchType === PreacherSearchType.UrbanSector || 
          data.searchType === PreacherSearchType.Address
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
          data.searchType === PreacherSearchType.BirthMonth ||
          data.searchType === PreacherSearchType.Gender ||
          data.searchType === PreacherSearchType.MaritalStatus ||
          data.searchType === PreacherSearchType.RecordStatus
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
        data.searchType === PreacherSearchType.BirthDate
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
 

  

  

