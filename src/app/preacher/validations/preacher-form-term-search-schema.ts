/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';

import { RecordOrder } from '@/shared/enums';
import { SearchSubTypePreacher, SearchTypePreacher } from '@/app/preacher/enums';

export const preacherFormTermSearchSchema = z
  .object({
    searchType: z.nativeEnum(SearchTypePreacher,{
      required_error: "Por favor seleccione un tipo.",
    }),

    searchSubType: z.nativeEnum(SearchSubTypePreacher ,{
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
        data.searchType === SearchTypePreacher.FirstName || 
        data.searchType === SearchTypePreacher.LastName || 
        data.searchType === SearchTypePreacher.FullName 
      ) {
        return !!data.searchSubType; 
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
      if (
        data.searchType === SearchTypePreacher.FirstName
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
        data.searchType === SearchTypePreacher.LastName
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
        data.searchType === SearchTypePreacher.FullName
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
        data.searchType === SearchTypePreacher.FullName
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
      if (data.searchType === SearchTypePreacher.OriginCountry ||
          data.searchType === SearchTypePreacher.Zone ||
          data.searchType === SearchTypePreacher.FamilyGroupCode ||
          data.searchType === SearchTypePreacher.FamilyGroupName ||
          data.searchType === SearchTypePreacher.Department || 
          data.searchType === SearchTypePreacher.Province || 
          data.searchType === SearchTypePreacher.District || 
          data.searchType === SearchTypePreacher.UrbanSector || 
          data.searchType === SearchTypePreacher.Address
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
          data.searchType === SearchTypePreacher.BirthMonth ||
          data.searchType === SearchTypePreacher.Gender ||
          data.searchType === SearchTypePreacher.MaritalStatus ||
          data.searchType === SearchTypePreacher.Status
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
        data.searchType === SearchTypePreacher.BirthDate
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
 

  

  

