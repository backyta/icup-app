/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';

import { RecordOrder } from '@/shared/enums/record-order.enum';
import {  CopastorSearchType } from '@/modules/copastor/enums/copastor-search-type.enum';
import { CopastorSearchSubType } from '@/modules/copastor/enums/copastor-search-sub-type.enum';

export const copastorSearchByTermFormSchema = z
  .object({
    searchType: z.nativeEnum(CopastorSearchType,{
      required_error: "Por favor seleccione un tipo.",
    }),

    searchSubType: z.nativeEnum(CopastorSearchSubType ,{
      message: 'Por favor seleccione una opción.',
      required_error: "Por favor seleccione una opción.",
    }).optional(),

    inputTerm: z.string().max(30).optional(),
    selectTerm: z.string().max(30).optional(),

    dateTerm: z.object({from: z.date(), to: z.date().optional()}, {
      required_error: "Por favor seleccione una fecha.",
    }).optional(),

    firstNamesTerm: z.string().max(30).optional(),

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

    churchId: z.string().max(40).optional(),
    
    all: z.boolean().optional(),
   
  })
  .refine(
    (data) => {
      if (
        data.searchType === CopastorSearchType.FirstNames || 
        data.searchType === CopastorSearchType.LastNames || 
        data.searchType === CopastorSearchType.FullNames 
      ) {
        return !!data.searchSubType; 
      }
      return true;
    },
    {
      message: 'El sub-tipo es requerido.',
      path: ['searchSubType'],
    }
  )
  .refine(
    (data) => {
      if (
        data.searchType === CopastorSearchType.FirstNames
      ) {
        return !!data.firstNamesTerm; 
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
        data.searchType === CopastorSearchType.LastNames
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
        data.searchType === CopastorSearchType.FullNames
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
        data.searchType === CopastorSearchType.FullNames
      ) {
        return !!data.firstNamesTerm; 
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
      if (data.searchType === CopastorSearchType.OriginCountry ||
        data.searchType === CopastorSearchType.ResidenceCountry ||
          data.searchType === CopastorSearchType.ResidenceDepartment || 
          data.searchType === CopastorSearchType.ResidenceProvince || 
          data.searchType === CopastorSearchType.ResidenceDistrict || 
          data.searchType === CopastorSearchType.ResidenceUrbanSector || 
          data.searchType === CopastorSearchType.ResidenceAddress
          ) {
        return !!data.inputTerm; 
      }
      return true;
    },
    {
      message: 'El Término es requerido.',
      path: ['inputTerm'],
    }
  )
  .refine(
    (data) => {
      if (
          data.searchType === CopastorSearchType.BirthMonth ||
          data.searchType === CopastorSearchType.Gender ||
          data.searchType === CopastorSearchType.MaritalStatus || 
          data.searchType === CopastorSearchType.RecordStatus
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
        data.searchType === CopastorSearchType.BirthDate
      ) {
        return !!data.dateTerm; 
      }
      return true;
    },
    {
      message: 'Por favor seleccione una fecha.',
      path: ['dateTerm'],
    }
  )
 

  

  

